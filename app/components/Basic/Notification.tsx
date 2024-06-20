"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getNotificationRecords } from "../../data/account";
import { useAccountInfo } from "../../store/account";
import { trackClick } from "@/lib/track";

const maxAmount = 5;

export default function Notification({ data }: any) {
  const {
    address,
    token,
    reset,
    hasNews,
    setNews: hasNotification,
  } = useAccountInfo();

  const [showPanel, setShowPanel] = useState(false);
  const [list, setList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    data: dataNotificationRecords,
    isLoading: loadingNotificationRecords,
  } = useQuery({
    queryKey: ["queryUserNotificationRecords", address],
    queryFn: () => getNotificationRecords({ token }),
    enabled: !!address && !!token,
    refetchInterval: 10 * 1000,
  });

  useEffect(() => {
    if (popoverOpen) {
      hasNotification(false);
      // ga4
      trackClick({ text: "Notification" });
    }
  }, [popoverOpen]);

  useEffect(() => {
    const data = dataNotificationRecords?.data;
    if (list.length) {
      hasNotification(true);
    }
    if (data?.length) {
      setList(data.slice(0, maxAmount));
    }
  }, [JSON.stringify(dataNotificationRecords?.data)]);

  const handleToggleShowPanel = () => {
    setShowPanel(!showPanel);
  };

  const NotificationIcon = () => (
    <div
      className="w-6 h-6 cursor-pointer relative"
      onClick={handleToggleShowPanel}
    >
      <img className="w-6 h-6" src="/images/notifications.png" alt="" />
      {hasNews && (
        <span className="flex h-3 w-3 absolute top-0 right-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBB042]/80 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FBB042] border-[2px] border-solid border-[#111111]"></span>
        </span>
      )}
    </div>
  );

  const NotificationEmptyStatus = () => (
    <div className="w-full text-center text-xs text-white py-8">
      No messages
    </div>
  );

  const NotificationList = () => {
    return (
      <>
        {list.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-1 px-4 py-3 text-xs bg-[#1A1A1A] hover:bg-white/5 transition-opacity"
          >
            <p className="text-white">{item.text}</p>
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
      <PopoverContent className="w-[320px] bg-[#1B1B1B] border-none rounded-2 px-0 py-0 mt-5">
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  );
}
