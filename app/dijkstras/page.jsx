import DijkstrasDemo from "@/components/dijkstras/demo/demo-general";

export default async function Home() {
  return (
    <div className="relative z-10 w-full max-w-5xl px-5 xl:px-0">
      <div className="absolute left-0 top-0 w-full overflow-hidden">
        <DijkstrasDemo />
      </div>
      <h1
        className="my-[30vh] animate-fade-up bg-gradient-to-b from-zinc-200 to-zinc-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:my-[60vh] md:text-7xl md:leading-[5rem]"
        style={{
          animationDelay: "0.15s",
          animationFillMode: "forwards",
          textShadow: "#16a34a20 2px 2px",
        }}
      >
        Introduction to Dijkstras
      </h1>
      <p
        className="animate-fade-up text-left text-zinc-400 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        here the introduction goes
      </p>
    </div>
  );
}
