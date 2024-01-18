"use client";
import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";
import { parseColor } from "@react-stately/color";

import { useUiStore, useBasicConfigStore } from "@/lib/store";

export function ConfigMenu() {
  const settingsMenuOpen = useUiStore((state) => state.settingsMenuOpen);
  const toggleSettingsMenuOpen = useUiStore(
    (state) => state.toggleSettingsMenuOpen,
  );

  const nodesStyle = useBasicConfigStore((state) => state.nodesStyle);
  const updateNodesStyle = useBasicConfigStore(
    (state) => state.updateNodesStyle,
  );

  const edgesStyle = useBasicConfigStore((state) => state.edgesStyle);
  const updateEdgesStyle = useBasicConfigStore(
    (state) => state.updateEdgesStyle,
  );
  return (
    <div
      className={
        "absolute h-full w-full" + (settingsMenuOpen ? " " : " hidden")
      }
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* <!--
      Background backdrop, show/hide based on slide-over state.
  
      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
      <div
        onClick={() => console.log("bg click")}
        className="absolute inset-0 rounded-lg bg-zinc-700/20 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10">
            {/* <!--
            Slide-over panel, show/hide based on slide-over state.
  
            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          --> */}
            <div className="pointer-events-auto relative w-screen max-w-md">
              {/* <!--
              Close button, show/hide based on slide-over state.
  
              Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
              <button
                onClick={() => toggleSettingsMenuOpen()}
                type="button"
                className="group absolute bottom-0 left-0 top-0 -ml-8 px-2 text-gray-300 backdrop-blur-sm transition-colors delay-100 duration-300 hover:bg-zinc-700/50 hover:text-white focus:border focus:border-zinc-200 focus:text-lg focus:outline-none sm:-ml-10"
              >
                <span className="absolute -inset-2.5"></span>
                <span className="sr-only">Close panel</span>
                <svg
                  className="h-6 w-6 transition-transform group-hover:scale-125 group-focus:scale-125"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex h-full flex-col overflow-y-scroll rounded-r-lg border-l border-zinc-700 bg-zinc-900/20 py-6 shadow-xl backdrop-blur-xl">
                <div className="relative mb-2 border-b border-zinc-300/50 py-6 ">
                  <input
                    id="c1"
                    type="radio"
                    className="peer/c1 hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="c1"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200 peer-checked/c1:text-sky-500">
                        Edges style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <svg
                      className="h-full w-full basis-3/12 pr-5"
                      viewBox={"0 0 100 100"}
                    >
                      <line
                        x1={10}
                        y1={10}
                        x2={90}
                        y2={90}
                        stroke={edgesStyle.strokeColor}
                        strokeWidth={edgesStyle.strokeWidth}
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
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/c1:block" />

                  <div className="hidden flex-col items-center peer-checked/c1:block">
                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <Label.Root
                          className="text-md font-normal leading-[35px] text-zinc-300"
                          htmlFor="edge-strokeWidth"
                        >
                          Width
                        </Label.Root>
                        <input
                          className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                          type="number"
                          min={0.1}
                          max={nodesStyle.radius}
                          step={nodesStyle.radius / 50}
                          id="edge-strokeWidth"
                          // defaultValue={edgesStyle.radius}
                          value={edgesStyle.strokeWidth}
                          onChange={(e) =>
                            updateEdgesStyle({
                              ...edgesStyle,
                              strokeWidth: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Slider.Root
                        className="relative flex h-5 w-full touch-none select-none items-center"
                        // defaultValue={[edgesStyle.radius]}
                        value={[edgesStyle.strokeWidth]}
                        min={0.1}
                        max={nodesStyle.radius}
                        step={nodesStyle.radius / 50}
                        onValueChange={(value) =>
                          updateEdgesStyle({
                            ...edgesStyle,
                            strokeWidth: value[0],
                          })
                        }
                      >
                        <Slider.Track className="relative h-1 grow rounded-full ">
                          <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                          aria-label="edge-strokeWidth"
                        />
                      </Slider.Root>
                    </div>
                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <label
                          htmlFor="edge-strokeColor"
                          className="text-md basis-10/12 font-normal text-zinc-300"
                        >
                          Fill color
                        </label>
                        <input
                          id="edge-strokeColor"
                          type="color"
                          value={edgesStyle.strokeColor}
                          onChange={(e) =>
                            updateEdgesStyle({
                              ...edgesStyle,
                              strokeColor: e.target.value,
                            })
                          }
                          className="w-full basis-2/12 rounded-lg border-2 border-zinc-700 shadow-[0_0_0_1px] shadow-zinc-800"
                        />
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>

                {/*  */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6">
                  <input
                    id="c2"
                    type="radio"
                    className="peer/c2 hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="c2"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200 peer-checked/c2:text-sky-500">
                        Nodes style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>
                    <svg
                      className="h-full w-full basis-3/12 pr-5"
                      viewBox={"0 0 50 50"}
                    >
                      <circle
                        cx={25}
                        cy={25}
                        fill={nodesStyle.fillColor}
                        r={nodesStyle.radius}
                        strokeWidth={nodesStyle.strokeWidth}
                        stroke={nodesStyle.strokeColor}
                      />
                    </svg>
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/c2:block" />

                  <div className="hidden flex-col items-center peer-checked/c2:block">
                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <Label.Root
                          className="text-md font-normal leading-[35px] text-zinc-300"
                          htmlFor="radius"
                        >
                          Radius
                        </Label.Root>
                        <input
                          className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                          type="number"
                          min={2}
                          max={20}
                          step={1}
                          id="radius"
                          // defaultValue={nodesStyle.radius}
                          value={nodesStyle.radius}
                          onChange={(e) =>
                            updateNodesStyle({
                              ...nodesStyle,
                              radius: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Slider.Root
                        className="relative flex h-5 w-full touch-none select-none items-center"
                        // defaultValue={[nodesStyle.radius]}
                        value={[nodesStyle.radius]}
                        max={20}
                        min={2}
                        step={1}
                        onValueChange={(value) =>
                          updateNodesStyle({ ...nodesStyle, radius: value[0] })
                        }
                      >
                        <Slider.Track className="relative h-1 grow rounded-full ">
                          <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                          aria-label="radius"
                        />
                      </Slider.Root>
                    </div>
                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <Label.Root
                          className="text-md font-normal leading-[35px] text-zinc-300"
                          htmlFor="strokeWidth"
                        >
                          Border width
                        </Label.Root>
                        <input
                          className="selection:color-white inline-flex h-7 w-fit appearance-none items-center justify-center rounded-md bg-zinc-900 text-center text-[12px] leading-none text-zinc-300 shadow-[0_0_0_1px] shadow-zinc-800 outline-none selection:bg-zinc-900 focus:shadow-[0_0_0_2px_black]"
                          type="number"
                          min={0}
                          max={10}
                          step={0.25}
                          id="strokeWidth"
                          value={nodesStyle.strokeWidth}
                          onChange={(e) =>
                            updateNodesStyle({
                              ...nodesStyle,
                              strokeWidth: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Slider.Root
                        className="relative flex h-5 w-full touch-none select-none items-center"
                        value={[nodesStyle.strokeWidth]}
                        min={0}
                        max={10}
                        step={0.25}
                        onValueChange={(value) =>
                          updateNodesStyle({
                            ...nodesStyle,
                            strokeWidth: value[0],
                          })
                        }
                      >
                        <Slider.Track className="bg-blackA7 relative h-1 grow rounded-full">
                          <Slider.Range className="absolute h-full w-full rounded-full bg-zinc-700" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="block h-4 w-4 rounded-[10px] bg-zinc-500 shadow-[0_1x_7px] shadow-zinc-600 hover:bg-zinc-400 focus:bg-zinc-400 focus:shadow-[0_0_0_4px] focus:shadow-zinc-700 focus:outline-none"
                          aria-label="strokeWidth"
                        />
                      </Slider.Root>
                    </div>
                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <label
                          htmlFor="fillColor"
                          className="text-md basis-10/12 font-normal text-zinc-300"
                        >
                          Fill color
                        </label>
                        <input
                          id="fillColor"
                          type="color"
                          value={nodesStyle.fillColor}
                          onChange={(e) =>
                            updateNodesStyle({
                              ...nodesStyle,
                              fillColor: e.target.value,
                            })
                          }
                          className="w-full basis-2/12 rounded-lg border-2 border-zinc-700 shadow-[0_0_0_1px] shadow-zinc-800"
                        />
                      </div>
                    </div>

                    {/*  */}
                    <div className="flex w-full flex-col px-8 py-4">
                      <div className="flex flex-row items-center justify-between">
                        <label
                          htmlFor="strokeColor"
                          className="text-md basis-10/12 font-normal text-zinc-300"
                        >
                          Border color
                        </label>
                        <input
                          id="strokeColor"
                          type="color"
                          value={nodesStyle.strokeColor}
                          onChange={(e) =>
                            updateNodesStyle({
                              ...nodesStyle,
                              strokeColor: e.target.value,
                            })
                          }
                          className="w-full basis-2/12 rounded-lg border-2 border-zinc-700 shadow-[0_0_0_1px] shadow-zinc-800"
                        />
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
