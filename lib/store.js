import { create } from "zustand";

import {
  generateRandomGraph,
  generateRelation,
  generateEdges,
  removeIntersectingEdges,
  calculateMostDistant,
} from "@/lib/randomGraphGenerator";

import {
  generateGridGraph,
  calculateStartFinishPoint,
  generateEdgesGrid,
  generateLaberint,
} from "@/lib/gridGenerator";
import { solveWithDijkstra } from "@/lib/dijkstras";

export const useUiStore = create((set, get) => ({
  settingsMenuOpen: false,

  toggleSettingsMenuOpen: () => {
    const { settingsMenuOpen } = get();
    set({ settingsMenuOpen: !settingsMenuOpen });
  },
  // -----

  nodesStyle: {
    radius: 5,
    fillColor: "#f1f1f1",
    strokeWidth: 2,
    strokeColor: "#545454",
  },
  updateNodesStyle: (newNodesStyle) => {
    set({ nodesStyle: newNodesStyle });
  },

  startNodeStyle: {
    radius: 7,
    fillColor: "#00ff00",
    strokeWidth: 2.5,
    strokeColor: "#525252",
  },
  updateStartNodeStyle: (newNodeStyle) => {
    set({ startNodeStyle: newNodeStyle });
  },
  finishNodeStyle: {
    radius: 7,
    fillColor: "#ff0000",
    strokeWidth: 2.5,
    strokeColor: "#525252",
  },
  updateFinishNodeStyle: (newNodeStyle) => {
    set({ finishNodeStyle: newNodeStyle });
  },
  // ___
  edgesStyle: {
    strokeWidth: 2,
    strokeColor: "#525253",
  },
  updateEdgesStyle: (newEdgesStyle) => {
    set({ edgesStyle: newEdgesStyle });
  },
  removedEdgesStyle: {
    visible: true,
    strokeWidth: 2,
    strokeColor: "#ff0000",
  },
  updateRemovedEdgesStyle: (newEdgeStyle) => {
    set({ removedEdgesStyle: newEdgeStyle });
  },
  solutionEdgesStyle: {
    strokeWidth: 2,
    strokeColor: "#00ff00",
  },
  updateSolutionEdgesStyle: (newEdgeStyle) => {
    set({ solutionEdgesStyle: newEdgeStyle });
  },
}));

export const useBasicConfigStore = create((set, get) => ({
  dims: {
    w: 1600,
    h: 900,
  },
  margin: { x: 10, y: 10 },
  gap: { x: 50, y: 50 }, // with this you can modify the amount points in grid
  updateGap: (newGap) => {
    set({ gap: newGap });
  },
  // ___
  amountPoints: 20,
  updateRandomAmountPoints: (newAmount) => {
    set({ amountPoints: newAmount });
  },
  // ___
  boundingBox: () => {
    const { dims, margin } = get();
    return {
      x1: margin.x,
      y1: margin.y * 2,
      x2: dims.w - margin.x,
      y2: dims.h - margin.y,
    };
  },
  amountPointsGrid: () => {
    let { gap, boundingBox } = get();
    boundingBox = boundingBox();
    return {
      x: Math.floor((boundingBox.x2 - boundingBox.x1) / gap.x),
      y: Math.floor((boundingBox.y2 - boundingBox.y1) / gap.y),
    };
  },
  correctionAmount: () => {
    let { gap, amountPointsGrid, boundingBox } = get();
    amountPointsGrid = amountPointsGrid();
    boundingBox = boundingBox();
    return {
      x:
        boundingBox.x2 - boundingBox.x1 - gap.x * amountPointsGrid.x > 0
          ? (boundingBox.x2 - boundingBox.x1 - gap.x * amountPointsGrid.x) /
            amountPointsGrid.x
          : 0,
      y:
        boundingBox.y2 - boundingBox.y1 - gap.y * amountPointsGrid.y > 0
          ? (boundingBox.y2 - boundingBox.y1 - gap.y * amountPointsGrid.y) /
            amountPointsGrid.y
          : 0,
    };
  },
  distance: () => {
    let { gap, correctionAmount } = get();
    correctionAmount = correctionAmount();
    return {
      x: gap.x + correctionAmount.x,
      y: gap.y + correctionAmount.y,
    };
  },
}));

// ------
export const useDataStore = create((set, get) => ({
  error: false,
  setError: (bool) => {
    set({ error: bool });
  },
  // ----
  startNode: "",
  finishNode: "",
  setRandomSetUpPoints: (start, finish) => {
    set({
      startNode: start,
      finishNode: finish,
    });
  },
  // ----
  graph: null,
  setGraphNodes: (newGraph) => {
    set({ graph: newGraph });
  },
  edges: null,
  setGraphEdges: (newEdges) => {
    set({ edges: newEdges });
  },
  // -----
  solution: null,
  searchSolution: async () => {
    const { graph, edges, startNode, finishNode } = get();
    // console.log(graph, edges, startNode, finishNode);
    const {
      error,
      solution,
      graph: newG,
    } = await solveWithDijkstra(graph, edges, startNode, finishNode);
    // console.log(error, solution);
    set({ error, solution });
    if (!error) set({ graph: newG });
  },
  generateNewRandomData: async (radius, dims, margin, amountPoints) => {
    const oGraph = await generateRelation(
      await generateRandomGraph(amountPoints, dims, margin),
    );
    const { start, finish } = await calculateMostDistant(oGraph);

    const { graph, edges } = await generateEdges(oGraph, radius);
    const parsedEdges = await removeIntersectingEdges(edges, graph);
    set({
      solution: null,
      graph,
      edges: parsedEdges,
      startNode: start,
      finishNode: finish,
    });
  },
  generateNewGridData: async (
    radius,
    gap,
    correctionAmount,
    boundingBox,
    amountPoints,
    distance,
  ) => {
    const { graph } = get();
    let oGraph;
    if (!graph || Object.keys(graph).length != amountPoints.x * amountPoints.y)
      oGraph = await generateGridGraph(
        amountPoints,
        gap,
        correctionAmount,
        boundingBox,
      );
    else oGraph = graph;

    const { start, finish } = await calculateStartFinishPoint(oGraph);
    console.log(start, finish);

    const edges = await generateEdgesGrid(oGraph, radius, distance);

    set({
      solution: null,
      graph: oGraph,
      edges,
      startNode: start,
      finishNode: finish,
    });
  },
  generateNewLaberintData: async (
    radius,
    gap,
    correctionAmount,
    boundingBox,
    amountPoints,
    distance,
  ) => {
    const { graph } = get();
    let oGraph;
    if (!graph || Object.keys(graph).length != amountPoints.x * amountPoints.y)
      oGraph = await generateGridGraph(
        amountPoints,
        gap,
        correctionAmount,
        boundingBox,
      );
    else oGraph = graph;

    const { start, finish } = await calculateStartFinishPoint(oGraph);
    console.log(start, finish);
    const edges = await generateLaberint(oGraph, radius, distance);

    set({
      solution: null,
      graph: oGraph,
      edges,
      startNode: start,
      finishNode: finish,
    });
  },
}));
