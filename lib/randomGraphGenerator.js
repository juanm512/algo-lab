// import { randomUUID, randomInt } from "crypto";
import { v4 as randomUUID } from "uuid";

import {
  applyMargin,
  calcDistance,
  calcPosOnCircle,
  intersectan,
} from "@/lib/utils";

export async function generateRandomGraph(amountPoints, dims, margin) {
  const amountNodes = amountPoints;
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
export async function generateRelation(graph, cantL = 4) {
  for (const [key, value] of Object.entries(graph)) {
    // const rest = graph.filter((n) => n.id != node.id);

    for (const [keyNei, valueNei] of Object.entries(graph)) {
      if (key != keyNei)
        value.relNodes.push({
          id: keyNei,
          d: calcDistance(value.x, valueNei.x, value.y, valueNei.y),
        });
    }

    value.relNodes
      .sort((a, b) => a.d - b.d)
      .splice(cantL, value.relNodes.length - cantL);
    // console.log(value.relNodes);
  }

  return graph;
}
export async function calculateMostDistant(graph) {
  console.time("calculateMostDistant");
  const graphKeys = Object.keys(graph);

  const first = graphKeys[0];
  let aux = 0,
    idMostD = "";
  for (let key of graphKeys) {
    if (key != first) {
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
  }
  console.timeEnd("calculateMostDistant");
  return {
    start: first,
    finish: idMostD,
  };
}

export async function generateEdges(graph, r) {
  const edges = [];
  const newGraph = { ...graph };

  for (const nodeId in newGraph) {
    for (let nei of newGraph[nodeId].relNodes)
      if (
        edges.findIndex(
          (edge) =>
            (edge.n1 == nodeId && edge.n2 == nei.id) ||
            (edge.n2 == nodeId && edge.n1 == nei.id),
        ) == -1
      ) {
        let n1Coord = {
            x: newGraph[nodeId].x,
            y: newGraph[nodeId].y,
          },
          n2Coord = { x: newGraph[nei.id].x, y: newGraph[nei.id].y };
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
        newGraph[nodeId].relNodes[
          newGraph[nodeId].relNodes.findIndex((n) => n.id == nei.id)
        ] = nei.id;
      }
  }

  return { graph: newGraph, edges };
}
export async function findSecondPathDistance(edge, edges) {
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

export async function removeIntersectingEdges(edges, graph) {
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
        // console.log(
        //   1 - edge.d / edgeSecPathDist,
        //   1 - secEdge.d / secEdgeSecPathDist,
        // );

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
