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
      {taskComponents[taskId]}
    </div>
  );

  return (
    <div className="flex flex-row">
      <TaskNavigator taskId={taskId} />
      <Content />
    </div>
  );
}
