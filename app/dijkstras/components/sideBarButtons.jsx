"use client";

import { RefreshCcw, Play, Settings2, Waypoints } from "lucide-react";

import { useRouter } from "next/navigation";

import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";

import Tooltip from "@/components/shared/tooltip";
import Toasted from "@/components/shared/toast";

import { useUiStore, useDataStore, useBasicConfigStore } from "@/lib/store";

export function SideBarButtons({ graphType }) {
  const toggleSettingsMenuOpen = useUiStore(
    (state) => state.toggleSettingsMenuOpen,
  );
  // --
  const radius = useUiStore((state) => state.nodesStyle.radius);
  const { dims, margin } = useBasicConfigStore((state) => state);
  const amountPoints = useBasicConfigStore((state) => state.amountPoints);
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

  // --
  const updateGap = useBasicConfigStore((state) => state.updateGap);
  const updateRandomAmountPoints = useBasicConfigStore(
    (state) => state.updateRandomAmountPoints,
  );

  // ----------
  const generateNewRandomData = useDataStore(
    (state) => state.generateNewRandomData,
  );
  const generateNewGridData = useDataStore(
    (state) => state.generateNewGridData,
  );
  const generateNewLaberintData = useDataStore(
    (state) => state.generateNewLaberintData,
  );
  // ----------
  const error = useDataStore((state) => state.error);
  const setError = useDataStore((state) => state.setError);
  const searchSolution = useDataStore((state) => state.searchSolution);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Tooltip content="Solve" side="rigth" sideOffset={42}>
          <button
            onClick={() => searchSolution()}
            className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <Play />
            {/* if error pop up the tooltip with the error message */}
          </button>
        </Tooltip>

        <Tooltip content="Regenerate" side="rigth" sideOffset={42}>
          <button
            onClick={async () => {
              if (graphType === "RANDOM")
                await generateNewRandomData(radius, dims, margin, amountPoints);
              if (graphType === "GRID")
                await generateNewGridData(
                  radius,
                  gap,
                  correctionAmount(),
                  boundingBox(),
                  amountPointsGrid(),
                  distance(),
                );
              if (graphType === "LABERINT")
                await generateNewLaberintData(
                  radius,
                  gap,
                  correctionAmount(),
                  boundingBox(),
                  amountPointsGrid(),
                  distance(),
                );
            }}
            className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <RefreshCcw />
          </button>
        </Tooltip>

        <Tooltip
          fullWidth={true}
          content={
            <div className="flex w-full flex-col items-start gap-1 px-4 py-2 text-zinc-300">
              {graphType == "RANDOM" ? (
                <>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <Label.Root
                      className="text-md font-normal leading-[35px] text-zinc-300"
                      htmlFor="amount-nodes-random-graph"
                    >
                      Nodes amount
                    </Label.Root>
                    <input
                      className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                      type="number"
                      min={10}
                      max={100}
                      step={1}
                      id="amount-nodes-random-graph"
                      value={amountPoints}
                      onChange={(e) => {
                        updateRandomAmountPoints(e.target.value);
                      }}
                    />
                  </div>
                  <Slider.Root
                    className="relative flex h-5 w-full touch-none select-none items-center"
                    value={[amountPoints]}
                    min={10}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      updateRandomAmountPoints(value[0])
                    }
                  >
                    <Slider.Track className="relative h-1 grow rounded-full ">
                      <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                      aria-label="amount-nodes-random-graph"
                    />
                  </Slider.Root>
                </>
              ) : (
                <>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <Label.Root
                      className="text-md font-normal leading-[35px] text-zinc-300"
                      htmlFor="gap-between-nodes-x"
                    >
                      Nodes on X axis
                    </Label.Root>
                    <input
                      className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                      type="number"
                      min={10}
                      max={100}
                      step={1}
                      id="gap-between-nodes-x"
                      value={amountPointsGrid().x + 1}
                      onChange={(e) => {
                        updateGap({
                          ...gap,
                          x: Math.floor(
                            (boundingBox().x2 - boundingBox().x1) /
                              e.target.value,
                          ),
                        });
                      }}
                    />
                  </div>
                  <Slider.Root
                    className="relative flex h-5 w-full touch-none select-none items-center"
                    value={[amountPointsGrid().x + 1]}
                    min={10}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      updateGap({
                        ...gap,
                        x: Math.floor(
                          (boundingBox().x2 - boundingBox().x1) / value[0],
                        ),
                      })
                    }
                    // onValueCommit={(value) => updateGap(value[0])}
                  >
                    <Slider.Track className="relative h-1 grow rounded-full ">
                      <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                      aria-label="gap-between-nodes-x"
                    />
                  </Slider.Root>
                  {/* ------------------------------ */}
                  <div className="flex flex-row items-center justify-between gap-4">
                    <Label.Root
                      className="text-md font-normal leading-[35px] text-zinc-300"
                      htmlFor="gap-between-nodes-y"
                    >
                      Nodes on Y axis
                    </Label.Root>
                    <input
                      className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                      type="number"
                      min={10}
                      max={100}
                      step={1}
                      id="gap-between-nodes-y"
                      value={amountPointsGrid().y + 1}
                      onChange={(e) => {
                        updateGap({
                          ...gap,
                          y: Math.floor(
                            (boundingBox().y2 - boundingBox().y1) /
                              e.target.value,
                          ),
                        });
                      }}
                    />
                  </div>
                  <Slider.Root
                    className="relative flex h-5 w-full touch-none select-none items-center"
                    value={[amountPointsGrid().y + 1]}
                    min={10}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      updateGap({
                        ...gap,
                        y: Math.floor(
                          (boundingBox().y2 - boundingBox().y1) / value[0],
                        ),
                      })
                    }
                    // onValueCommit={(value) => updateGap(value[0])}
                  >
                    <Slider.Track className="relative h-1 grow rounded-full ">
                      <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                      aria-label="gap-between-nodes-y"
                    />
                  </Slider.Root>
                </>
              )}
            </div>
          }
          side="rigth"
          sideOffset={42}
        >
          <button className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              <path d="M7 6h1v4" />
              {/* <path d="m16.71 13.88.7.71-2.82 2.82" /> */}
            </svg>
          </button>
        </Tooltip>
      </div>
      <Toasted error={error} setError={setError} />

      <Tooltip content="Edit params" side="rigth" sideOffset={42}>
        <button
          onClick={() => toggleSettingsMenuOpen()}
          className="mb-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
        >
          <Settings2 />
        </button>
      </Tooltip>
    </>
  );
}
