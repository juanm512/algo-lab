"use client";
import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";

import { useUiStore, useBasicConfigStore } from "@/lib/store";

export function ConfigMenu() {
  const settingsMenuOpen = useUiStore((state) => state.settingsMenuOpen);
  const toggleSettingsMenuOpen = useUiStore(
    (state) => state.toggleSettingsMenuOpen,
  );

  // const startFillColor
  // const startStrokeColor
  // const finishFillColor
  // const finishStrokeColor

  const nodesStyle = useBasicConfigStore((state) => state.nodesStyle);
  const updateNodesStyle = useBasicConfigStore(
    (state) => state.updateNodesStyle,
  );
  // const strokeWidth
  // const circleFillColor
  // const circleStrokeColor

  // const strokeWidth
  // const lineFillColor
  // const lineStrokeColor

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

              <div className="flex h-full flex-col overflow-y-scroll rounded-r-lg border-l border-zinc-700 bg-zinc-900/50 py-6 shadow-xl backdrop-blur-xl">
                <div className="border-b border-zinc-300/10 px-4 pb-4 pt-2">
                  <h2 className="text-base font-semibold leading-5 text-zinc-200">
                    Nodes style
                  </h2>
                  <p className="mt-1 text-sm leading-4 text-zinc-300">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>

                <div className="flex flex-col items-center">
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
                        updateNodesStyle({ ...nodesStyle, radius: value })
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
                        updateNodesStyle({ ...nodesStyle, strokeWidth: value })
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
