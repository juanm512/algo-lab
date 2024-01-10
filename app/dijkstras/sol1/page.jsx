"use client";

import { RefreshCcw, Dices } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function calcDistance(x1, x2, y1, y2) {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
const calcDirection = (a, b) => (a > b ? -1 : 1);

function calcPosOnCircle(p1, q1, r) {
  const m = (q1.y - p1.y) / (q1.x - p1.x);
  const alpha = Math.atan(m);
  const directionX = calcDirection(p1.x, q1.x),
    directionY = calcDirection(p1.y, q1.y);
  return {
    x: p1.x + Math.abs(Math.cos(alpha) * r * 0.25) * directionX,
    y: p1.y + Math.abs(Math.sin(alpha) * r * 0.25) * directionY,
  };
}

function intersecta(p1, q1, p2, q2) {
  const a = (q1.y - p1.y) / (q1.x - p1.x),
    b = (q2.y - p2.y) / (q2.x - p2.x);
  if (a == b) return false;

  const c = p1.y - a * p1.x,
    d = p2.y - b * p2.x;

  const P = {
    x: (d - c) / (a - b),
    y: (a * d - b * c) / (a - b),
  };

  // if (onSegment(p1, P, q1)) return true;
  if ((P.x > p1.x && P.x < q1.x) || (P.x > q1.x && P.x < p1.x))
    if ((P.y > p1.y && P.y < q1.y) || (P.y > q1.y && P.y < p1.y))
      if ((P.x > p2.x && P.x < q2.x) || (P.x > q2.x && P.x < p2.x))
        if ((P.y > p2.y && P.y < q2.y) || (P.y > q2.y && P.y < p2.y))
          return true;
  return false;
}

function applyMargins(value, margin, maxValue) {
  if (value <= margin) return value + margin;
  else if (value >= maxValue - margin) return value - margin;
  else return value;
}

export default function Home() {
  const dims = {
    w: 1600,
    h: 900,
  };
  const r = 10;

  // let points: { x: number; y: number }[] = [];
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);

  const [finishPointIndex, setFinishPointIndex] = useState(1);
  const [startPointIndex, setStartPointIndex] = useState(0);

  async function generateRandomPoints(number = 10) {
    console.time("generateRandomPoints");
    let newPoints = [];
    for (let i = 0; i < number; i++) {
      let x = Math.random(),
        y = Math.random();
      let valid = false;
      while (newPoints.length != 0 && !valid) {
        valid = true;
        x = Math.random();
        y = Math.random();
        for (let j = 0; j < newPoints.length; j++) {
          if (
            Math.abs(x * dims.w - newPoints[j].x * dims.w) <= 50 ||
            Math.abs(y * dims.h - newPoints[j].y * dims.h) <= 30
          ) {
            valid = false;
            break;
          }
        }
      }

      newPoints.push({
        x,
        y,
        coords: {
          x: applyMargins(x * dims.w, 20, dims.w),
          y: applyMargins(y * dims.h, 60, dims.h),
        },
      });
    }
    setPoints([...newPoints]);
    console.timeEnd("generateRandomPoints");
  }

  async function generateLinesBetweenPoints() {
    console.time("generateLinesBetweenPoints");
    const lineas = [];
    const cantL = 7;
    for (let i = 0; i < points.length; i++) {
      let nearPoints = [];
      let dist = 100000,
        oldDist = 0;
      while (nearPoints.length < cantL) {
        for (let j = 0; j < points.length; j++) {
          if (j != i) {
            const d = calcDistance(
              points[i].x * dims.w,
              points[j].x * dims.w,
              points[i].y * dims.h,
              points[j].y * dims.h,
            );
            if (d < dist && d > oldDist) {
              nearPoints.push({
                index: j,
                d,
              });
            }
          }
        }
        oldDist = dist;
        dist += dist > 400000 ? 25000 : 100000;
      }
      // nearPoints.sort((a, b) => b.d - a.d);
      // .splice(0, cantL);
      nearPoints.forEach((p) => {
        const p1 = { x: points[i].coords.x, y: points[i].coords.y },
          q1 = {
            x: points[p.index].coords.x,
            y: points[p.index].coords.y,
          };
        const { x: x1, y: y1 } = calcPosOnCircle(p1, q1, r);
        const { x: x2, y: y2 } = calcPosOnCircle(q1, p1, r);
        const line = {
          id: `line-${i}-${p.index}-${p1.x},${p1.y}-${q1.x},${q1.y}`,
          d: p.d,
          remove: false,
          inter: [],
          p1i: i,
          x1,
          y1,
          p2i: p.index,
          x2,
          y2,
        };
        if (lineas.findIndex((l) => l.p1i == p.index && l.p2i == i) == -1) {
          lineas.push(line);
        }
      });
    }
    setLines([...lineas]);
    console.timeEnd("generateLinesBetweenPoints");
  }

  function calculateMostDistant() {
    console.time("calculateMostDistant");
    const first = points[0];
    let aux = 0,
      indexMostD = 9;
    for (let i = 1; i < points.length; i++) {
      const d = calcDistance(
        first.x * dims.w,
        points[i].x * dims.w,
        first.y * dims.h,
        points[i].y * dims.h,
      );
      if (d > aux) {
        aux = d;
        indexMostD = i;
      }
    }
    // console.log(aux);
    setFinishPointIndex(indexMostD);
    console.timeEnd("calculateMostDistant");
  }

  function removeLongLinesIntersecting() {
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

  function toogleRemove(id) {
    const nextLines = lines.map((l) => {
      if (id == l.id) {
        console.log(id, "intersecta con: ", l.inter);
        return { ...l, remove: !l.remove };
      }
      return l;
    });
    setLines([...nextLines]);
  }

  useEffect(() => {
    calculateMostDistant();
    generateLinesBetweenPoints();
    removeLongLinesIntersecting();
    console.log("--- Puntos generados y lineas generadas --- \n\n\n");
  }, [points]);

  return (
    <div className="relative mx-16 my-32 flex aspect-video h-full max-h-screen w-full max-w-screen-xl animate-fade-up rounded-lg border-2 border-zinc-500 shadow-md">
      <div className="absolute left-0 top-0 flex h-10 w-full flex-row gap-1 divide-x-2 rounded-t-lg border-b border-zinc-700 bg-black/30 backdrop-blur-xl">
        <button
          onClick={(e) => {
            generateRandomPoints(20);
          }}
          className="relative rounded-md px-4 py-2 text-center text-sm text-zinc-300/50 no-underline duration-300 ease-in hover:text-zinc-300 lg:text-base"
        >
          {points.length == 0 ? (
            <span className="flex gap-1 text-base">
              <Dices /> Generate
            </span>
          ) : (
            <span className="flex gap-1 text-base">
              <RefreshCcw /> Regenerate
            </span>
          )}
        </button>
      </div>
      <svg
        viewBox={"0 0 " + dims.w + " " + dims.h}
        className="inset-0 w-full rounded-lg bg-zinc-800"
      >
        {lines.map((l) => (
          <line
            key={l.id}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={l.remove ? "#ff000070" : "#ffffff70"}
            strokeWidth={1}
            onClick={(e) => {
              toogleRemove(l.id);
            }}
          />
        ))}
        {points &&
          points.map((p, index) => (
            <>
              <circle
                key={"circle" + index}
                cx={p.coords.x}
                cy={p.coords.y}
                r={r}
                className="animate-fade-up stroke-slate-500 stroke-2 transition-all duration-500 ease-in"
                style={{
                  fill:
                    index == startPointIndex
                      ? "#ffffff90"
                      : index == finishPointIndex
                      ? "#ff00f090"
                      : "#52525290",
                }}
              ></circle>
              <text
                x={p.coords.x - 5}
                y={p.coords.y + 5}
                style={{ font: "15px sans-serif", fill: "white" }}
              >
                {index}
              </text>
            </>
          ))}
      </svg>
    </div>
  );
}
