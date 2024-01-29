"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  {
    path: "/dijkstras",
    name: "Dijkstra's",
  },
  {
    path: "/astar",
    name: "A* - Astar",
  },
  {
    path: "/tps",
    name: "Traveler Salesman Problem",
  },
  {
    path: "/vrp",
    name: "Vehicle routing problem",
  },
];

const subNavItems = {
  "/dijkstras": [
    { path: "/random-graph", name: "Random graph" },
    { path: "/grid-graph", name: "Grid graph" },
    { path: "/laberint-graph", name: "Laberint graph (DFS)" },
  ],

  "/astar": [
    { path: "/descripcion", name: "Descripcion" },
    { path: "/sol1", name: "Solucion puntos aleatorios" },
    { path: "/sol2", name: "Solucion puntos cuadricula" },
  ],
  "/tps": [
    { path: "/descripcion", name: "Descripcion" },
    { path: "/sol1", name: "Solucion puntos aleatorios" },
    { path: "/sol2", name: "Solucion puntos cuadricula" },
  ],
  "/vrp": [
    { path: "/descripcion", name: "Descripcion" },
    { path: "/sol1", name: "Solucion puntos aleatorios" },
    { path: "/sol2", name: "Solucion puntos cuadricula" },
  ],
};

export default function NavBar() {
  // const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const scrolledTwo = useScroll(100);

  let pathname = usePathname() || "/";

  return (
    <>
      {/* <SignInModal /> */}
      <div
        className={`fixed top-0 z-[100] flex w-full flex-col justify-center ${
          scrolled
            ? "border-b border-zinc-700 bg-black/50 backdrop-blur-xl"
            : "border-black/0 bg-black/0"
        } z-30 transition-all`}
      >
        <div
          className={
            "mx-5 flex w-full max-w-screen-xl items-center justify-start gap-1 transition-all duration-300 ease-in" +
            (scrolledTwo ? " -top-1/2 h-0 opacity-0" : " h-12 opacity-100")
          }
          style={
            {
              // top: scrolledTwo ? "-150%" : "0%",
              // position: scrolledTwo ? "absolute" : "relative",
              // opacity: scrolledTwo ? 0 : 1,
            }
          }
        >
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>

          {navItems.map((item, index) => {
            const isActive = pathname.includes(item.path);

            return (
              <Link
                key={item.path}
                className={`relative rounded-md px-4 text-center text-sm no-underline duration-300 ease-out lg:text-base ${
                  isActive
                    ? "bg-zinc-500/50 p-1 text-zinc-300"
                    : "m-1 text-zinc-300/50 hover:bg-zinc-500/20 hover:text-zinc-300/90"
                }`}
                href={item.path }
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div>{/* aca poner redes */}</div>
        </div>
        {navItems.findIndex((p) => pathname.includes(p.path)) != -1 && (
          <div
            key={"bottom-nav" + pathname.split("/")[1]}
            className="relative mx-5 flex h-8 w-full max-w-screen-xl items-center justify-start gap-2 rounded-lg duration-500 ease-in"
          >
            {scrolledTwo && (
              <div className="relative border-r-2 border-zinc-500 bg-zinc-800/50 p-1 px-4 text-center text-sm text-zinc-300 no-underline duration-500 ease-in lg:text-base">
                <span>
                  {navItems.find((item) => pathname.includes(item.path)).name}
                </span>
              </div>
            )}
            {subNavItems[
              navItems.find((item) => pathname.includes(item.path)).path
            ].map((subItem, index) => {
              const item = navItems.find((p) => pathname.includes(p.path));
              const isActive = pathname.includes(subItem.path);
              return (
                <Link
                  key={item.path + subItem.path}
                  className={`relative rounded-md px-4 py-2 text-center text-sm no-underline duration-300 ease-in lg:text-base ${
                    isActive
                      ? "font-semibold text-zinc-300"
                      : "text-zinc-300/50 hover:text-zinc-300/90"
                  }`}
                  href={item.path + subItem.path}
                >
                  {isActive && (
                    <motion.div
                      layoutId="underlined-link"
                      className="absolute bottom-1 left-0 h-0.5 bg-zinc-500"
                      style={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    />
                  )}
                  <span>{subItem.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
