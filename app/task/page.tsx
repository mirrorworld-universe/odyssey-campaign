"use client";
import { UTCDate } from "@date-fns/utc";
import { useWallet } from "@solana/wallet-adapter-react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Backpack as IconBackpack } from "@/app/icons/Backpack";
import { Calendar } from "@/app/icons/Calendar";
import { Chip } from "@/app/icons/Chip";
import { Controller } from "@/app/icons/Controller";
import { Cube } from "@/app/icons/Cube";
import { Diversity } from "@/app/icons/Diversity";
import { OKX as IconOKX } from "@/app/icons/OKX";
import { Recommand } from "@/app/icons/Recommand";
import { Twitter } from "@/app/icons/Twitter";

import { trackClick } from "@/lib/track";

import { Footer } from "@/app/components/Basic/Footer";
import { FAQDialog } from "@/app/components/Dialog/FAQ";
import { HowToPlayDialog } from "@/app/components/Dialog/HowToPlay";

import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { useTaskInfo } from "@/app/store/task";
import { useHowToPlayModal } from "@/app/store/tutorials";

import { SonicX } from "../icons/SonicX";
import { Tiktok } from "../icons/TIktok";
import Banner from "./components/Banner";
import MainContent from "./components/MainContent";

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
  tiktok: (
    <Tiktok
      className="size-[120px] md:size-[250px] xl:size-[320px] origin-center rotate-12 md:translate-y-8 -translate-y-2"
      color="#313131"
    />
  ),
  sonicX: (
    <SonicX
      className="size-[120px] md:size-56 xl:size-[250px] origin-center"
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
      className="size-[120px] md:size-56 xl:size-[270px] origin-center rotate-12"
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

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash === "how-to-play") {
      onOpenHowToPlayDialog();
    }
  }, []);

  const hasTaskStarted = (startTime: string) => {
    if (!startTime) {
      return true;
    }
    const now = new UTCDate();
    const startShowTime = new UTCDate(startTime);
    return now >= startShowTime;
  };

  return (
    <>
      <main className="bg-[#111] flex flex-col gap-12 text-primary">
        <Banner />
        <MainContent />
        <HowToPlayDialog />
        <FAQDialog />
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default TaskCenter;
