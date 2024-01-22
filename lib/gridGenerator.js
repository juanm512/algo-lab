// import { randomUUID, randomInt } from "crypto";
import { v4 as randomUUID } from "uuid";

import {
  applyMargin,
  calcDistance,
  calcPosOnCircle,
  intersectan,
} from "@/lib/utils";

export async function generateGridGraph(
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
export async function calculateStartFinishPoint(graph) {
  console.time("calculateStartFinishPoint");
  const graphKeys = Object.keys(graph);

  const startIndex = graphKeys.length * Math.random();

  const finishIndex =
    startIndex < graphKeys.length * 0.5
      ? Math.random() * graphKeys.length * 0.3 + graphKeys.length * 0.69
      : Math.random() * graphKeys.length * 0.25;

  console.log(graphKeys.length, finishIndex, graphKeys[parseInt(finishIndex)]);
  console.timeEnd("calculateStartFinishPoint");
  return {
    start: graphKeys[parseInt(startIndex)],
    finish: graphKeys[parseInt(finishIndex)],
  };
}

export async function generateLaberint(graph, r, distance) {
  const edges = [];
  const visitedNodes = new Set();
  let current =
    Object.keys(graph)[parseInt(Math.random() * Object.keys(graph).length)];
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
      const nextNode =
        nodesNotVisited[Math.floor(Math.random() * nodesNotVisited.length)];
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
// or
export async function generateEdgesGrid(graph, r, distance) {
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
