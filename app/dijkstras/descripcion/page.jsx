import { randomInt, randomUUID } from "crypto";

import { useBasicConfigStore } from "@/lib/store";

import { SideBarButtons } from "@/app/dijkstras/descripcion/sideBarButtons";
import { ConfigMenu } from "@/app/dijkstras/descripcion/configMenu";
// import Measure from "@/app/dijkstras/descripcion/measure.client";

const dims = {
  w: 1600,
  h: 900,
};
// const r = 7;
// const margin = { x: 10, y: 10 };
// const gap = { x: 50, y: 50 };

// const boundingBox = {
//   x1: margin.x,
//   y1: margin.y * 2,
//   x2: dims.w - margin.x,
//   y2: dims.h - margin.y,
// };

// const amountPoints = {
//   x: Math.floor((boundingBox.x2 - boundingBox.x1) / gap.x),
//   y: Math.floor((boundingBox.y2 - boundingBox.y1) / gap.y),
// };
// const correctionAmount = {
//   x:
//     boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x > 0
//       ? (boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x) /
//         amountPoints.x
//       : 0,
//   y:
//     boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y > 0
//       ? (boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y) /
//         amountPoints.y
//       : 0,
// };
// const distance = {
//   x: gap.x + correctionAmount.x,
//   y: gap.y + correctionAmount.y,
// };

export default async function Home() {
  // console.time("Complete time");

  // console.time("Generate Graph");
  // const graph = await generateRelation(await generateRandomGraph());
  // // const graph = await generateGridGraph(
  // //   amountPoints,
  // //   gap,
  // //   correctionAmount,
  // //   boundingBox,
  // // );
  // console.timeEnd("Generate Graph");

  // console.time("Generate Edges");
  // const edges = await generateEdges(graph);
  // await removeIntersectingEdges(edges, graph);
  // // const edges = await generateLaberint(graph);
  // // const edges = await generateEdgesGrid(graph);
  // console.timeEnd("Generate Edges");

  // const { start, finish } = await calculateMostDistant(graph);
  // // const { start, finish } = await calculateStartFinishPoint(graph);

  // console.time("solveWithDijkstra");
  // const solution = await solveWithDijkstra(start, finish, graph, edges);
  // console.timeEnd("solveWithDijkstra");

  // console.timeEnd("Complete time");
  // console.log("\n\n");

  return (
    <div className="relative mx-16 my-32 flex h-full max-h-[90vh] w-full max-w-[85vw] animate-fade-up flex-row rounded-lg border-2 border-zinc-500 shadow-md">
      {/* side bar */}
      <div className="flex min-h-full w-10 flex-col justify-between gap-2 rounded-l-md border-r border-zinc-700 bg-black/30 backdrop-blur-xl">
        <SideBarButtons />
      </div>

      {/* <GraphList>
        graph.map((node)=>())
      </GraphList> */}
      {/* <EdgesList>
        edges.map((node)=>())
      </EdgesList> */}

      <ConfigMenu />

      {/* render svg */}
      {/* <Measure /> */}
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 aspect-video w-full rounded-r-lg bg-zinc-800"
      >
        {/* {edges.map((edge) => (
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
        ))} */}
      </svg>
    </div>
  );
}
