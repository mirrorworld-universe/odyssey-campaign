"use client";
import { NextPage } from "next";

import { Footer } from "@/app/components/Basic/Footer";
import { FAQDialog } from "@/app/components/Dialog/FAQ";
import { HowToPlayDialog } from "@/app/components/Dialog/HowToPlay";

import Banner from "./components/Banner";
import MainContent from "./components/MainContent";

const TaskCenter: NextPage = () => {
  return (
    <>
      <main className="md:bg-[#111] flex flex-col md:gap-12 text-primary">
        <Banner />
        <MainContent />
        <HowToPlayDialog />
        <FAQDialog />
      </main>
      <Footer />
    </>
  );
};

export default TaskCenter;
