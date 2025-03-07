import { Solve } from "@/interfaces/Solve";
import formatDate from "@/lib/formatDate";
import { useSolvesStore } from "@/store/SolvesStore";
import formatTime from "@/lib/formatTime";

interface SingleSolveItem {
  solve: Solve;
}

export default function SingleSolveItem({ solve }: SingleSolveItem) {
  const { setStatus, setSolve } = useSolvesStore();
  return (
    <>
      <div
        onClick={() => {
          setSolve(solve);
          setStatus(true);
        }}
        className="relative flex items-center justify-center w-auto gap-1 p-1 text-lg font-medium text-center transition duration-200 rounded-md cursor-pointer z-1 h-14 light:bg-neutral-50 light:shadow-sm light:shadow-neutral-400 light:hover:bg-neutral-100 light:text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:shadow-sm dark:text-neutral-200"
      >
        <div className="tracking-wider">
          <span className="text-md">
            {formatTime(solve.time).split(".")[0]}
          </span>
          <span className="text-sm">
            .{formatTime(solve.time).split(".")[1]}
          </span>
        </div>
        {solve.plus2 ? <span className="text-sm text-red-600">+2</span> : null}
        <div className="absolute z-20 text-xs top-1 left-1">
          {formatDate(solve.endTime).slice(0, 5)}
        </div>
      </div>
    </>
  );
}
