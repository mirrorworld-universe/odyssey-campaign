import Link from "next/link";

import { MeetSonic } from "@/app/components/Task/MeetSonic";
import { CheckIn } from "@/app/components/Task/CheckIn";
import { RingLottery } from "@/app/components/Task/RingLottery";
import { MileStone } from "@/app/components/Task/MileStone";
import { Referral } from "@/app/components/Task/Referral";
import { GameVenture } from "@/app/components/Task/GameVenture";

import { taskGroupList } from "../../data/task";

const tasks = taskGroupList.map((item) => item.list).flat();

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const taskId = params.slug;
  return {
    title: `${tasks.find((task) => task.id === taskId)?.name} - Sonic Odyssey`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const taskId = params.slug;

  const taskComponents: any = {
    ["meet-sonic"]: <MeetSonic />,
    ["check-in"]: <CheckIn />,
    ["ring-lottery"]: <RingLottery />,
    ["milestone"]: <MileStone />,
    ["referral"]: <Referral />,
    ["game-venture"]: <GameVenture />,
  };

  const Navigator = () => (
    <div className="flex flex-col w-[400px]">
      <Link
        href="/task"
        className="flex flex-row justify-center items-center gap-2 bg-[#111111] hover:opacity-80 px-8 py-10 sticky top-20 transition-opacity duration-300 z-10"
      >
        <img
          className="w-[32px] h-[32px]"
          src="/images/arrow-back.svg"
          alt=""
        />
        <span className="text-white/30 text-[32px] font-semibold font-orbitron">
          Back
        </span>
      </Link>
      {tasks.map((task, taskIndex) => (
        <Link
          href={`/task/${task.id}`}
          className={`group/nav flex w-[400px] h-[200px] border-l-[6px] border-solid  hover:border-[#F79342] transition-all duration-300 ${
            task.id === taskId ? "border-[#F79342]" : "border-transparent"
          } relative overflow-hidden`}
          key={taskIndex}
        >
          <img
            className="w-full h-full absolute top-0 left-0  "
            src={`/images/${task.id}.png`}
            alt=""
          />
          <div
            className={`w-full h-full absolute top-0 left-0 group-hover/nav:background-highlight ${
              task.id === taskId ? "background-highlight" : ""
            } transition-opacity duration-300`}
          >
            <span
              className={`text-white/50 group-hover/nav:text-[#FBB042] font-orbitron text-[24px] font-normal absolute left-[32px] bottom-[24px] ${
                task.id === taskId ? "text-[#FBB042]" : "text-white/50"
              }`}
            >
              {task.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );

  const Content = () => (
    <div className="flex flex-col px-[120px] py-[120px]">
      {/* title */}
      <h1 className="text-white font-orbitron font-semibold text-[64px]">
        {tasks.find((task) => task.id === taskId)?.name}
      </h1>

      {/* line */}
      <div className="w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">{taskComponents[taskId]}</div>
    </div>
  );

  return (
    <div className="flex flex-row">
      <Navigator />
      <Content />
    </div>
  );
}
