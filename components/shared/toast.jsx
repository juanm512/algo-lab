import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

const Toasted = ({ error, setError }) => {
  //   const [open, setOpen] = React.useState(false);

  return (
    <Toast.Provider swipeDirection="left">
      <Toast.Root
        className="flex flex-row items-center gap-x-2 rounded-md bg-zinc-900/50 p-[15px] text-left shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] backdrop-blur transition-opacity [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={error}
        onOpenChange={() => {
          console.log(error);
          setError(false);
        }}
      >
        <div className="flex flex-col justify-evenly">
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-red-300 [grid-area:_title]">
            Could not find a solution
          </Toast.Title>
          <Toast.Description className="text-zinc-400">
            The points may be isolated from each other
          </Toast.Description>
        </div>
        <Toast.Close className="rounded-md p-2 text-zinc-400 hover:bg-zinc-700/50">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="absolute left-full right-full top-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
};

export default Toasted;
