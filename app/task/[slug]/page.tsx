import { MeetSonic } from "@/app/components/Task/MeetSonic";
import { CheckIn } from "@/app/components/Task/CheckIn";
import { RingLottery } from "@/app/components/Task/RingLottery";
import { MileStone } from "@/app/components/Task/MileStone";
import { Referral } from "@/app/components/Task/Referral";
import { GameVenture } from "@/app/components/Task/GameVenture";

import { taskGroupList } from "../../data/task";
import { cn } from "@/lib/utils";
import { useNotificationBar } from "@/app/store/account";
import { TaskNavigator } from "@/app/components/Basic/TaskNavigator";

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
      <TaskNavigator taskId={taskId} />
      <Content />
    </div>
  );
}
