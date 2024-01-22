"use client";
import { useEffect } from "react";

import { useUiStore, useDataStore, useBasicConfigStore } from "@/lib/store";

import { SideBarButtons } from "@/app/dijkstras/descripcion/sideBarButtons";
import { ConfigMenu } from "@/app/dijkstras/descripcion/configMenu";
import Solution from "@/app/dijkstras/descripcion/solution";
import Edges from "@/app/dijkstras/descripcion/edges";
import GraphNodes from "@/app/dijkstras/descripcion/graph";
// import Measure from "@/app/dijkstras/descripcion/measure.client";

export default function Home() {
  const radius = useUiStore((state) => state.nodesStyle.radius);
  const { dims } = useBasicConfigStore((state) => state);
  // --
  const gap = useBasicConfigStore((state) => state.gap);
  const boundingBox = useBasicConfigStore((state) => state.boundingBox);
  const amountPointsGrid = useBasicConfigStore(
    (state) => state.amountPointsGrid,
  );
  const correctionAmount = useBasicConfigStore(
    (state) => state.correctionAmount,
  );
  const distance = useBasicConfigStore((state) => state.distance);

  const generateNewGridData = useDataStore(
    (state) => state.generateNewGridData,
  );

  useEffect(() => {
    generateNewGridData(
      radius,
      gap,
      correctionAmount(),
      boundingBox(),
      amountPointsGrid(),
      distance(),
    );
  }, []);

  return (
    <div className="relative mx-16 my-32 flex h-full max-h-[90vh] w-full max-w-[85vw] animate-fade-up flex-row rounded-lg border-2 border-zinc-500 shadow-md">
      {/* side bar */}
      <div className="flex min-h-full w-10 flex-col justify-between gap-2 rounded-l-md border-r border-zinc-700 bg-black/30 backdrop-blur-xl">
        <SideBarButtons graphType="GRID" />
      </div>

      {/* <GraphList>
        graph.map((node)=>())
      </GraphList> */}
      {/* <EdgesList>
        edges.map((node)=>())
      </EdgesList> */}

      <ConfigMenu graphType="GRID" />

      {/* render svg */}
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 aspect-video w-full rounded-r-lg bg-zinc-800"
      >
        <Edges />
        <Solution />
        <GraphNodes />
      </svg>
    </div>
  );
}
