"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getNotificationRecords } from "../../data/account";
import { useAccountInfo, useNetworkInfo } from "../../store/account";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { Close } from "@/app/icons/Close";

const maxAmount = 5;

let currentToken = "";

export default function Notification({ data }: any) {
  const {
    address,
    token,
    setToken,
    reset,
    hasNews,
    setNews: hasNotification,
  } = useAccountInfo();
  const { networkId } = useNetworkInfo();

  const [showPanel, setShowPanel] = useState(false);
  const [list, setList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    data: dataNotificationRecords,
    isLoading: loadingNotificationRecords,
    refetch: refetchNotificationRecords,
  } = useQuery({
    queryKey: ["queryUserNotificationRecords", address],
    queryFn: () => getNotificationRecords({ token, networkId }),
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
    const code = dataNotificationRecords?.code;
    if (code === 401) {
      setToken("");
      return;
    }

    const data = dataNotificationRecords?.data;
    if (list.length) {
      hasNotification(true);
    }
    if (data?.length) {
      setList(data.slice(0, maxAmount));
    }
  }, [JSON.stringify(dataNotificationRecords?.data)]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchNotificationRecords();
    }
  }, [token]);

  const handleToggleShowPanel = () => {
    setShowPanel(!showPanel);
  };

  const handleClosePanel = () => {
    setPopoverOpen(false);
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
            className="flex flex-col gap-3 md:gap-1 px-4 py-4 md:py-3 text-xs bg-[#1A1A1A] hover:bg-white/5 transition-opacity"
          >
            <p className="text-white">{item.text}</p>
            <span className="text-white/50">{item.date}</span>
          </div>
        ))}
      </>
    );
  };

  const NotificationPanel = ({ className, showHeader }: any) => (
    <div className={cn("bg-[#1A1A1A] w-[360px] py-2 rounded-md", className)}>
      {showHeader ? (
        <p className="flex justify-between items-center px-4 py-5">
          <span className="text-white/50 text-sm font-orbitron font-semibold">
            Notification
          </span>
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={handleClosePanel}
          >
            <Close color="rgba(255, 255, 255, .3)" width={24} height={24} />
          </span>
        </p>
      ) : null}
      <div className="w-full max-h-full md:max-h-[348px]">
        {list.length ? <NotificationList /> : <NotificationEmptyStatus />}
      </div>
    </div>
  );

  return (
    <>
      {/* popover */}
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <NotificationIcon />
        </PopoverTrigger>
        <PopoverContent className="hidden md:flex w-[320px] bg-[#1B1B1B] border-none rounded-2 px-0 py-0 mt-5">
          <NotificationPanel />
        </PopoverContent>
      </Popover>

      {/* shadow */}
      {popoverOpen && (
        <div
          className={cn(
            "flex md:hidden bg-black/80 fixed z-20 top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
          )}
          onClick={handleClosePanel}
        ></div>
      )}

      {/* mobile */}
      <div
        className={cn(
          "flex md:hidden flex-col w-full max-h-full fixed right-0 left-0 bottom-0 z-30 transition-transform duration-300",
          popoverOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <NotificationPanel showHeader className={cn("w-full h-full")} />
      </div>
    </>
  );
}
