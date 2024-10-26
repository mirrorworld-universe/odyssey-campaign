import { taskGroupList } from "@/app/data/task";
import { cn } from "@/lib/utils";

export default function MainContent() {
  return (
    <div
      className={cn(
        "max-w-view mx-auto px-4 w-full pb-12",
        "flex flex-col gap-12"
      )}
    >
      {taskGroupList.map((taskGroup, index) => (
        <div className="md:p-10 p-4 border border-line relative" key={index}>
          <div className="absolute top-0 left-2 md:left-[22px] px-1 md:px-4 bg-[#111] -translate-y-1/2 font-orbitron text-title4 md:text-title2">
            {taskGroup.name}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(224px,1fr))] md:gap-10 gap-5">
            {taskGroup.list.map((task, taskIndex) => (
              <div key={taskIndex} className="p-4 bg-[#1E1E1E] rounded">
                <div className="flex flex-col gap-2 max-w-[224px]">
                  <div className="text-title2 md:text-title1 text-secondary font-orbitron">
                    {task.name}
                  </div>
                  <div className="hidden md:block text-body4 text-tertary">
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
