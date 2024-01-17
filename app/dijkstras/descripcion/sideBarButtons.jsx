"use client";

import { RefreshCcw, Dices, Play, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Tooltip from "@/components/shared/tooltip";
import Toasted from "@/components/shared/toast";
import { useUiStore, useDataStore } from "@/lib/store";

export function SideBarButtons() {
  const toggleSettingsMenuOpen = useUiStore(
    (state) => state.toggleSettingsMenuOpen,
  );
  const setTooltip = useUiStore((state) => state.setTooltip);
  const removeTooltip = useUiStore((state) => state.removeTooltip);
  const tooltipId = useUiStore((state) => state.tooltipId);

  const error = useDataStore((state) => state.error);
  const setError = useDataStore((state) => state.setError);

  const router = useRouter();

  // view if error change, if true wait 5 sec and turn false
  return (
    <>
      <div className="flex flex-col gap-2">
        <Tooltip content="Solve" side="rigth" sideOffset={42}>
          <button
            //   onClick={() => searchSolution()}
            className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <Play />
            {/* if error pop up the tooltip with the error message */}
          </button>
        </Tooltip>
        <Tooltip content="Regenerate" side="rigth" sideOffset={42}>
          <button
            onClick={() => router.refresh()}
            className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <RefreshCcw />
          </button>
        </Tooltip>

        <Tooltip content="Random start and finish" side="rigth" sideOffset={42}>
          <button
            //   onClick={() => rerollStartAndFinishPoints()}
            className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <Dices />
          </button>
        </Tooltip>
        <button
          onClick={() => setError(true)}
          className="mt-1 px-2 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
        >
          <Dices />
        </button>
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
