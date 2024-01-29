"use client";
import { useDataStore, useUiStore } from "@/lib/store";

export default function SolutionEdges() {
  const solutionEdgesStyle = useUiStore((state) => state.solutionEdgesStyle);
  const solution = useDataStore((state) => state.solution);

  return (
    solution &&
    solution.map((edge) => (
      <line
        key={"solution" + edge.id}
        x1={edge.p1.x}
        y1={edge.p1.y}
        x2={edge.q1.x}
        y2={edge.q1.y}
        stroke={solutionEdgesStyle.strokeColor}
        strokeWidth={solutionEdgesStyle.strokeWidth}
        onClick={(e) => console.log(edge)}
      />
    ))
  );
}
