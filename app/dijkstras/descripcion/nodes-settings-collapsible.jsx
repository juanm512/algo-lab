"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";

import { useUiStore } from "@/lib/store";

export default function NodesSettingsCollapsible({ nodeType }) {
  let nodesStyle = useUiStore((state) =>
      nodeType === "COMMON"
        ? state.nodesStyle
        : nodeType === "START"
        ? state.startNodeStyle
        : state.finishNodeStyle,
    ),
    updateNodesStyle = useUiStore((state) =>
      nodeType === "COMMON"
        ? state.updateNodesStyle
        : nodeType === "START"
        ? state.updateStartNodeStyle
        : state.updateFinishNodeStyle,
    );

  return (
    <>
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
    </>
  );
}
