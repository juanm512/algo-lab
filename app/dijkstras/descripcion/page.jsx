import { randomInt, randomUUID } from "crypto";
import { RefreshCcw, Dices, Play } from "lucide-react";

const dims = {
  w: 1600,
  h: 900,
};
const r = 7;
const margin = { x: 10, y: 10 };
const gap = { x: 50, y: 50 };

const boundingBox = {
  x1: margin.x,
  y1: margin.y * 2,
  x2: dims.w - margin.x,
  y2: dims.h - margin.y,
};

const amountPoints = {
  x: Math.floor((boundingBox.x2 - boundingBox.x1) / gap.x),
  y: Math.floor((boundingBox.y2 - boundingBox.y1) / gap.y),
};
const correctionAmount = {
  x:
    boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x > 0
      ? (boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x) /
        amountPoints.x
      : 0,
  y:
    boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y > 0
      ? (boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y) /
        amountPoints.y
      : 0,
};
const distance = {
  x: gap.x + correctionAmount.x,
  y: gap.y + correctionAmount.y,
};

// -------------------------------

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
  // console.log(amountNodes);
  const graph = {};

  for (let index = 0; index < amountNodes; index++) {
    graph[randomUUID()] = {
      x: applyMargin(Math.floor(Math.random() * dims.w), margin.x, dims.w),
      y: applyMargin(Math.floor(Math.random() * dims.h), margin.y, dims.h),
      relNodes: [],
      isPath: false,
      visited: false,
      w: Infinity,
      prev: null,
    };
  }

  return graph;
}
async function generateGridGraph(
  amountPoints,
  gap,
  correctionAmount,
  boundingBox,
) {
  let graph = {};
  for (let i = 0; i <= amountPoints.x; i++) {
    for (let j = 0; j <= amountPoints.y; j++) {
      graph[randomUUID()] = {
        x: i * gap.x + correctionAmount.x + boundingBox.x1,
        y: j * gap.y + correctionAmount.y + boundingBox.y1,
        relNodes: [],
        isPath: false,
        visited: false,
        w: Infinity,
        prev: null,
      };
    }
  }
  const graphKeys = Object.keys(graph);

  for (let i = 0; i < graphKeys.length; i += amountPoints.y + 1) {
    for (let j = 0; j <= amountPoints.y; j++) {
      // add neigthbors on axis
      // if is the first node in the axis only add the next one
      // if is the last one in the axis only add the prev node
      // else add the next and the previous node
      if (j == 0) {
        graph[graphKeys[i + j]].relNodes.push(graphKeys[i + j + 1]);
      } else if (j == amountPoints.y) {
        graph[graphKeys[i + j]].relNodes.push(graphKeys[i + j - 1]);
      } else {
        graph[graphKeys[i + j]].relNodes.push(graphKeys[i + j + 1]);
        graph[graphKeys[i + j]].relNodes.push(graphKeys[i + j - 1]);
      }

      if (i == 0) {
        graph[graphKeys[i + j]].relNodes.push(
          graphKeys[i + j + amountPoints.y + 1],
        );
      } else if (i == graphKeys.length - amountPoints.y - 1) {
        graph[graphKeys[i + j]].relNodes.push(
          graphKeys[i + j - amountPoints.y - 1],
        );
      } else {
        graph[graphKeys[i + j]].relNodes.push(
          graphKeys[i + j + amountPoints.y + 1],
        );
        graph[graphKeys[i + j]].relNodes.push(
          graphKeys[i + j - amountPoints.y - 1],
        );
      }
    }
  }

  return graph;
}

async function generateRelation(graph) {
  const cantL = 4;
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

async function generateLaberint(graph) {
  const edges = [];
  const visitedNodes = new Set();
  let current = Object.keys(graph)[randomInt(Object.keys(graph).length)];
  const queue = [current];

  while (queue.length > 0) {
    if (!visitedNodes.has(current)) visitedNodes.add(current);
    // choose one random node of the adyacent to current that are not visited
    const nodesNotVisited = graph[current].relNodes.filter(
      (node) => !visitedNodes.has(node),
    );
    if (nodesNotVisited.length == 0) {
      current = queue.pop();
    } else {
      const nextNode = nodesNotVisited[randomInt(nodesNotVisited.length)];
      // agregar edge
      let n1Coord = {
          x: graph[current].x,
          y: graph[current].y,
        },
        n2Coord = { x: graph[nextNode].x, y: graph[nextNode].y };
      const p1 = calcPosOnCircle(n1Coord, n2Coord, r),
        q1 = calcPosOnCircle(n2Coord, n1Coord, r);
      edges.push({
        id: randomUUID(),
        n1: current,
        n2: nextNode,
        p1,
        q1,
        d: p1.x - q1.x == 0 ? distance.y : distance.x,
        // removed: false,
      });

      current = nextNode;
      queue.push(current);
    }
  }

  return edges;
}

async function calculateStartFinishPoint(graph) {
  console.time("calculateStartFinishPoint");
  const graphKeys = Object.keys(graph);

  const startIndex = randomInt(graphKeys.length);

  const finishIndex =
    startIndex < amountPoints.x * amountPoints.y * 0.5
      ? Math.random() * (amountPoints.x * amountPoints.y) * 0.3 +
        amountPoints.x * amountPoints.y * 0.75
      : Math.random() * (amountPoints.x * amountPoints.y) * 0.25;

  console.timeEnd("calculateStartFinishPoint");
  return {
    start: graphKeys[startIndex],
    finish: graphKeys[Math.floor(finishIndex)],
  };
}
async function calculateMostDistant(graph) {
  console.time("calculateMostDistant");
  const graphKeys = Object.keys(graph);

  const first = graphKeys[0];
  let aux = 0,
    idMostD = graphKeys[9];
  for (let key of graphKeys) {
    const d = calcDistance(
      graph[first].x,
      graph[key].x,
      graph[first].y,
      graph[key].y,
    );
    // console.log(d);
    if (d > aux) {
      aux = d;
      idMostD = key;
    }
  }
  console.timeEnd("calculateMostDistant");
  return {
    start: graphKeys[0],
    finish: idMostD,
  };
}

async function generateEdgesGrid(graph) {
  const edges = [];

  for (const nodeId in graph) {
    for (let nei of graph[nodeId].relNodes)
      if (
        edges.findIndex(
          (edge) =>
            (edge.n1 == nodeId && edge.n2 == nei) ||
            (edge.n2 == nodeId && edge.n1 == nei),
        ) == -1 &&
        Math.random() > 0.6
      ) {
        let n1Coord = {
            x: graph[nodeId].x,
            y: graph[nodeId].y,
          },
          n2Coord = { x: graph[nei].x, y: graph[nei].y };
        const p1 = calcPosOnCircle(n1Coord, n2Coord, r),
          q1 = calcPosOnCircle(n2Coord, n1Coord, r);
        edges.push({
          id: randomUUID(),
          n1: nodeId,
          n2: nei,
          d: p1.x - q1.x == 0 ? distance.y : distance.x,
          p1,
          q1,
          removed: false,
        });
      }
  }

  return edges;
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
        graph[nodeId].relNodes[
          graph[nodeId].relNodes.findIndex((n) => n.id == nei.id)
        ] = nei.id;
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

async function solveWithDijkstra(start, finish, graph, edges) {
  let current = start;
  graph[current].w = 0;

  while (!graph[finish].visited) {
    const edgesWithCurrent = edges.filter(
      (edge) =>
        !edge.removed &&
        (edge.n1 == current || edge.n2 == current) &&
        !graph[edge.n1 == current ? edge.n2 : edge.n1].visited,
    );
    edgesWithCurrent.forEach((edge) => {
      const calc1 = graph[current].w + edge.d;
      const nextPointIndex = edge.n1 == current ? edge.n2 : edge.n1;
      if (calc1 < graph[nextPointIndex].w) {
        graph[nextPointIndex].w = calc1;
        graph[nextPointIndex].prev = current;
      }
    });

    current = Object.entries(graph)
      .toSorted((a, b) => a[1].w - b[1].w)
      .filter((p) => !p[1].visited)[0][0];

    graph[current].visited = true;
  }
  const solutionEdges = [];
  let id = finish;
  while (id != start) {
    const nextId = graph[id].prev;
    if (!nextId) break;

    solutionEdges.unshift(
      edges.find(
        (edge) =>
          (edge.n1 == id && edge.n2 == nextId) ||
          (edge.n2 == id && edge.n1 == nextId),
      ),
    );
    id = nextId;
  }
  return solutionEdges;
}

export default async function Home() {
  console.time("Complete time");

  console.time("Generate Graph");
  const graph = await generateRelation(await generateRandomGraph());
  // const graph = await generateGridGraph(
  //   amountPoints,
  //   gap,
  //   correctionAmount,
  //   boundingBox,
  // );
  console.timeEnd("Generate Graph");

  console.time("Generate Edges");
  const edges = await generateEdges(graph);
  await removeIntersectingEdges(edges, graph);
  // const edges = await generateLaberint(graph);
  // const edges = await generateEdgesGrid(graph);
  console.timeEnd("Generate Edges");

  const { start, finish } = await calculateMostDistant(graph);
  // const { start, finish } = await calculateStartFinishPoint(graph);

  console.time("solveWithDijkstra");
  const solution = await solveWithDijkstra(start, finish, graph, edges);
  console.timeEnd("solveWithDijkstra");

  console.timeEnd("Complete time");
  console.log("\n\n");

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
        {edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.p1.x}
            y1={edge.p1.y}
            x2={edge.q1.x}
            y2={edge.q1.y}
            stroke={edge.removed ? "#ff000030" : "#ffffff70"}
            strokeWidth={5}
          />
        ))}
        {solution.map((edge) => (
          <line
            key={"solution" + edge.id}
            x1={edge.p1.x}
            y1={edge.p1.y}
            x2={edge.q1.x}
            y2={edge.q1.y}
            stroke="#00ff00"
            strokeWidth={4.5}
          />
        ))}
        {/* <path
          fill="none"
          stroke="green"
          d={
            "M0,0" +
            solution.map((e) => ` L${e.p1.x},${e.p1.y} L${e.q1.x},${e.q1.y}`)
          }
        /> */}
        {Object.keys(graph).map((key) => (
          <>
            <circle
              key={key}
              fill={
                key == start
                  ? "#00ff00"
                  : key == finish
                  ? "#ff0000"
                  : "#f0f0f070"
              }
              r={r}
              cx={graph[key].x}
              cy={graph[key].y}
              className="animate-fade-up stroke-slate-500 stroke-2 transition-all duration-500 ease-in"
            />
          </>
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
