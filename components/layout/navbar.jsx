"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";

import ScrollArea from "@/components/shared/scroll-area";

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
  {
    path: "/voronoi",
    name: "Voronoi diagram",
  },
];

const subNavItems = {
  "/dijkstras": [
    { path: "/random-graph", name: "Random graph" },
    { path: "/grid-graph", name: "Grid graph" },
    { path: "/laberint-graph", name: "Laberint graph (DFS)" },
  ],
  "/astar": [],
  "/tps": [],
  "/vrp": [],
  "/voronoi": [{ path: "/random-graph", name: "Random graph" }],
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
            "mx-2 my-2 flex w-full max-w-screen-xl flex-row flex-nowrap items-center justify-start gap-1 transition-all duration-300 ease-in md:mx-5 md:my-0" +
            (scrolledTwo ? " -top-1/2 h-0 opacity-0" : " h-12 opacity-100")
          }
        >
          <Link
            href="/"
            className="flex w-8 items-center font-display text-2xl"
          >
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-4 rounded-full"
            ></Image>
          </Link>
          <ScrollArea
            rootClassName="flex flex-row flex-nowrap w-full h-fit overflow-hidden mr-1"
            orientation="horizontal"
            scrollHideDelay={1200}
          >
            <div className="flex w-full flex-row flex-nowrap items-center justify-start gap-1 py-3 ">
              {navItems.map((item, index) => {
                const isActive = pathname.includes(item.path);

                return (
                  <Link
                    key={item.path}
                    className={`relative whitespace-nowrap rounded-md px-4 text-center text-sm no-underline duration-300 ease-out lg:text-base ${
                      isActive
                        ? "bg-zinc-500/50 p-1 text-zinc-300"
                        : "m-1 text-zinc-300/50 hover:bg-zinc-500/20 hover:text-zinc-300/90"
                    }`}
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {navItems.findIndex((p) => pathname.includes(p.path)) != -1 && (
          <div
            key={"bottom-nav" + pathname.split("/")[1]}
            className="relative mx-2 my-2 flex h-8 w-full max-w-screen-xl items-center justify-start gap-2 rounded-lg duration-500 ease-in md:mx-5 md:my-0"
          >
            {scrolledTwo && (
              <div className="relative whitespace-nowrap border-r-2 border-zinc-500 bg-zinc-800/50 p-1 px-4 text-center text-sm text-zinc-300 no-underline duration-500 ease-in lg:text-base">
                {navItems.find((item) => pathname.includes(item.path)).name}
              </div>
            )}
            <ScrollArea
              rootClassName="flex flex-row flex-nowrap w-full h-fit overflow-hidden"
              orientation="horizontal"
              scrollHideDelay={1200}
            >
              <div className="flex w-full flex-row flex-nowrap items-center justify-start gap-1 py-3 ">
                {subNavItems[
                  navItems.find((item) => pathname.includes(item.path)).path
                ].map((subItem, index) => {
                  const item = navItems.find((p) => pathname.includes(p.path));
                  const isActive = pathname.includes(subItem.path);
                  return (
                    <Link
                      key={item.path + subItem.path}
                      className={`relative whitespace-nowrap rounded-md px-4 py-2 text-center text-sm no-underline duration-300 ease-in lg:text-base ${
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
                      {subItem.name}
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  );
}
