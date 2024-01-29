"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";
import * as Switch from "@radix-ui/react-switch";

import { useUiStore } from "@/lib/store";

export default function EdgesSettingsCollapsible({ edgeType }) {
  let nodesStyle = useUiStore((state) => state.nodesStyle);
  let edgesStyle = useUiStore((state) =>
      edgeType === "COMMON"
        ? state.edgesStyle
        : edgeType === "SOLUTION"
        ? state.solutionEdgesStyle
        : state.removedEdgesStyle,
    ),
    updateEdgesStyle = useUiStore((state) =>
      edgeType === "COMMON"
        ? state.updateEdgesStyle
        : edgeType === "SOLUTION"
        ? state.updateSolutionEdgesStyle
        : state.updateRemovedEdgesStyle,
    );

  return (
    <>
      {/*  */}
      {edgeType === "REMOVED" && (
        <div className="flex w-full flex-col px-8 py-4">
          <div className="flex flex-row items-center justify-between">
            <Label.Root
              className="text-md font-normal leading-[35px] text-zinc-300"
              htmlFor="edge-removed-visible"
            >
              Visible
            </Label.Root>
            <Switch.Root
              className="relative h-[25px] w-[42px] cursor-default rounded-full bg-zinc-800 shadow-[0_2px_10px] shadow-zinc-600 outline-none focus:shadow-[0_0_0_2px] focus:shadow-zinc-900/50 data-[state=checked]:bg-zinc-400"
              id="edge-removed-visible"
              onCheckedChange={(value) =>
                updateEdgesStyle({
                  ...edgesStyle,
                  visible: value,
                })
              }
              checked={edgesStyle.visible}
              style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
            >
              <Switch.Thumb className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-zinc-200 shadow-[0_2px_2px] shadow-zinc-600 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
        </div>
      )}
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
    </>
  );
}
