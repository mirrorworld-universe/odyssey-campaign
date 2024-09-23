"use client";
import React, { useEffect } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UTCDate } from "@date-fns/utc";
import { useWallet } from "@solana/wallet-adapter-react";

import { Chip } from "@/app/icons/Chip";
import { Cube } from "@/app/icons/Cube";
import { Twitter } from "@/app/icons/Twitter";
import { Calendar } from "@/app/icons/Calendar";
import { Recommand } from "@/app/icons/Recommand";
import { Diversity } from "@/app/icons/Diversity";
import { Controller } from "@/app/icons/Controller";
import { Go as IconGo } from "@/app/icons/Go";
import { OKX as IconOKX } from "@/app/icons/OKX";
import { Backpack as IconBackpack } from "@/app/icons/Backpack";

import {
  cn,
  isInLotteryCampaignTime,
  isInWalletCampaignTime
} from "@/lib/utils";
import { trackClick } from "@/lib/track";

import { Button } from "@/components/ui/button";
import { Card, CardSize } from "@/app/components/Basic/Card";
import { FAQDialog } from "@/app/components/Dialog/FAQ";
import { HowToPlayDialog } from "@/app/components/Dialog/HowToPlay";
import { Footer } from "@/app/components/Basic/Footer";

import { taskGroupList } from "@/app/data/task";
import { useTaskInfo } from "@/app/store/task";
import { useFAQModal, useHowToPlayModal } from "@/app/store/tutorials";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";

import { WalletList, isSupportSonic } from "@/app/wallet/wallet-list";
import clsx from "clsx";

const icons: any = {
  twitter: (
    <Twitter
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  calendar: (
    <Calendar
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  chip: (
    <Chip
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  recommand: (
    <Recommand
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  diversity: (
    <Diversity
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  game: (
    <Controller
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-12"
      color="#313131"
    />
  ),
  cube: (
    <Cube
      className="size-[120px] md:size-56 xl:size-[250px] origin-center rotate-0"
      color="#313131"
    />
  )
};

const walletIcons: any = {
  okx: <IconOKX className="w-full h-full" color="#FBB042" />,
  backpack: <IconBackpack className="w-full h-full" color="#FBB042" />
};

const TaskCenter: NextPage = () => {
  const router = useRouter();
  const { token } = useAccountInfo();
  const { address, status, setStatus } = useTaskInfo();
  const { wallet } = useWallet();
  const { networkId } = useNetworkInfo();
  const {
    isOpen: isOpenHowToPlayDialog,
    onOpen: onOpenHowToPlayDialog,
    onClose: onCloseHowToPlayDialog
  } = useHowToPlayModal();
  const {
    isOpen: isOpenFAQDialog,
    onOpen: onOpenFAQDialog,
    onClose: onCloseFAQDialog
  } = useFAQModal();

  const handleStartTask = () => {
    if (!token) {
      return;
    }

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
    <div className="bg-[#000] w-full flex justify-center overflow-hidden relative px-4 py-4 xl:py-24 md:py-16">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -top-80 -right-80"
      />
      <div className="w-full max-w-[1464px] relative">
        <h2 className="text-white font-orbitron text-2xl md:text-3xl xl:text-5xl font-semibold">
          Odyssey Task Center
        </h2>
        <p className="text-white/60 md:text-white text-sm md:text-lg xl:text-xl font-normal mt-4 md:mt-5">
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
        <div
          className={clsx(
            "bg-[#000] transition-all font-orbitron flex flex-row-reverse md:flex-row gap-3 md:gap-6 mt-16 fixed md:relative bottom-0 left-0 right-0 z-10 px-4 py-5 md:px-0 md:py-0"
          )}
        >
          <Button
            className="text-white text-base font-bold w-full md:w-[230px] h-12 duration-300 bg-[#0000FF] hover:bg-[#000C79] active:bg-[#000C79]/50"
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

  const hasTaskStarted = (startTime: string) => {
    if (!startTime) {
      return true;
    }
    const now = new UTCDate();
    const startShowTime = new UTCDate(startTime);
    return now >= startShowTime;
  };

  const OkxSeasonTag = () => (
    <p className="hidden md:inline-flex items-center gap-2 bg-[#2C251D] px-2 py-[2px] mt-4">
      <span className="text-[#FBB042] text-[10px] font-normal font-orbitron">
        OKX Season:
      </span>
      <div className="inline-flex flex-row-reverse items-center gap-2">
        <div className="w-3 h-3">{walletIcons.okx}</div>
      </div>
    </p>
  );

  const MainContent = () => (
    <div className="w-full max-w-[1464px] mt-2 mb-2 md:my-8 xl:my-20 px-4 py-4 md:py-0 xl:px-10">
      <div className="w-full flex flex-col gap-8 md:gap-10 xl:gap-24">
        {taskGroupList.map((taskGroup: any, taskGroupIndex: number) => (
          <Card
            key={taskGroupIndex}
            size={CardSize.Default}
            name={taskGroup.name}
            className="w-full relative px-4 py-4 md:p-8 xl:p-12 rounded md:rounded-xl"
            nameClassName="text-xs md:text-[32px] bg-[#000] md:bg-[#111] px-1 md:px-4 left-2 md:left-7 -top-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 flex-row gap-4 md:gap-8 xl:gap-10">
              {taskGroup.list
                .filter((task: any) => hasTaskStarted(task.startTime))
                .map((task: any, taskIndex: number) => (
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
                        "bg-[#1E1E1E] w-full h-auto md:h-56 xl:h-[263px] px-4 py-4 xl:px-8 xl:py-8 rounded md:rounded-md transition-colors duration-300 overflow-hidden relative",
                        task.available[networkId || "devnet"] &&
                          isSupportSonic(wallet?.adapter.name)
                          ? "group-hover/task:bg-[#181818]"
                          : ""
                      )}
                    >
                      {/* task name */}
                      <h5 className="flex flex-row gap-2 items-center text-white/70 text-base md:text-3xl xl:text-5xl font-semibold font-orbitron">
                        {task.name}
                        <IconGo
                          width={20}
                          height={20}
                          color="rgba(255,255,255,0.7)"
                          className="inline-block md:hidden"
                        />
                      </h5>

                      {/* description */}
                      <p className="hidden relative z-10 md:flex text-white/60 text-base font-normal w-[420px] mt-5">
                        {task.description}
                      </p>

                      {/* bonus tag */}
                      {isInWalletCampaignTime(networkId) &&
                      task.bonus &&
                      WalletList.filter(
                        (wallet: any) =>
                          wallet.hasExtraBonus &&
                          wallet.hasExtraBonus[networkId || "devnet"]
                      )?.length ? (
                        <p className="hidden md:inline-flex items-center gap-2 bg-[#2C251D] px-2 py-[2px] mt-4">
                          <span className="text-[#FBB042] text-[10px] font-normal font-orbitron">
                            Extra Bonus:
                          </span>
                          <span className="inline-flex flex-row-reverse items-center gap-2">
                            {WalletList.filter(
                              (wallet: any) =>
                                wallet.hasExtraBonus &&
                                wallet.hasExtraBonus[networkId || "devnet"]
                            )
                              .map((wallet: any) => wallet.id)
                              .map((bonus: any) => (
                                <div className="w-3 h-3">
                                  {walletIcons[bonus]}
                                </div>
                              ))}
                          </span>
                        </p>
                      ) : null}

                      {/* okx season tag */}
                      {task.id === "ring-lottery" &&
                      isInLotteryCampaignTime(networkId) ? (
                        <OkxSeasonTag />
                      ) : null}

                      <div className="flex relative z-[1] flex-row gap-2 md:hidden mt-4">
                        {/* period */}
                        <div className="text-[10px] text-[#25A3ED] bg-[#212b32] rounded-[2px] px-1 py-[2px]">
                          {task.period}
                        </div>

                        {/* reward */}
                        {task.reward ? (
                          <div className="text-[10px] text-[#FBB042] bg-[#332d23] rounded-[2px] px-1 py-[2px]">
                            {task.reward}
                          </div>
                        ) : null}

                        {/* bonus */}
                        {isInWalletCampaignTime(networkId) &&
                        task.bonus &&
                        WalletList.filter(
                          (wallet: any) =>
                            wallet.hasExtraBonus &&
                            wallet.hasExtraBonus[networkId || "devnet"]
                        )?.length ? (
                          <div className="inline-flex flex-row justify-center items-center gap-[2px] text-[10px] text-[#FBB042] bg-[#2C251D] rounded-[2px] px-1 py-[2px]">
                            <span className="text-[#FBB042] text-[10px] font-normal">
                              Extra Bonus:{""}
                            </span>
                            <span className="inline-flex flex-row-reverse items-center justify-center gap-[2px]">
                              {WalletList.filter(
                                (wallet: any) =>
                                  wallet.hasExtraBonus &&
                                  wallet.hasExtraBonus[networkId || "devnet"]
                              )
                                .map((wallet: any) => wallet.id)
                                .map((bonus: any) => (
                                  <div className="w-2 h-2">
                                    {walletIcons[bonus]}
                                  </div>
                                ))}
                            </span>
                          </div>
                        ) : null}

                        {/* okx season tag */}
                        {task.id === "ring-lottery" &&
                        isInLotteryCampaignTime(networkId) ? (
                          <div className="inline-flex flex-row justify-center items-center gap-[2px] text-[10px] text-[#FBB042] bg-[#2C251D] rounded-[2px] px-1 py-[2px]">
                            <span className="text-[#FBB042] text-[10px] font-normal">
                              OKX Season:{""}
                            </span>
                            <span className="inline-flex flex-row-reverse items-center justify-center gap-[2px]">
                              <div className="w-2 h-2">{walletIcons.okx}</div>
                            </span>
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
                          "opacity-50 z-0  absolute -bottom-6 md:-bottom-4 right-0 md:right-0 transition-all duration-300",
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
