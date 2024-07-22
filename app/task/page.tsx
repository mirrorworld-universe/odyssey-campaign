"use client";
import React, { useEffect } from "react";
import { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Chip } from "../icons/Chip";
import { Twitter } from "../icons/Twitter";
import { Calendar } from "../icons/Calendar";
import { Recommand } from "../icons/Recommand";
import { Diversity } from "../icons/Diversity";
import { Controller } from "../icons/Controller";
import { Go as IconGo } from "@/app/icons/Go";

import { Button } from "@/components/ui/button";
import { Card, CardSize } from "../components/Basic/Card";
import { FAQDialog } from "../components/Dialog/FAQ";
import { HowToPlayDialog } from "../components/Dialog/HowToPlay";

import { taskGroupList } from "../data/task";
import { useTaskInfo } from "../store/task";
import { isSupportSonic } from "../wallet/wallet-list";
import { useFAQModal, useHowToPlayModal } from "../store/tutorials";

import { cn } from "@/lib/utils";
import { trackClick } from "@/lib/track";
import { Footer } from "../components/Basic/Footer";
import { useNetworkInfo } from "../store/account";

const icons: any = {
  twitter: (
    <Twitter
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
  calendar: (
    <Calendar
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
  chip: (
    <Chip
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
  recommand: (
    <Recommand
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
  diversity: (
    <Diversity
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
  game: (
    <Controller
      className="w-[120px] h-[120px] md:w-[250px] md:h-[250px]"
      color="#313131"
    />
  ),
};

const TaskCenter: NextPage = () => {
  const router = useRouter();
  const { address, status, setStatus } = useTaskInfo();
  const { wallet } = useWallet();
  const { networkId } = useNetworkInfo();
  const {
    isOpen: isOpenHowToPlayDialog,
    onOpen: onOpenHowToPlayDialog,
    onClose: onCloseHowToPlayDialog,
  } = useHowToPlayModal();
  const {
    isOpen: isOpenFAQDialog,
    onOpen: onOpenFAQDialog,
    onClose: onCloseFAQDialog,
  } = useFAQModal();

  const handleStartTask = () => {
    router.push(
      status && status[address]["meet-sonic"]
        ? "/task/check-in"
        : "/task/meet-sonic"
    );
  };

  const handleOpenHowToPlayDialog = () => {
    onOpenHowToPlayDialog();
    trackClick({ text: "How to play?" });
  };

  const handleOpenFAQDialog = () => {
    onOpenFAQDialog();
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash === "how-to-play") {
      onOpenHowToPlayDialog();
    }
    if (hash && hash === "faq") {
      onOpenFAQDialog();
    }
  }, []);

  const Header = () => (
    <div className="bg-[#000] w-full md:h-[411px] flex justify-center overflow-hidden relative px-4 py-4 md:py-24">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -top-80 -right-80"
      />
      <div className="w-full max-w-[1464px] relative">
        <h2 className="text-white font-orbitron text-2xl md:text-5xl font-semibold">
          Odyssey Task Center
        </h2>
        <p className="text-white/60 md:text-white text-sm md:text-xl font-normal mt-4 md:mt-5">
          Embark on your Odyssey by completing various tasks! Earn more rings
          along the way!{" "}
          <span
            className="text-[#25A3ED] hover:underline cursor-pointer"
            onClick={handleOpenFAQDialog}
          >
            FAQs
          </span>
        </p>

        {/* tools */}
        <div className="bg-[#000] flex flex-row-reverse md:flex-row gap-3 md:gap-6 mt-16 fixed md:relative bottom-0 left-0 right-0 z-10 px-4 py-5 md:px-0 md:py-0">
          <Button
            className="text-white text-base font-bold font-orbitron w-full md:w-[230px] h-12 transition-all duration-300 bg-[#0000FF] hover:bg-[#000C79] active:bg-[#000C79]/50"
            onClick={handleStartTask}
          >
            Start My Task
          </Button>
          <Button
            className="text-white text-base font-bold font-orbitron w-full md:w-[230px] h-12 bg-transparent hover:bg-white/10 active:opacity-80 border boder-solid border-white transition-all duration-300"
            onClick={handleOpenHowToPlayDialog}
          >
            How to Play?
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="w-full max-w-[1464px] mt-2 mb-2 md:mt-20 md:mb-20 px-4 py-4 md:px-0 md:py-0">
      <div className="w-full flex flex-col gap-8 md:gap-24">
        {taskGroupList.map((taskGroup: any, taskGroupIndex: number) => (
          <Card
            key={taskGroupIndex}
            size={CardSize.Default}
            name={taskGroup.name}
            className="w-full relative px-4 py-4 md:px-12 md:py-12 rounded md:rounded-xl"
            nameClassName="text-xs md:text-[32px] bg-[#000] md:bg-[#111] px-1 md:px-4 left-2 md:left-7 -top-2"
          >
            <div className="flex flex-wrap flex-row gap-4 md:gap-10">
              {taskGroup.list.map((task: any, taskIndex: number) => (
                <Link
                  href={
                    task.available[networkId || "devnet"] &&
                    isSupportSonic(wallet?.adapter.name)
                      ? `/task/${task.id}`
                      : "#"
                  }
                  className={cn(
                    "group/task w-full md:max-w-[663px]",
                    task.available[networkId || "devnet"] &&
                      isSupportSonic(wallet?.adapter.name)
                      ? "opacity-100 cursor-pointer"
                      : "opacity-30 cursor-not-allowed"
                  )}
                  key={taskIndex}
                >
                  <div
                    className={cn(
                      "bg-[#1E1E1E] w-full h-auto md:h-[263px] px-4 py-4 md:px-8 md:py-8 rounded md:rounded-md transition-colors duration-300 overflow-hidden relative",
                      task.available[networkId || "devnet"] &&
                        isSupportSonic(wallet?.adapter.name)
                        ? "group-hover/task:bg-[#181818]"
                        : ""
                    )}
                  >
                    <h5 className="flex flex-row gap-2 items-center text-white/70 text-base md:text-5xl font-semibold font-orbitron">
                      {task.name}
                      <IconGo
                        width={20}
                        height={20}
                        color="rgba(255,255,255,0.7)"
                        className="inline-block md:hidden"
                      />
                    </h5>
                    <p className="hidden md:flex text-white/60 text-base font-normal w-[420px] mt-5">
                      {task.description}
                    </p>
                    <div className="flex flex-row gap-2 md:hidden mt-4">
                      <div className="text-[10px] text-[#25A3ED] bg-[#212b32] rounded-[2px] px-1 py-[2px]">
                        {task.period}
                      </div>
                      {task.reward ? (
                        <div className="text-[10px] text-[#FBB042] bg-[#332d23] rounded-[2px] px-1 py-[2px]">
                          {task.reward}
                        </div>
                      ) : null}
                    </div>
                    <div className="hidden md:flex flex-row justify-start items-center w-full absolute left-0 bottom-0">
                      <div className="w-[174px] h-10 bg-cover bg-no-repeat bg-[url('/images/period-background.png')]">
                        <span className="inline-flex justify-center items-center w-[150px] h-full text-white text-sm font-bold font-orbitron">
                          {task.period}
                        </span>
                      </div>
                      {task.reward ? (
                        <div className="text-[#FBB042] text-sm font-orbitron ml-1">
                          {task.reward}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        "origin-center rotate-12 opacity-50 absolute -bottom-6 md:-bottom-4 right-0 md:right-0 transition-all duration-300",
                        task.available[networkId || "devnet"] &&
                          isSupportSonic(wallet?.adapter.name)
                          ? "group-hover/task:-right-14"
                          : ""
                      )}
                    >
                      {icons[task.iconName]}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <main className="bg-[#000] md:bg-[#111] flex min-h-screen flex-col items-center justify-start md:justify-between">
        <Header />
        <MainContent />

        {/* dialogs */}
        <HowToPlayDialog />
        <FAQDialog />
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default TaskCenter;
