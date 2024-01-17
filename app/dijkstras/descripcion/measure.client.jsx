"use client";
import * as React from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { useBasicConfigStore } from "@/lib/store";

export default function Measure() {
  const updateDims = useBasicConfigStore((state) => state.updateDims);
  const [ref, { width, height }] = useMeasure();
  // updateDims(width, height);

  console.log(width, height);
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full min-h-full w-full touch-none select-none opacity-0"
    ></div>
  );
}
