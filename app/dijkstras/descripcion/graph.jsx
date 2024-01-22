"use client";
import { useUiStore, useDataStore } from "@/lib/store";

export default function GraphNodes() {
  const nodesStyle = useUiStore((state) => state.nodesStyle);
  const startNodeStyle = useUiStore((state) => state.startNodeStyle);
  const finishNodeStyle = useUiStore((state) => state.finishNodeStyle);

  const graph = useDataStore((state) => state.graph);
  const start = useDataStore((state) => state.startNode);
  const finish = useDataStore((state) => state.finishNode);

  return (
    graph &&
    Object.keys(graph).map((key) => (
      <circle
        key={key}
        fill={
          start == key
            ? startNodeStyle.fillColor
            : finish == key
            ? finishNodeStyle.fillColor
            : nodesStyle.fillColor
        }
        r={
          start == key
            ? startNodeStyle.radius
            : finish == key
            ? finishNodeStyle.radius
            : nodesStyle.radius
        }
        cx={graph[key].x}
        cy={graph[key].y}
        stroke={
          start == key
            ? startNodeStyle.strokeColor
            : finish == key
            ? finishNodeStyle.strokeColor
            : nodesStyle.strokeColor
        }
        strokeWidth={
          start == key
            ? startNodeStyle.strokeWidth
            : finish == key
            ? finishNodeStyle.strokeWidth
            : nodesStyle.strokeWidth
        }
        className="animate-fade-up transition-all duration-500 ease-in"
        onClick={(e) => console.log(key, graph[key])}
      />
    ))
  );
}
