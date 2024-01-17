import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ms from "ms";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const applyMargin = (value: number, margin: number, max: number) =>
  value <= margin
    ? value + (margin - value)
    : value >= max - margin
    ? max - margin
    : value;
export function calcDistance(x1: number, x2: number, y1: number, y2: number) {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
export const calcDirection = (a: number, b: number) => (a > b ? -1 : 1);
export function calcPosOnCircle(
  p1: { y: number; x: number },
  q1: { y: number; x: number },
  r: number,
) {
  const m = (q1.y - p1.y) / (q1.x - p1.x);
  const alpha = Math.atan(m);
  const directionX = calcDirection(p1.x, q1.x),
    directionY = calcDirection(p1.y, q1.y);
  return {
    x: p1.x + Math.abs(Math.cos(alpha) * r * 0.25) * directionX,
    y: p1.y + Math.abs(Math.sin(alpha) * r * 0.25) * directionY,
  };
}
export async function intersectan(
  p1: { y: number; x: number },
  q1: { y: number; x: number },
  p2: { y: number; x: number },
  q2: { y: number; x: number },
) {
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
