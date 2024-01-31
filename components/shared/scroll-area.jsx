import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

const ScrollArea = ({
  children,
  orientation,
  rootClassName,
  scrollHideDelay,
}) => (
  <ScrollAreaPrimitive.Root
    className={rootClassName}
    scrollHideDelay={scrollHideDelay || 600}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded">
      {children}
    </ScrollAreaPrimitive.Viewport>

    <ScrollAreaPrimitive.Scrollbar
      className="flex touch-none select-none bg-zinc-800/70 p-0.5 backdrop-blur transition-colors duration-[160ms] ease-out hover:bg-zinc-700/70 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="vertical"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-zinc-500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollAreaPrimitive.Scrollbar>

    <ScrollAreaPrimitive.Scrollbar
      className="flex touch-none select-none bg-zinc-800/70 backdrop-blur transition-colors duration-[160ms] ease-out hover:bg-zinc-700/70 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
      orientation="horizontal"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-zinc-500 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollAreaPrimitive.Scrollbar>

    <ScrollAreaPrimitive.Corner className="bg-zinc-800" />
  </ScrollAreaPrimitive.Root>
);

export default ScrollArea;
