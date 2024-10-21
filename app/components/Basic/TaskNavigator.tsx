"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { UTCDate } from "@date-fns/utc";

import { taskGroupList } from "@/app/data/task";
import { useNetworkInfo, useNotificationBar } from "@/app/store/account";
import { cn, isMobileViewport } from "@/lib/utils";
import { useLotteryBar } from "@/app/store/lottery";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Arrow } from "@/app/icons/Arrow";

export function TaskNavigator({ taskId, className }: any) {
  let tasks = taskGroupList.map((item) => item.list).flat();

  const currentTask = tasks.find((task: any) => task.id === taskId);
  const [isExpand, setIsExpand] = useState(false);

  const { networkId } = useNetworkInfo();

  if (currentTask && isMobileViewport()) {
    tasks = tasks.filter((task: any) => task.id !== taskId);
    tasks.unshift(currentTask);
  }

  const { isOpen: isOpenLotteryBar, onOpen: onOpenLotteryBar } =
    useLotteryBar();
  const { isOpen: isOpenNotificationBar, onOpen: onOpenNotificationBar } =
    useNotificationBar();

  const hasTaskStarted = (startTime = "") => {
    if (!startTime) {
      return true;
    }
    const now = new UTCDate();
    const startShowTime = new UTCDate(startTime);
    return now >= startShowTime;
  };

  const handleExpandMenu = (id: string) => {
    if (id === taskId) {
      setIsExpand(!isExpand);
    }
  };

  const NavigatorItem = ({ task, taskIndex, className }: any) => {
    const LinkContent = () => (
      <>
        <img
          className="w-full h-auto md:h-full object-cover"
          src={`/images/${task.id}.png`}
          alt=""
        />
        <div
          className={cn(
            `w-full h-full absolute top-0 left-0 background-highlight opacity-0 transition-opacity duration-300 rotate-180 md:rotate-0`,
            task.id === taskId ? "opacity-40 md:opacity-100" : "",
            task.available[networkId || "devnet"] ? "" : ""
          )}
        ></div>
        <span
          className={cn(
            `inline-flex md:flex-col md:gap-2 items-center md:items-start font-orbitron text-base md:text-2xl font-semibold md:font-normal absolute left-[32px] top-0 md:top-auto bottom-0 md:bottom-[24px] transition-colors duration-300`,
            task.id === taskId ? "text-[#FBB042]" : "text-white/50",
            task.available[networkId || "devnet"]
              ? "group-hover/nav:text-[#FBB042]"
              : ""
          )}
        >
          {task.showPeriod ? (
            <span className="hidden md:inline-flex text-xs font-semibold">
              {task.period}
            </span>
          ) : null}
          <span className="inline-flex items-center font-extrabold">
            {task.name}
          </span>
        </span>
        {task.id === taskId ? (
          <Arrow
            color="#FBB042"
            className={cn(
              isExpand ? "rotate-0" : "rotate-180",
              "inline-flex md:hidden w-6 h-6 absolute z-0 top-0 bottom-0 right-4 m-auto transition-transform duration-300"
            )}
          />
        ) : null}
      </>
    );

    return task.available[networkId || "devnet"] && task.id !== taskId ? (
      <Link
        key={taskIndex}
        href={`/task/${task.id}`}
        className={cn(
          "group/nav flex w-full h-full border-l-[4px] md:border-l-[6px] border-solid transition-all duration-300 relative overflow-hidden",
          task.id === taskId ? "border-[#F79342]" : "border-transparent",
          task.available[networkId || "devnet"]
            ? "opacity-100 cursor-pointer"
            : "opacity-30 cursor-not-allowed border-none",
          className
        )}
        onClick={() => handleExpandMenu(task.id)}
      >
        <LinkContent />
      </Link>
    ) : (
      <div
        key={taskIndex}
        className={cn(
          "group/nav flex w-full h-full border-l-[4px] md:border-l-[6px] border-solid transition-all duration-300 relative overflow-hidden",
          task.id === taskId ? "border-[#F79342]" : "border-transparent",
          task.available[networkId || "devnet"]
            ? "opacity-100 cursor-pointer"
            : "opacity-30 cursor-not-allowed border-none",
          className
        )}
        onClick={() => handleExpandMenu(task.id)}
      >
        <LinkContent />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "bg-[#111] md:relative",
        isExpand ? "fixed" : "",
        className
      )}
    >
      <Link
        href="/task"
        className={cn(
          "group inline-flex flex-row items-center gap-2 h-[64px] md:h-[80px] bg-[#111111] pl-4 md:pl-8 sticky top-20 z-10",
          isOpenNotificationBar ? "top-32" : "top-16",
          isOpenLotteryBar ? "top-[124px]" : "top-16"
        )}
      >
        <img
          className="w-8 h-8 md:w-6 md:h-6 group-hover:opacity-80 transition-opacity duration-300 filter grayscale"
          src="/images/arrow-back.svg"
          alt=""
        />
        <span className="text-white/30 text-xl md:text-2xl font-semibold font-orbitron group-hover:opacity-80 transition-opacity duration-300">
          Back
        </span>
      </Link>

      {tasks
        .filter((task) => hasTaskStarted(task.startTime))
        .map((task, taskIndex) => (
          <div
            key={taskIndex}
            className={cn(
              "w-full h-14 md:h-auto relative md:pb-[50%] transition-all duration-300",
              !isExpand ? "h-auto" : "",
              task.id === taskId ? "h-14" : ""
            )}
          >
            <div className="absolute inset-0">
              <NavigatorItem task={task} taskIndex={taskIndex} />
            </div>
          </div>
        ))}
    </div>
  );
}
