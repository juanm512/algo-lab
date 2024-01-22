"use client";

import { FileCog } from "lucide-react";

import NodesSettingsCollapsible from "@/app/dijkstras/descripcion/nodes-settings-collapsible";
import NodeStyleVisualizer from "@/app/dijkstras/descripcion/node-style-visualizer";

import EdgesSettingsCollapsible from "@/app/dijkstras/descripcion/edges-settings-collapsible";
import EdgeStyleVisualizer from "@/app/dijkstras/descripcion/edge-style-visualizer";

import { useUiStore, useBasicConfigStore } from "@/lib/store";

export function ConfigMenu({ graphType }) {
  const settingsMenuOpen = useUiStore((state) => state.settingsMenuOpen);
  const toggleSettingsMenuOpen = useUiStore(
    (state) => state.toggleSettingsMenuOpen,
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
      <div className="absolute inset-0 rounded-lg bg-zinc-700/20 backdrop-blur-[1.5px] transition-opacity"></div>

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
                {/*  */}
                {/* <div className="relative mb-2 border-b border-zinc-300/50 py-6 ">
                  <input
                    id="setUp"
                    type="radio"
                    className="peer/setUp hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="setUp"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200">
                        Generation settings
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        These modifiers change the generation params for the
                        graph and edges
                      </p>
                    </div>
                    <div className="flex aspect-square h-8 w-8 basis-3/12 items-center justify-center pr-5 text-center font-medium text-zinc-200">
                      <FileCog size={32} />
                    </div>
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/setUp:block" />

                  <div className="hidden flex-col items-center peer-checked/setUp:block">
                    
                  </div>
                </div> */}
                {/*  */}
                {/* COMMON EDGES STYLE */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6 ">
                  <input
                    id="edgeCOMMON"
                    type="radio"
                    className="peer/edgeCOMMON hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="edgeCOMMON"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200">
                        Common edges appearance
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        These modifiers will help you change the style of the
                        edges
                      </p>
                    </div>
                    <EdgeStyleVisualizer edgeType="COMMON" />
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/edgeCOMMON:block" />

                  <div className="hidden flex-col items-center peer-checked/edgeCOMMON:block">
                    <EdgesSettingsCollapsible edgeType="COMMON" />
                  </div>
                </div>
                {/* SOLUTION EDGES STYLE */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6 ">
                  <input
                    id="edgeSOLUTION"
                    type="radio"
                    className="peer/edgeSOLUTION hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="edgeSOLUTION"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200">
                        Solution edges style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        These modifiers will help you see clearly the edges that
                        solve the path
                      </p>
                    </div>
                    <EdgeStyleVisualizer edgeType="SOLUTION" />
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/edgeSOLUTION:block" />

                  <div className="hidden flex-col items-center peer-checked/edgeSOLUTION:block">
                    <EdgesSettingsCollapsible edgeType="SOLUTION" />
                  </div>
                </div>
                {/* REMOVED EDGES STYLE */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6 ">
                  <input
                    id="edgeREMOVED"
                    type="radio"
                    className="peer/edgeREMOVED hidden"
                    name="collapsible"
                  />
                  <label
                    htmlFor="edgeREMOVED"
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2 className="pl-5 text-base font-semibold leading-5 text-zinc-200">
                        Removed edges style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        These modifiers will help you see clearly the removed
                        edges, when these exist
                      </p>
                    </div>
                    <EdgeStyleVisualizer edgeType="REMOVED" />
                  </label>

                  <div className="mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/edgeREMOVED:block" />

                  <div className="hidden flex-col items-center peer-checked/edgeREMOVED:block">
                    <EdgesSettingsCollapsible edgeType="REMOVED" />
                  </div>
                </div>
                {/*  */}

                {/* COMMON NODES STYLE EDIT */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6">
                  <input
                    id={`nodeCOMMON`}
                    type="radio"
                    className={`peer/nodeCOMMON hidden`}
                    name="collapsible"
                  />
                  <label
                    htmlFor={`nodeCOMMON`}
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2
                        className={`pl-5 text-base font-semibold leading-5 text-zinc-200`}
                      >
                        Common nodes style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        Edit the render style of the common nodes as you like.
                      </p>
                    </div>
                    <NodeStyleVisualizer nodeType="COMMON" />
                  </label>

                  <div
                    className={`mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/nodeCOMMON:flex`}
                  />

                  <div
                    className={`hidden flex-col items-center peer-checked/nodeCOMMON:flex`}
                  >
                    <NodesSettingsCollapsible nodeType="COMMON" />
                  </div>
                </div>
                {/* START NODES STYLE EDIT */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6">
                  <input
                    id={`nodeSTART`}
                    type="radio"
                    className={`peer/nodeSTART hidden`}
                    name="collapsible"
                  />
                  <label
                    htmlFor={`nodeSTART`}
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2
                        className={`pl-5 text-base font-semibold leading-5 text-zinc-200`}
                      >
                        Start node style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        Edit the render style of the start node. This node mark
                        the beginning of the path
                      </p>
                    </div>
                    <NodeStyleVisualizer nodeType="START" />
                  </label>

                  <div
                    className={`mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/nodeSTART:flex`}
                  />

                  <div
                    className={`hidden flex-col items-center peer-checked/nodeSTART:flex`}
                  >
                    <NodesSettingsCollapsible nodeType="START" />
                  </div>
                </div>
                {/* FINISH NODES STYLE EDIT */}
                <div className="relative mb-2 border-b border-zinc-300/50 py-6">
                  <input
                    id={`nodeFINISH`}
                    type="radio"
                    className={`peer/nodeFINISH hidden`}
                    name="collapsible"
                  />
                  <label
                    htmlFor={`nodeFINISH`}
                    className="relative flex h-fit cursor-pointer flex-row"
                  >
                    <div className="flex basis-9/12 flex-col justify-evenly">
                      <h2
                        className={`pl-5 text-base font-semibold leading-5 text-zinc-200`}
                      >
                        Finish node style
                      </h2>
                      <p className="mt-1 pl-5 text-sm leading-4 text-zinc-300">
                        Edit the style displayed of the finish node. This node
                        mark the end of the path
                      </p>
                    </div>
                    <NodeStyleVisualizer nodeType="FINISH" />
                  </label>

                  <div
                    className={`mx-auto mb-2 mt-3 hidden h-0.5 w-11/12 bg-zinc-500/80 peer-checked/nodeFINISH:flex`}
                  />

                  <div
                    className={`hidden flex-col items-center peer-checked/nodeFINISH:flex`}
                  >
                    <NodesSettingsCollapsible nodeType="FINISH" />
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
