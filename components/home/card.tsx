import Link from "next/link";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

export default function Card({
  title,
  linkTo,
  description,
  demo,
  large,
}: {
  title: string;
  linkTo: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex h-60 items-center justify-center">{demo}</div>
      <div className="flex h-36 w-full flex-col items-center justify-evenly text-center backdrop-blur-sm">
        <Link
          href={linkTo}
          className="border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] hover:border-b-2 md:text-3xl md:font-normal"
        >
          {title}
        </Link>
        <div className="prose-sm mt-3 leading-normal text-gray-500 [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                  inline="true"
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
