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
import { MysteryNFT } from "@/app/components/Task/MysteryNFT";
import { PlayOnSonicContent } from "@/app/components/Task/SonicXContent";

const tasks = taskGroupList.map((item) => item.list).flat();

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}) {
  const taskId = params.slug;
  return {
    title: `${tasks.find((task) => task.id === taskId)?.name} - Sonic Odyssey`
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
    ["mystery-nft"]: <MysteryNFT />,
    ["play-on-sonicx"]: <PlayOnSonicContent />
  };

  const Content = ({ className }: any) => (
    <div className={className}>{taskComponents[taskId]}</div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <TaskNavigator
        taskId={taskId}
        className="flex flex-col w-full h-full md:h-auto md:w-1/5 md:min-w-[200px] md:max-w-[400px] md:relative z-10"
      />
      <Content className="flex flex-col w-full md:w-4/5 px-4 py-8 md:px-[120px] md:py-[120px]" />
    </div>
  );
}
