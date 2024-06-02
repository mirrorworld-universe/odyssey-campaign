import React from "react";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";

const taskGroupList = [
  {
    name: "One - time",
    list: [
      {
        name: "Meet Sonic",
        description:
          "Follow Sonic on social media to get the latest updates and your rewards.",
        period: "24-hour period",
        reward: "",
      },
    ],
  },
  {
    name: "Everyday",
    list: [
      {
        name: "Check-in",
        description:
          "Check in on Sonic every day. The longer your streak, the greater your rewards.",
        period: "24-hour period",
        reward: "1 token / each",
      },
      {
        name: "Ring Lottery",
        description:
          "Participate in the lottery for a chance to win a ring; there's only one lucky winner in every block.",
        period: "8:00 - 21:00",
        reward: "1 token / each",
      },
      {
        name: "Milestone",
        description:
          "Interact with Sonic through any form of transaction to earn increasing rewards based on your level of engagement!",
        period: "24-hour period",
        reward: "",
      },
      {
        name: "Referral",
        description:
          "Invite friends to Sonic Odyssey! When they complete Task - Meet Sonic, you'll get rewards!",
        period: "24-hour period",
        reward: "",
      },
    ],
  },
  {
    name: "Third Party",
    list: [
      {
        name: "Game",
        description:
          "Follow the Sonic X account and join the Discord group to receive x 1 Ring monitor.",
        period: "24-hour period",
        reward: "",
      },
    ],
  },
];

const TaskCenter: NextPage = () => {
  const Header = () => (
    <div className="bg-[#111111] w-full flex justify-center py-24">
      <div className="max-w-[1464px] 2xl:w-full">
        <h2 className="text-white font-orbitron text-[48px] font-semibold">
          Odyssey Task Center
        </h2>
        <p className="text-white text-[20px] font-normal mt-5">
          Choose one of the wallets and install the corresponding browser
          extension.
        </p>
        <div className="flex flex-row gap-6 mt-16">
          <Button className="text-white text-[16px] font-bold font-orbitron w-[484px] h-[48px] bg-[#0000FF] transition-all">
            Start My Task
          </Button>
          <Button className="text-white text-[16px] font-bold font-orbitron w-[484px] h-[48px] bg-transparent border boder-solid border-white transition-all">
            How to Play?
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="bg-black mt-10">
      <div className="w-full max-w-[1464px]">
        <div className="flex flex-col gap-24">
          {taskGroupList.map((taskGroup) => (
            <div className="flex flex-wrap flex-row gap-10 w-full border border-solid border-[#535353] rounded-xl px-12 py-12 relative">
              <h4 className="text-white text-[32px] font-semibold font-orbitron px-4 bg-black absolute left-7 top-[-32px] z-10">
                {taskGroup.name}
              </h4>
              {taskGroup.list.map((task) => (
                <div className="bg-[#1E1E1E] w-[663px] h-[263px] px-8 py-8 rounded-md cursor-pointer hover:scale-105 transition-transform relative">
                  <h5 className="text-white/70 text-[48px] font-semibold font-orbitron">
                    {task.name}
                  </h5>
                  <p className="text-white/60 text-[16px] font-normal w-[420px] mt-5">
                    {task.description}
                  </p>
                  <div className="flex flex-row justify-start items-center w-full absolute left-0 bottom-0">
                    <div className="text-white text-[14x] font-orbitron">
                      {task.period}
                    </div>
                    {task.reward ? (
                      <div className="text-[#FBB042] text-[14x] font-orbitron">
                        {task.reward}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <MainContent />
    </main>
  );
};

export default TaskCenter;
