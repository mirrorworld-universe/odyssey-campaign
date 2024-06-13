"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Notification({ data }: any) {
  const [showPanel, setShowPanel] = useState(false);
  const [list, setList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleToggleShowPanel = () => {
    setShowPanel(!showPanel);
  };

  const NotificationIcon = () => (
    <div className="cursor-pointer" onClick={handleToggleShowPanel}>
      <img className="w-6 h-6" src="/images/notifications.png" alt="" />
    </div>
  );

  const NotificationEmptyStatus = () => (
    <div className="w-full text-center text-[12px] text-white py-8">
      No messages
    </div>
  );

  const NotificationList = () => {
    return (
      <>
        {list.map((item: any, index: number) => (
          <div className="flex flex-col gap-1 px-4 py-3 text-[12px] bg-[#1A1A1A] hover:bg-white/5 transition-opacity">
            <p className="text-white">{item.reward_type}</p>
            <span className="text-white/50">{item.date}</span>
          </div>
        ))}
      </>
    );
  };

  const NotificationPanel = () => (
    <div className="bg-[#1A1A1A] w-[360px] max-h-[348px] py-2 rounded-md">
      {list.length ? <NotificationList /> : <NotificationEmptyStatus />}
    </div>
  );

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <NotificationIcon />
      </PopoverTrigger>
      <PopoverContent className="w-[320px] bg-[#1B1B1B] border-none rounded-[8px] px-0 py-0">
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
}
