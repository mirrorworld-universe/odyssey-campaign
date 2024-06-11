import React from "react";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { taskGroupList } from "../data/task";
import { Twitter } from "../icons/Twitter";
import { Calendar } from "../icons/Calendar";
import { Chip } from "../icons/Chip";
import { Recommand } from "../icons/Recommand";
import { Diversity } from "../icons/Diversity";
import { Controller } from "../icons/Controller";
import { Card, CardSize } from "../components/Card";

const icons: any = {
  twitter: <Twitter width={250} height={250} color="#313131" />,
  calendar: <Calendar width={250} height={250} color="#313131" />,
  chip: <Chip width={250} height={250} color="#313131" />,
  recommand: <Recommand width={250} height={250} color="#313131" />,
  diversity: <Diversity width={250} height={250} color="#313131" />,
  game: <Controller width={250} height={250} color="#313131" />,
};

const TaskCenter: NextPage = () => {
  const Header = () => (
    <div className="bg-[#000] w-full h-[411px] flex justify-center py-24 overflow-hidden relative">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -top-80 -right-80"
      />
      <div className="max-w-[1464px] 2xl:w-full">
        <h2 className="text-white font-orbitron text-[48px] font-semibold">
          Odyssey Task Center
        </h2>
        <p className="text-white text-[20px] font-normal mt-5">
          Choose one of the wallets and install the corresponding browser
          extension.
        </p>
        <div className="flex flex-row gap-6 mt-16">
          <Button className="text-white text-[16px] font-bold font-orbitron w-[230px] h-[48px] transition-all duration-300 bg-[#0000FF] hover:bg-[#0000FF]/60  active:bg-[#0000FF]/80">
            Start My Task
          </Button>
          <Button className="text-white text-[16px] font-bold font-orbitron w-[230px] h-[48px] bg-transparent border boder-solid border-white transition-all duration-300">
            How to Play?
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="w-full max-w-[1464px] bg-[#111111] mt-20 mb-20">
      <div className="w-full flex flex-col gap-24">
        {taskGroupList.map((taskGroup) => (
          <Card
            size={CardSize.Default}
            name={taskGroup.name}
            className="w-full relative"
          >
            <div className="flex flex-wrap flex-row gap-10">
              {taskGroup.list.map((task) => (
                <Link href={`/task/${task.id}`} className="group/task">
                  <div className="bg-[#1E1E1E] group-hover/task:bg-[#181818] w-[663px] h-[263px] px-8 py-8 rounded-md cursor-pointer transition-colors duration-300 overflow-hidden relative">
                    <h5 className="text-white/70 text-[48px] font-semibold font-orbitron">
                      {task.name}
                    </h5>
                    <p className="text-white/60 text-[16px] font-normal w-[420px] mt-5">
                      {task.description}
                    </p>
                    <div className="flex flex-row justify-start items-center w-full absolute left-0 bottom-0">
                      <div className="w-[174px] h-[40px] bg-cover bg-no-repeat text-white text-[14px] font-orbitron bg-[url('/images/period-background.png')] pt-3 pl-5">
                        {task.period}
                      </div>
                      {task.reward ? (
                        <div className="text-[#FBB042] text-[14px] font-orbitron ml-1">
                          {task.reward}
                        </div>
                      ) : null}
                    </div>
                    <div className="origin-center rotate-12 opacity-50 absolute -bottom-4 -right-10 transition-all duration-300 group-hover/task:-right-14">
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
    <main className="bg-[#111111] flex min-h-screen flex-col items-center justify-between">
      <Header />
      <MainContent />
    </main>
  );
};

export default TaskCenter;
