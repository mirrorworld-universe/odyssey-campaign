import { taskGroupList } from "@/app/data/task";
import { useNetworkInfo } from "@/app/store/account";
import { cn } from "@/lib/utils";
import { UTCDate } from "@date-fns/utc";
import { TaskItem } from "./TaskItem";

export default function MainContent() {
  const { networkId } = useNetworkInfo();

  return (
    <div
      className={cn(
        "max-w-view mx-auto px-4 w-full md:pb-12",
        "flex-v gap-8 md:gap-12"
      )}
    >
      {taskGroupList.map((taskGroup, index) => (
        <div className="md:p-10 p-4 border border-line relative" key={index}>
          <div className="absolute top-0 left-2 md:left-[22px] px-1 md:px-4 bg-[#111] -translate-y-1/2 font-orbitron text-title4 md:text-title2">
            {taskGroup.name}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] md:gap-10 gap-5">
            {taskGroup.list
              .filter(
                (task) =>
                  hasTaskStarted(task.startTime) &&
                  task.visibleInNetworks.includes(networkId)
              )
              .map((task, taskIndex: number) => (
                <TaskItem task={task} key={taskIndex} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const hasTaskStarted = (startTime?: string) => {
  if (!startTime) {
    return true;
  }
  const now = new UTCDate();
  const startShowTime = new UTCDate(startTime);
  return now >= startShowTime;
};
