"use client";

import { RefreshCcw, Dices, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const dims = {
    w: 1600,
    h: 900,
  };
  const topOffset = 50;
  const margin = { x: 20, y: 20 };
  const gap = { x: 50, y: 50 };

  const boundingBox = {
    x1: margin.x,
    y1: margin.y * 2 + topOffset,
    x2: dims.w - margin.x,
    y2: dims.h - margin.y,
  };

  const amountPoints = {
    x: Math.floor((boundingBox.x2 - boundingBox.x1) / gap.x),
    y: Math.floor((boundingBox.y2 - boundingBox.y1) / gap.y),
  };
  const correctionAmount = {
    x:
      boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x > 0
        ? (boundingBox.x2 - boundingBox.x1 - gap.x * amountPoints.x) /
          amountPoints.x
        : 0,
    y:
      boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y > 0
        ? (boundingBox.y2 - boundingBox.y1 - gap.y * amountPoints.y) /
          amountPoints.y
        : 0,
  };
  const r = 5;
  const distance = {
    x: gap.x + correctionAmount.x,
    y: gap.y + correctionAmount.y,
  };

  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  const [finishPointIndex, setFinishPointIndex] = useState(-1);
  const [startPointIndex, setStartPointIndex] = useState(-1);

  async function generatePoints() {
    console.time("generatePoints");
    let newPoints = [];
    for (let i = 0; i <= amountPoints.x; i++) {
      for (let j = 0; j <= amountPoints.y; j++) {
        newPoints.push({
          x: i * gap.x + correctionAmount.x + boundingBox.x1,
          y: j * gap.y + correctionAmount.y + boundingBox.y1,
          isPath: false,
          visited: false,
          w: Infinity,
          prev: null,
        });
      }
    }
    console.timeEnd("generatePoints");
    return newPoints;
  }

  async function generateLines() {
    console.time("generateLines");
    let lineas = [];
    for (
      let i = 0;
      i < (amountPoints.x + 1) * (amountPoints.y + 1);
      i += amountPoints.y + 1
    ) {
      for (let j = 0; j < amountPoints.y; j++) {
        lineas.push({
          id: `line-${i}-${i + j + 1}`,
          remove: Math.random() > 0.4 ? false : true,
          isPath: false,
          d: distance.y,
          p1i: i + j,
          p2i: i + j + 1,
        });
      }
    }
    for (
      let i = 0;
      i < (amountPoints.x + 1) * (amountPoints.y + 1) - amountPoints.y * 2;
      i += amountPoints.y + 1
    ) {
      for (let j = 0; j <= amountPoints.y; j++) {
        lineas.push({
          id: `line-${i + j}-${i + j + amountPoints.y + 1}`,
          remove: Math.random() > 0.4 ? false : true,
          isPath: false,
          d: distance.x,
          p1i: i + j,
          p2i: i + j + amountPoints.y + 1,
        });
      }
    }

    console.timeEnd("generateLines");
    return lineas;
  }

  function removeRandomLines() {
    console.time("removeLongLinesIntersecting");
    setLines((prevLines) => {
      prevLines.sort((a, b) => b.d - a.d);

      for (let i = 0; i < prevLines.length; i++) {
        for (let j = 0; j < prevLines.length / 2; j++) {
          if (
            i != j &&
            !prevLines[j].remove &&
            intersecta(
              { x: prevLines[i].x1, y: prevLines[i].y1 },
              { x: prevLines[i].x2, y: prevLines[i].y2 },
              { x: prevLines[j].x1, y: prevLines[j].y1 },
              { x: prevLines[j].x2, y: prevLines[j].y2 },
            )
          ) {
            // prevLines[i].inter = [...prevLines[i].inter, prevLines[j].id];
            prevLines[i].remove = true;
            break;
          }
        }
      }
      return prevLines;
    });
    console.timeEnd("removeLongLinesIntersecting");
  }

  function calculateStartFinishPoint() {
    console.time("calculateStartFinishPoint");
    const start = Math.random() * amountPoints.x * amountPoints.y;

    const finish =
      start < amountPoints.x * amountPoints.y * 0.5
        ? Math.random() * amountPoints.x * amountPoints.y * 0.3 +
          amountPoints.x * amountPoints.y * 0.75
        : Math.random() * amountPoints.x * amountPoints.y * 0.25;
    // console.log(start, finish);

    setFinishPointIndex(Math.floor(finish));
    setStartPointIndex(Math.floor(start));
    console.timeEnd("calculateStartFinishPoint");
  }

  useEffect(() => {
    generatePoints().then((res) => setPoints([...res]));
    // generateLines().then((res) => setLines([...res]));

    // // removeLongLinesIntersecting();
    // calculateStartFinishPoint();
    console.log("--- Puntos generados y lineas generadas --- \n\n\n");
  }, []);

  async function solveWithDijkstra() {
    console.time("solveWithDijkstra");
    const arrayPoints = [...points];
    const arrayLines = [...lines];
    let currentP = startPointIndex;
    arrayPoints[currentP].w = 0;

    while (!points[finishPointIndex].visited) {
      const linesWithCurrentP = arrayLines.filter(
        (l) =>
          (l.p1i == currentP || l.p2i == currentP) &&
          !l.remove &&
          !arrayPoints[l.p1i == currentP ? l.p2i : l.p1i].visited,
      );
      // console.log(linesWithCurrentP);
      linesWithCurrentP.forEach((line) => {
        const calc1 = arrayPoints[currentP].w + line.d;
        const nextPointIndex = line.p1i == currentP ? line.p2i : line.p1i;
        if (calc1 < arrayPoints[nextPointIndex].w) {
          arrayPoints[nextPointIndex].w = calc1;
          arrayPoints[nextPointIndex].prev = currentP;
        }
      });

      currentP = await arrayPoints.indexOf(
        arrayPoints.toSorted((a, b) => a.w - b.w).filter((p) => !p.visited)[0],
      );
      arrayPoints[currentP].visited = true;
    }

    let i = finishPointIndex;
    while (i != startPointIndex) {
      const nextIndex = arrayPoints[i].prev;
      arrayPoints[i].isPath = true;

      arrayLines.find(
        (l) =>
          (l.p1i == i && l.p2i == nextIndex) ||
          (l.p2i == i && l.p1i == nextIndex),
      ).isPath = true;

      i = nextIndex;
    }

    setPoints([...arrayPoints]);
    setLines([...arrayLines]);
    console.timeEnd("solveWithDijkstra");
  }

  function regenerateSetUp() {
    if (startPointIndex != -1)
      setPoints((prevP) => [
        ...prevP.map((p) => {
          p.visited = false;
          p.isPath = false;
          p.w = Infinity;
          p.prev = null;
          return p;
        }),
      ]);
    // setLines([]);
    calculateStartFinishPoint();
    generateLines().then((res) => setLines([...res]));
  }

  return (
    <div className="relative mx-16 my-32 flex aspect-video h-full max-h-screen w-full max-w-screen-xl animate-fade-up rounded-lg border-2 border-zinc-500 shadow-md">
      <div className="absolute left-0 top-0 flex h-10 w-full flex-row gap-0 divide-x-2 rounded-t-lg border-b border-zinc-700 bg-black/30 backdrop-blur-xl">
        <button
          onClick={() => {
            regenerateSetUp();
          }}
          className="relative px-4 py-2 text-center text-sm text-zinc-300/50 no-underline transition-transform duration-300 ease-in hover:text-zinc-300 lg:text-base"
        >
          <span className="flex animate-fade-up gap-1 text-base">
            {lines.length == 0 ? (
              <span className="flex gap-1 text-base">
                <Dices /> Generate
              </span>
            ) : (
              <span className="flex gap-1 text-base">
                <RefreshCcw /> Regenerate
              </span>
            )}
          </span>
        </button>
        {startPointIndex != -1 && (
          <button
            onClick={(e) => solveWithDijkstra()}
            className="relative px-4 py-2 text-center text-sm text-zinc-300/50 no-underline transition-transform delay-300 duration-300 ease-in hover:text-zinc-300 lg:text-base"
          >
            <span className="flex animate-fade-up gap-1 text-base delay-100 duration-700">
              <span className="flex gap-1 text-base">
                <Play /> Solve
              </span>
            </span>
          </button>
        )}
      </div>
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 w-full rounded-lg bg-zinc-800"
      >
        {lines &&
          lines.map((l, index) => (
            <line
              className=" transition-all delay-75 duration-300"
              // key={l.id}
              key={index}
              x1={points[l.p1i].x}
              y1={points[l.p1i].y}
              x2={points[l.p2i].x}
              y2={points[l.p2i].y}
              stroke={l.remove ? "#ff000020" : l.isPath ? "#f0ff0f" : "#fefefe"}
              strokeWidth={l.isPath ? 3 : 1}
            />
          ))}
        {points &&
          points.map((p, index) => (
            <circle
              onClick={() =>
                console.log("Point clicked: ", index, " . Data: ", p)
              }
              key={"circle" + p.x + p.y}
              cx={p.x}
              cy={p.y}
              r={
                index == startPointIndex || index == finishPointIndex
                  ? r * 2
                  : p.isPath
                  ? r * 1.5
                  : r
              }
              className="animate-fade-up stroke-slate-500 stroke-2 transition-all duration-500 ease-in"
              style={{
                fill:
                  index == startPointIndex
                    ? "#00ff00"
                    : index == finishPointIndex
                    ? "#ff0000"
                    : p.visited
                    ? "#0000ff"
                    : p.isPath
                    ? "#00ffff"
                    : "#525252",
              }}
            />
          ))}
      </svg>
    </div>
  );
}
