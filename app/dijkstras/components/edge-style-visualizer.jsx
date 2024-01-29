"use client";
import { useUiStore } from "@/lib/store";

export default function EdgeStyleVisualizer({ edgeType }) {
  let nodesStyle = useUiStore((state) => state.nodesStyle);
  let edgesStyle = useUiStore((state) =>
    edgeType === "COMMON"
      ? state.edgesStyle
      : edgeType === "SOLUTION"
      ? state.solutionEdgesStyle
      : state.removedEdgesStyle,
  );
  return (
    <svg className="h-full w-full basis-3/12 pr-5" viewBox={"0 0 100 100"}>
      <line
        x1={10}
        y1={10}
        x2={90}
        y2={90}
        stroke={edgesStyle.strokeColor}
        strokeWidth={
          edgeType === "REMOVED" && !edgesStyle.visible
            ? 0
            : edgesStyle.strokeWidth
        }
      />
      <circle
        cx={10}
        cy={10}
        fill={nodesStyle.fillColor}
        r={nodesStyle.radius}
        strokeWidth={nodesStyle.strokeWidth}
        stroke={nodesStyle.strokeColor}
      />

      <circle
        cx={90}
        cy={90}
        fill={nodesStyle.fillColor}
        r={nodesStyle.radius}
        strokeWidth={nodesStyle.strokeWidth}
        stroke={nodesStyle.strokeColor}
      />
    </svg>
  );
}
