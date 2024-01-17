import { create } from "zustand";

export const useUiStore = create((set, get) => ({
  settingsMenuOpen: false,

  toggleSettingsMenuOpen: () => {
    const { settingsMenuOpen } = get();
    set({ settingsMenuOpen: !settingsMenuOpen });
  },
}));

export const useBasicConfigStore = create((set, get) => ({
  nodesStyle: {
    radius: 5,
    strokeWidth: 2,
    strokeColor: "",
    fillColor: "",
  },
  updateNodesStyle: (newNodesStyle) => {
    set({ nodesStyle: newNodesStyle });
  },

  startNodeStyle: {
    radius: 7,
    strokeWidth: 2.5,
    strokeColor: "",
    fillColor: "",
  },
  finishNodeStyle: {
    radius: 7,
    strokeWidth: 2.5,
    strokeColor: "",
    fillColor: "",
  },

  edgesStyle: {
    strokeWidth: 2,
    strokeColor: "",
  },
  removedEdgesStyle: {
    strokeWidth: 2,
    strokeColor: "",
  },
  solutionEdgesStyle: {
    strokeWidth: 2,
    strokeColor: "",
  },

  // ----
  dims: {
    w: 1600,
    h: 900,
  },
  margin: { x: 10, y: 10 },
  gap: { x: 50, y: 50 },
  // ----
  amountPoints: 20,
  // ----
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
    const { gap, boundingBox } = get();
    return {
      x: Math.floor((boundingBox.x2 - boundingBox.x1) / gap.x),
      y: Math.floor((boundingBox.y2 - boundingBox.y1) / gap.y),
    };
  },
  correctionAmount: () => {
    const { gap, amountPointsGrid, boundingBox } = get();
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
    const { gap, correctionAmount } = get();
    return {
      x: gap.x + correctionAmount.x,
      y: gap.y + correctionAmount.y,
    };
  },
}));

// ------
export const useDataStore = create((set) => ({
  error: false,
  startNode: "",
  finishNode: "",
  graph: {},
  edges: {},
  solution: {},
  searchSolution: () => {},
  setError: (bool) => {
    set({ error: bool });
  },
}));
