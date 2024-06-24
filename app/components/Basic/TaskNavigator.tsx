"use client";
import Link from "next/link";
import { taskGroupList } from "@/app/data/task";
import { useNotificationBar } from "@/app/store/account";
import { cn } from "@/lib/utils";
import { useLotteryBar } from "@/app/store/lottery";

export function TaskNavigator({ taskId }: any) {
  const tasks = taskGroupList.map((item) => item.list).flat();

  const { isOpen: isOpenLotteryBar, onOpen: onOpenLotteryBar } =
    useLotteryBar();
  const { isOpen: isOpenNotificationBar, onOpen: onOpenNotificationBar } =
    useNotificationBar();

  return (
    <div className="flex flex-col w-[400px]">
      <Link
        href="/task"
        className={cn(
          "group flex flex-row items-center gap-2 h-20 bg-[#111111] pl-8 sticky top-20 z-10",
          isOpenLotteryBar || isOpenNotificationBar ? "top-32" : "top-20"
        )}
      >
        <img
          className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-300"
          src="/images/arrow-back.svg"
          alt=""
        />
        <span className="text-white/30 text-2xl font-semibold font-orbitron group-hover:opacity-80 transition-opacity duration-300">
          Back
        </span>
      </Link>
      {tasks.map((task, taskIndex) => (
        <Link
          key={taskIndex}
          href={task.available ? `/task/${task.id}` : "#"}
          className={cn(
            "group/nav flex w-[400px] h-[200px] border-l-[6px] border-solid transition-all duration-300 relative overflow-hidden",
            task.id === taskId ? "border-[#F79342]" : "border-transparent",
            task.available
              ? "opacity-100 cursor-pointer"
              : "opacity-30 cursor-not-allowed border-none"
          )}
        >
          <img
            className="w-full h-full absolute top-0 left-0  "
            src={`/images/${task.id}.png`}
            alt=""
          />
          <div
            className={cn(
              `w-full h-full absolute top-0 left-0 background-highlight opacity-0 transition-opacity duration-300`,
              task.id === taskId ? "opacity-100" : "",
              task.available ? "" : ""
            )}
          ></div>
          <span
            className={cn(
              `font-orbitron text-2xl font-normal absolute left-[32px] bottom-[24px] transition-colors duration-300`,
              task.id === taskId ? "text-[#FBB042]" : "text-white/50",
              task.available ? "group-hover/nav:text-[#FBB042]" : ""
            )}
          >
            {task.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
