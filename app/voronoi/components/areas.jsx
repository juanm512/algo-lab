"use client";
import { v4 as randomUUID } from "uuid";

import { calcDistance, intersectan } from "@/lib/utils";
import ConvexHullGrahamScan from "@/lib/graham_scan.min.js";
import { useUiStore, useDataStore } from "@/lib/store";
import { useEffect } from "react";
import { useState } from "react";

const limitsInter = [
  {
    meds: ["t-limit", "l-limit"],
    point: {
      x: 0,
      y: 0,
    },
  },
  {
    meds: ["b-limit", "r-limit"],
    point: {
      x: 1600,
      y: 900,
    },
  },
  {
    meds: ["t-limit", "r-limit"],
    point: {
      x: 1600,
      y: 0,
    },
  },
  {
    meds: ["b-limit", "l-limit"],
    point: {
      x: 0,
      y: 900,
    },
  },
];

async function calculateBorderPoint(m, a, dims) {
  let p, q;

  if (m >= 0) {
    p = {
      x: a < 0 ? -a / m : 0,
      y: a < 0 ? 0 : a,
    };
    const qy = dims.x * m + a;
    q = {
      x: qy > dims.y ? (dims.y - a) / m : dims.x,
      y: qy > dims.y ? dims.y : qy,
    };
  } else {
    const px = -a / m;
    p = {
      x: px > dims.x ? dims.x : px,
      y: px > dims.x ? dims.x * m + a : 0,
    };
    q = {
      x: a >= dims.y ? (dims.y - a) / m : 0,
      y: a > dims.y ? dims.y : a,
    };
  }

  return {
    p,
    q,
  };
}

async function pointOfIntersectionSegmentAndStraight(p1, q1, med) {
  const a = (q1.y - p1.y) / (q1.x - p1.x),
    b = med.m;
  if (a == b) return null;

  const c = p1.y - a * p1.x,
    d = med.a;
  const P = {
    x: (d - c) / (a - b),
    y: (a * d - b * c) / (a - b),
  };

  // if (onSegment(p1, P, q1)) return true;
  if ((P.x > p1.x && P.x < q1.x) || (P.x > q1.x && P.x < p1.x))
    if ((P.y > p1.y && P.y < q1.y) || (P.y > q1.y && P.y < p1.y)) return P;
  // console.log(p1, q1, P);
  return null;
}

async function pointOfIntersectionTwoStraight(med1, med2, dims) {
  const a = med1.m,
    b = med2.m;
  if (a == b) return null;

  const c = med1.a,
    d = med2.a;

  const P = {
    x: (d - c) / (a - b),
    y: (a * d - b * c) / (a - b),
  };
  // if (onSegment(p1, P, q1)) return true;
  if (P.x > 0 && P.x < dims.x && P.y > 0 && P.y < dims.y) return P;
  return null;
}

const calcMediatriz = (p1, q1) => {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = q1;

  const m = (2 * x2 - 2 * x1) / (2 * y1 - 2 * y2);
  const a =
    (Math.pow(x1, 2) - Math.pow(x2, 2) + Math.pow(y1, 2) - Math.pow(y2, 2)) /
    (2 * y1 - 2 * y2);

  return { m, a };
};

async function calculateNearNodes(graph) {
  for (const [key, value] of Object.entries(graph)) {
    value.relNodes = [];
    // const rest = graph.filter((n) => n.id != node.id);

    for (const [keyNei, valueNei] of Object.entries(graph)) {
      if (key != keyNei)
        value.relNodes.push({
          id: keyNei,
          d: calcDistance(value.x, valueNei.x, value.y, valueNei.y),
        });
    }

    value.relNodes
      .sort((a, b) => a.d - b.d)
      .splice(
        parseInt(Object.keys(graph).length / 2 - 1),
        parseInt(Object.keys(graph).length / 2),
      );
    // console.log(value.relNodes);
  }

  return graph;
}

async function calculateMediatrixes(graph) {
  const mediatrixes = [];

  for (const key of Object.keys(graph)) {
    for (const nei of graph[key].relNodes) {
      if (
        !mediatrixes.some(
          (med) => med.nodes.includes(key) && med.nodes.includes(nei.id),
        )
      ) {
        const { m, a } = calcMediatriz(
          { x: graph[key].x, y: graph[key].y },
          { x: graph[nei.id].x, y: graph[nei.id].y },
        );

        mediatrixes.push({
          id: randomUUID(),
          nodes: [key, nei.id],
          m,
          a,
        });
      }
    }
  }
  return mediatrixes;
}

async function calculateIntersections(graph, mediatrixes) {
  const intersections = [];
  // const limitsMeds = [];

  for (const key of Object.keys(graph)) {
    const nodeMeds = mediatrixes.filter((med) => med.nodes.includes(key));

    for (const mediatrix1 of nodeMeds) {
      for (const mediatrix2 of nodeMeds) {
        if (
          mediatrix1.id != mediatrix2.id &&
          !intersections.some(
            (inter) =>
              inter.meds.includes(mediatrix1.id) &&
              inter.meds.includes(mediatrix2.id),
          )
        ) {
          const pointOfInter = await pointOfIntersectionTwoStraight(
            mediatrix1,
            mediatrix2,
            { x: 1600, y: 900 },
          );
          if (pointOfInter) {
            intersections.push({
              meds: [mediatrix1.id, mediatrix2.id],
              node: key,
              point: {
                x: pointOfInter.x,
                y: pointOfInter.y,
              },
            });
          }
        }
      }

      // here add the calculateBorderPoint(m, a, dims) for meds
      const borderPoints = await calculateBorderPoint(
        mediatrix1.m,
        mediatrix1.a,
        { x: 1600, y: 900 },
      );
      // console.log(mediatrix1, borderPoints);
      // here add the inter points for the limits
      Object.values(borderPoints).forEach((point) => {
        let secondMed;
        if (point.x == 0) secondMed = "l-limit";
        else if (point.x == 1600) secondMed = "r-limit";
        else if (point.y == 0) secondMed = "t-limit";
        else if (point.y == 900) secondMed = "b-limit";
        intersections.push({
          meds: [mediatrix1.id, secondMed],
          point: { ...point },
        });
      });
    }
  }
  // console.log(intersections);
  return intersections;
}

async function calculateAreas(intersections, graph, mediatrixes) {
  const areas = {};

  for (const key of Object.keys(graph)) {
    const convexHull = new ConvexHullGrahamScan();

    areas[key] = {
      points: [],
    };
    const nodeMeds = mediatrixes.filter((med) => med.nodes.includes(key));
    const nodeInters = intersections.filter((inter) =>
      nodeMeds.some((m) => inter.meds.includes(m.id)),
    );
    limitsInter.forEach((inter) => nodeInters.push(inter));
    for (const intersection of nodeInters) {
      let validInter = true;
      const medsWithoutInterMeds = nodeMeds.filter(
        (med) => !intersection.meds.includes(med.id),
      );

      for (const med of medsWithoutInterMeds) {
        if (validInter) {
          const intersectaMed = await pointOfIntersectionSegmentAndStraight(
            { x: graph[key].x, y: graph[key].y },
            intersection.point,
            med,
          );
          if (intersectaMed != null) {
            validInter = false;
            break;
          }
        }
      }
      // console.log("valid point: ", validInter);
      if (
        !areas[key].points.some(
          (p) =>
            p.x.toFixed(2) == intersection.point.x.toFixed(2) &&
            p.y.toFixed(2) == intersection.point.y.toFixed(2),
        ) &&
        validInter
      ) {
        areas[key].points.push({
          x: intersection.point.x,
          y: intersection.point.y,
          meds: intersection.meds,
        });
        convexHull.addPoint(intersection.point.x, intersection.point.y);
      }
    }

    // order the points list
    const hullPoints = convexHull.getHull();
    // console.log(hullPoints);
    areas[key].points = [...hullPoints];
  }

  return areas;
}

async function voronoiGenerator(graph) {
  // calculate the n/2 nearest points to every node with their mediatrix

  const mediatrixes = await calculateMediatrixes(
    await calculateNearNodes(graph),
  );

  const intersections = await calculateIntersections(graph, mediatrixes);
  // return intersections;
  return await calculateAreas(intersections, graph, mediatrixes);
}

export default function Areas() {
  const [areas, setAreas] = useState();
  // const nodesStyle = useUiStore((state) => state.nodesStyle);

  const graph = useDataStore((state) => state.graph);

  useEffect(() => {
    console.time("generate areas");
    voronoiGenerator(graph).then((res) => {
      console.log(res);
      setAreas({ ...res });
      // setAreas([...res]);
    });
    console.timeEnd("generate areas");
  }, [graph]);

  return (
    graph &&
    areas &&
    // areas.map((point, i) => (
    //   <circle
    //     key={i}
    //     cx={point.point.x}
    //     cy={point.point.y}
    //     r={5}
    //     fill="#ff2ff450"
    //   />
    // ))
    Object.keys(areas).map((key) => {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      return (
        <>
          {/* {areas[key].points.map((point, i) => (
            <circle
              key={i + "-point-area-" + key}
              cx={point.x}
              cy={point.y}
              r={1}
              fill={"#" + color}
            />
          ))} */}
          <polyline
            key={key + "area"}
            points={areas[key].points.map(
              (point, i) => " " + point.x + "," + point.y,
            )}
            fill={"#" + color + "" + 50}
            stroke={"#" + color}
          />
        </>
      );
    })
  );
}
