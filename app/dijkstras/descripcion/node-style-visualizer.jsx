"use client";
import { useUiStore } from "@/lib/store";

export default function NodeStyleVisualizer({ nodeType }) {
  let nodesStyle = useUiStore((state) =>
    nodeType === "COMMON"
      ? state.nodesStyle
      : nodeType === "START"
      ? state.startNodeStyle
      : state.finishNodeStyle,
  );
  return (
    <svg className="h-full w-full basis-3/12 pr-5" viewBox={"0 0 50 50"}>
      <circle
        cx={25}
        cy={25}
        fill={nodesStyle.fillColor}
        r={nodesStyle.radius}
        strokeWidth={nodesStyle.strokeWidth}
        stroke={nodesStyle.strokeColor}
      />
    </svg>
  );
}
