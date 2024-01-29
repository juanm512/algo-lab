"use client";

import { useDataStore, useUiStore } from "@/lib/store";

function calculateMiddlePoint(a, b) {
  if (a < b) return a + (b - a) / 2;
  return b + (a - b) / 2;
}

export default function Edges() {
  const edgesStyle = useUiStore((state) => state.edgesStyle);
  const removedEdgesStyle = useUiStore((state) => state.removedEdgesStyle);

  const edges = useDataStore((state) => state.edges);
  // console.log(edges);
  return (
    edges &&
    edges.map((edge) => (
      <>
        <line
          key={edge.id}
          x1={edge.p1.x}
          y1={edge.p1.y}
          x2={edge.q1.x}
          y2={edge.q1.y}
          stroke={
            edge.removed
              ? removedEdgesStyle.strokeColor
              : edgesStyle.strokeColor
          }
          strokeWidth={
            edge.removed
              ? !removedEdgesStyle.visible
                ? 0
                : removedEdgesStyle.strokeWidth
              : edgesStyle.strokeWidth
          }
          onClick={(e) => console.log(edge)}
        />
        {/* {!edge.removed && (
          <text
            className=" stroke-zinc-200 text-sm font-light"
            y={calculateMiddlePoint(edge.p1.y, edge.q1.y)}
            x={calculateMiddlePoint(edge.p1.x, edge.q1.x)}
          >
            {edge.d}
          </text>
        )} */}
      </>
    ))
  );
}
