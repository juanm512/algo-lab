"use client";
import { useEffect } from "react";

import { useUiStore, useDataStore, useBasicConfigStore } from "@/lib/store";

import { SideBarButtons } from "@/app/dijkstras/components/sideBarButtons";
import { ConfigMenu } from "@/app/dijkstras/components/configMenu";
import Areas from "@/app/voronoi/components/areas";
import GraphNodes from "@/app/dijkstras/components/graph";
// import Measure from "@/app/dijkstras/descripcion/measure.client";

export default function Home() {
  const radius = useUiStore((state) => state.nodesStyle.radius);
  const { dims, margin } = useBasicConfigStore((state) => state);
  const amountPoints = useBasicConfigStore((state) => state.amountPoints);

  const generateNewRandomData = useDataStore(
    (state) => state.generateNewRandomData,
  );

  useEffect(() => {
    console.log(radius, dims, margin, amountPoints);
    generateNewRandomData(radius, dims, margin, amountPoints);
  }, []);

  return (
    <div className="relative mx-16 my-32 flex h-full max-h-[90vh] w-full max-w-[85vw] animate-fade-up flex-row rounded-lg border-2 border-zinc-500 shadow-md">
      {/* side bar */}
      <div className="flex min-h-full w-10 flex-col justify-between gap-2 rounded-l-md border-r border-zinc-700 bg-black/30 backdrop-blur-xl">
        <SideBarButtons graphType="RANDOM" />
      </div>

      <ConfigMenu graphType="RANDOM" />

      {/* render svg */}
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 aspect-video w-full rounded-r-lg bg-zinc-800"
      >
        <Areas />
        <GraphNodes />
      </svg>
    </div>
  );
}
