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

const icons: any = {
  twitter: <Twitter width={250} height={250} color="#313131" />,
  calendar: <Calendar width={250} height={250} color="#313131" />,
  chip: <Chip width={250} height={250} color="#313131" />,
  recommand: <Recommand width={250} height={250} color="#313131" />,
  diversity: <Diversity width={250} height={250} color="#313131" />,
  game: <Controller width={250} height={250} color="#313131" />,
};

const TaskCenter: NextPage = () => {
  const router = useRouter();
  const { address, status, setStatus } = useTaskInfo();
  const { wallet } = useWallet();
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
    <div className="bg-[#000] w-full h-[411px] flex justify-center py-24 overflow-hidden relative">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -top-80 -right-80"
      />
      <div className="max-w-[1464px] 2xl:w-full relative">
        <h2 className="text-white font-orbitron text-5xl font-semibold">
          Odyssey Task Center
        </h2>
        <p className="text-white text-xl font-normal mt-5">
          Embark on your Odyssey by completing various tasks! Earn more rings
          along the way!{" "}
          <span
            className="text-[#25A3ED] hover:underline cursor-pointer"
            onClick={handleOpenFAQDialog}
          >
            FAQs
          </span>
        </p>
        <div className="flex flex-row gap-6 mt-16">
          <Button
            className="text-white text-base font-bold font-orbitron w-[230px] h-12 transition-all duration-300 bg-[#0000FF] hover:bg-[#000C79] active:bg-[#000C79]/50"
            onClick={handleStartTask}
          >
            Start My Task
          </Button>
          <Button
            className="text-white text-base font-bold font-orbitron w-[230px] h-12 bg-transparent hover:bg-white/10 active:opacity-80 border boder-solid border-white transition-all duration-300"
            onClick={handleOpenHowToPlayDialog}
          >
            How to Play?
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="w-full max-w-[1464px] bg-[#111111] mt-20 mb-20">
      <div className="w-full flex flex-col gap-24">
        {taskGroupList.map((taskGroup: any, taskGroupIndex: number) => (
          <Card
            key={taskGroupIndex}
            size={CardSize.Default}
            name={taskGroup.name}
            className="w-full relative"
          >
            <div className="flex flex-wrap flex-row gap-10">
              {taskGroup.list.map((task: any, taskIndex: number) => (
                <Link
                  href={
                    task.available && isSupportSonic(wallet?.adapter.name)
                      ? `/task/${task.id}`
                      : "#"
                  }
                  className={cn(
                    "group/task",
                    task.available && isSupportSonic(wallet?.adapter.name)
                      ? "opacity-100 cursor-pointer"
                      : "opacity-30 cursor-not-allowed"
                  )}
                  key={taskIndex}
                >
                  <div
                    className={cn(
                      "bg-[#1E1E1E] w-[663px] h-[263px] px-8 py-8 rounded-md transition-colors duration-300 overflow-hidden relative",
                      task.available && isSupportSonic(wallet?.adapter.name)
                        ? "group-hover/task:bg-[#181818]"
                        : ""
                    )}
                  >
                    <h5 className="text-white/70 text-5xl font-semibold font-orbitron">
                      {task.name}
                    </h5>
                    <p className="text-white/60 text-base font-normal w-[420px] mt-5">
                      {task.description}
                    </p>
                    <div className="flex flex-row justify-start items-center w-full absolute left-0 bottom-0">
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
                        "origin-center rotate-12 opacity-50 absolute -bottom-4 -right-10 transition-all duration-300",
                        task.available && isSupportSonic(wallet?.adapter.name)
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
      <main className="bg-[#111111] flex min-h-screen flex-col items-center justify-between">
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
