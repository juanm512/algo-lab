import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github } from "@/components/shared/icons";
import { Briefcase } from "lucide-react";
import DijkstrasDemo from "@/components/dijkstras/demo/demo-general";
import AstarDemo from "@/components/home/astar-demo";
import VoronoiDemo from "@/components/home/voronoi-demo";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-3xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-zinc-200 to-zinc-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Algoritmhs laboratory for training problem resolution
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          A collection of algoritmhs for solving different situations. This
          situations can be translated to real life ones.
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            href={DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Briefcase />
            <p>My protfolio</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/juanm512/algo-lab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              GitHub project{" "}
              {/* <span className="font-semibold">{nFormatter(stars)}</span> */}
            </p>
          </a>
        </div>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, linkTo, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            linkTo={linkTo}
            description={description}
            demo={demo}
            large={large}
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "Dijkstra's Algorithm",
    linkTo: "/dijkstras",
    description:
      "An algorithm for finding the shortest paths between nodes in a weighted graph. Some examples: [Random graph](/dijkstras/random-graph), [Grid graph](/dijkstras/grid-graph), and [Laberint graph (DFS)](/dijkstras/laberint-graph)",
    large: true,
    demo: <DijkstrasDemo />,
  },
  {
    title: "Astar (A*) Algorithm",
    linkTo: "/astar",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    // demo: <AstarDemo />,
    demo: (
      <div className="flex h-full w-full items-center justify-center ">
        <h5 className="animate-pulse text-center text-xl font-semibold tracking-widest text-zinc-700 delay-1000 duration-500 ">
          Very soon!
        </h5>
      </div>
    ),
  },
  {
    title: "Travelling salesman problem",
    linkTo: "/",
    description:
      "Finds the shortest possible route that visits each node exactly once and returns to the origin node.",
    demo: (
      // <Image
      //   src="/tps.png"
      //   alt="Deploy with Vercel"
      //   width={120}
      //   height={30}
      //   unoptimized
      //   className="h-full w-full"
      // />
      <div className="flex h-full w-full items-center justify-center ">
        <h5 className="animate-pulse text-center text-xl font-semibold tracking-widest text-zinc-700 delay-1000 duration-500 ">
          Working on it
        </h5>
      </div>
    ),
  },
  {
    title: "Vehicle routing problem",
    linkTo: "/",
    description:
      "Tthe optimal design of routes to be used by a fleet of vehicles to serve a set of customers. Generalization of the TSP,",
    demo: (
      // <Image
      //   src="/vrpgs.svg"
      //   alt="Deploy with Vercel"
      //   width={120}
      //   height={30}
      //   unoptimized
      //   className="h-full w-full"
      // />
      <div className="flex h-full w-full items-center justify-center ">
        <h5 className="animate-pulse text-center text-xl font-semibold tracking-widest text-zinc-700 delay-1000 duration-500 ">
          Working on it
        </h5>
      </div>
    ),
  },
  {
    title: "Voronoi diagrams",
    linkTo: "/",
    description:
      "Is a partition of a plane into regions close to each of a given set of objects.",
    demo: <VoronoiDemo />,
  },
];
