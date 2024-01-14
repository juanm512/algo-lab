import { randomInt, randomUUID } from "crypto";
import { RefreshCcw, Dices, Play } from "lucide-react";

const dims = {
  w: 1600,
  h: 900,
};
const r = 10;

const applyMargin = (value, margin, max) =>
  value <= margin
    ? value + (margin - value)
    : value >= max - margin
    ? max - margin
    : value;
function calcDistance(x1, x2, y1, y2) {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
const calcDirection = (a, b) => (a > b ? -1 : 1);
function calcPosOnCircle(p1, q1, r) {
  const m = (q1.y - p1.y) / (q1.x - p1.x);
  const alpha = Math.atan(m);
  const directionX = calcDirection(p1.x, q1.x),
    directionY = calcDirection(p1.y, q1.y);
  return {
    x: p1.x + Math.abs(Math.cos(alpha) * r * 0.25) * directionX,
    y: p1.y + Math.abs(Math.sin(alpha) * r * 0.25) * directionY,
  };
}
// --------------------------
async function generateRandomGraph() {
  const amountNodes = randomInt(20, 80);
  console.log(amountNodes);
  const graph = {};

  for (let index = 0; index < amountNodes; index++) {
    graph[randomUUID()] = {
      x: applyMargin(Math.floor(Math.random() * dims.w), 10, dims.w),
      y: applyMargin(Math.floor(Math.random() * dims.h), 10, dims.h),
      relNodes: [],
    };
  }

  return graph;
}

async function generateRelation(graph) {
  const cantL = 5;
  for (const [key, value] of Object.entries(graph)) {
    // const rest = graph.filter((n) => n.id != node.id);
    let dist = 50000,
      oldDist = 0;
    while (value.relNodes.length < cantL) {
      for (const [keyNei, valueNei] of Object.entries(graph)) {
        if (key != keyNei) {
          const d = calcDistance(value.x, valueNei.x, value.y, valueNei.y);
          if (d < dist && d > oldDist)
            value.relNodes.push({
              id: keyNei,
              d: d,
            });
        }
      }
      oldDist = dist;
      dist += dist > 450000 ? 25000 : 100000;
    }
    value.relNodes
      .sort((a, b) => a.d - b.d)
      .splice(cantL - 1, value.relNodes.length - cantL);
  }

  return graph;
}

async function generateEdges(graph) {
  const edges = [];

  for (const nodeId in graph) {
    for (let nei of graph[nodeId].relNodes)
      if (
        edges.findIndex(
          (edge) =>
            (edge.n1 == nodeId && edge.n2 == nei.id) ||
            (edge.n2 == nodeId && edge.n1 == nei.id),
        ) == -1
      ) {
        let n1Coord = {
            x: graph[nodeId].x,
            y: graph[nodeId].y,
          },
          n2Coord = { x: graph[nei.id].x, y: graph[nei.id].y };
        const p1 = calcPosOnCircle(n1Coord, n2Coord, r),
          q1 = calcPosOnCircle(n2Coord, n1Coord, r);
        edges.push({
          id: randomUUID(),
          n1: nodeId,
          n2: nei.id,
          d: nei.d,
          p1,
          q1,
          removed: false,
        });
      }
  }

  return edges;
}

async function findSecondPathDistance(edge, edges) {
  const src = edge.n1,
    dst = edge.n2;
  let shortDist = Infinity;

  const nodesNearSrc = new Set();
  edges.forEach((e) => {
    if (e.n2 == src || e.n1 == src)
      e.n1 == src ? nodesNearSrc.add(e.n2) : nodesNearSrc.add(e.n1);
  });
  const edgesToDst = edges
    .filter((e) => nodesNearSrc.has(e.n2) || nodesNearSrc.has(e.n1))
    .filter((e) => !e.removed && (e.n1 == dst || e.n2 == dst));

  edgesToDst.forEach((e) => {
    const srcEdge = edges
      .filter((ed) => ed.n2 == src || ed.n1 == src)
      .find(
        (ed) =>
          ed.n1 == (e.n1 == dst ? e.n2 : e.n1) ||
          ed.n2 == (e.n1 == dst ? e.n2 : e.n1),
      );
    // console.log(srcEdge, e);
    if (srcEdge && shortDist > srcEdge.d + e.d) shortDist = srcEdge.d + e.d;
  });
  return shortDist;
}

async function intersectan(p1, q1, p2, q2) {
  const a = (q1.y - p1.y) / (q1.x - p1.x),
    b = (q2.y - p2.y) / (q2.x - p2.x);
  if (a == b) return false;

  const c = p1.y - a * p1.x,
    d = p2.y - b * p2.x;

  const P = {
    x: (d - c) / (a - b),
    y: (a * d - b * c) / (a - b),
  };

  // if (onSegment(p1, P, q1)) return true;
  if ((P.x > p1.x && P.x < q1.x) || (P.x > q1.x && P.x < p1.x))
    if ((P.y > p1.y && P.y < q1.y) || (P.y > q1.y && P.y < p1.y))
      if ((P.x > p2.x && P.x < q2.x) || (P.x > q2.x && P.x < p2.x))
        if ((P.y > p2.y && P.y < q2.y) || (P.y > q2.y && P.y < p2.y))
          return true;
  return false;
}

async function removeIntersectingEdges(edges, graph) {
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i],
      n1 = graph[edge.n1],
      n2 = graph[edge.n2];

    const edgesNear = edges.filter(
      (e) =>
        n2.relNodes.some((n) => n.id == e.n1 || n.id == e.n2) ||
        n1.relNodes.some((n) => n.id == e.n1 || n.id == e.n2),
    );
    edgesNear.filter((e) => e.id != edge.id && !e.removed);
    // loop for the edges that are coming or start from the neigthbors nodes. Look of intersect with any of them and keep with the better
    // for compare the edges and select the better, look for the second path that cover src and dst. Calculate the distnate that the edge is cutting
    // and keep the one that do the best job
    for (let j = 0; j < edgesNear.length; j++) {
      if (edge.removed) break;
      const secEdge = edgesNear[j];
      if (
        !secEdge.removed &&
        (await intersectan(edge.p1, edge.q1, secEdge.p1, secEdge.q1))
      ) {
        const edgeSecPathDist = await findSecondPathDistance(edge, edges);
        const secEdgeSecPathDist = await findSecondPathDistance(secEdge, edges);
        console.log(
          1 - edge.d / edgeSecPathDist,
          1 - secEdge.d / secEdgeSecPathDist,
        );

        if (secEdgeSecPathDist == Infinity) edges[i].removed = true;
        else if (edgeSecPathDist == Infinity)
          edges[edges.findIndex((e) => e.id == secEdge.id)].removed = true;
        else if (
          1 - edge.d / edgeSecPathDist >
          1 - secEdge.d / secEdgeSecPathDist
        )
          edges[edges.findIndex((e) => e.id == secEdge.id)].removed = true;
        else edges[i].removed = true;
      }
    }
  }

  return edges;
}
// async function depthFirstTraversal() {}

// async function breadtFirstTraversal() {}

export default async function Home() {
  // const graph = await generateRandomPoints();
  const graph = await generateRelation(await generateRandomGraph());

  // console.log(graph);
  const edges = await generateEdges(graph);
  await removeIntersectingEdges(edges, graph);
  // console.log(depthFirstTraversal(graph));

  return (
    <div className="relative mx-16 my-32 flex h-full max-h-[90vh] w-full max-w-[85vw] animate-fade-up flex-row rounded-lg border-2 border-zinc-500 shadow-md">
      <div className="flex min-h-full w-10 flex-col gap-2 rounded-l-md border-r border-zinc-700 bg-black/30 backdrop-blur-xl">
        <button className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base">
          <RefreshCcw />
        </button>
        <button className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base">
          <Play />
        </button>
      </div>
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 aspect-video w-full rounded-r-lg bg-zinc-800"
      >
        {Object.keys(graph).map((key) => (
          <>
            <circle
              key={key}
              fill={"#fefefe"}
              r={r}
              cy={graph[key].y}
              cx={graph[key].x}
              className="animate-fade-up stroke-slate-500 stroke-2 transition-all duration-500 ease-in"
            />
            {/* {node.relNodes.map((node2) => {
              const n2 = graph.find((n) => n.id == node2.id);
              const p1 = {
                  x: node.x,
                  y: node.y,
                },
                q1 = { x: n2.x, y: n2.y };
              const { x: x1, y: y1 } = calcPosOnCircle(p1, q1, r),
                { x: x2, y: y2 } = calcPosOnCircle(q1, p1, r);

              return (
                <line
                  key={node.id + n2.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ffffff70"
                  strokeWidth={5}
                />
              );
            })} */}
          </>
        ))}

        {edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.p1.x}
            y1={edge.p1.y}
            x2={edge.q1.x}
            y2={edge.q1.y}
            stroke={edge.removed ? "#ff000020" : "#ffffff70"}
            strokeWidth={2.5}
          />
        ))}
      </svg>
    </div>
  );
}

const Node = async (node) => {
  console.log(node);
  return (
    <circle
      key={node.id}
      fill="#fefefe"
      r={r}
      cy={node.y}
      cx={node.x}
      className="animate-fade-up stroke-slate-500 stroke-2 transition-all duration-500 ease-in"
    />
  );
};
