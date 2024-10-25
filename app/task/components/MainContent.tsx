import { taskGroupList } from "@/app/data/task";
import { cn } from "@/lib/utils";

export default function MainContent() {
  return (
    <div
      className={cn("max-w-view mx-auto px-4 w-full", "flex flex-col gap-12")}
    >
      {taskGroupList.map((taskGroup, index) => (
        <div className="md:p-10 p-5 border border-line relative" key={index}>
          <div className="absolute top-0 left-[22px] px-4 bg-[#111] -translate-y-1/2 font-orbitron text-title2">
            {taskGroup.name}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] md:gap-10 gap-5">
            {taskGroup.list.map((task, taskIndex) => (
              <div key={taskIndex} className="p-4 bg-[#1E1E1E] rounded">
                <div className="flex flex-col gap-2 max-w-[224px]">
                  <div className="text-title1 text-secondary">{task.name}</div>
                  <div className="text-body4 text-tertary">
                    {task.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
