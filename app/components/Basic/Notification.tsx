"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getNotificationRecords } from "../../data/account";
import { useAccountInfo, useNetworkInfo } from "../../store/account";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { Close } from "@/app/icons/Close";
import { EmptyLogo } from "@/app/logos/EmptyLogo";

const maxAmount = 5;

let currentToken = "";

export default function Notification({ data }: any) {
  const {
    address,
    token,
    setToken,
    reset,
    hasNews,
    setNews: hasNotification
  } = useAccountInfo();
  const { networkId } = useNetworkInfo();

  const [showPanel, setShowPanel] = useState(false);
  const [list, setList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const {
    data: dataNotificationRecords,
    isLoading: loadingNotificationRecords,
    refetch: refetchNotificationRecords
  } = useQuery({
    queryKey: ["queryUserNotificationRecords", address],
    queryFn: () => getNotificationRecords({ token, networkId }),
    enabled: !!address && !!token,
    refetchInterval: 10 * 1000
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
    setShowPanel(false);
  };

  const NotificationIcon = () => (
    <div
      className="size-6 cursor-pointer relative"
      onClick={handleToggleShowPanel}
    >
      <img className="size-6" src="/images/notifications.png" alt="" />
      {hasNews && (
        <span className="flex h-3 w-3 absolute top-0 right-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBB042]/80 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FBB042] border-[2px] border-solid border-[#111111]"></span>
        </span>
      )}
    </div>
  );

  const NotificationEmptyStatus = () => (
    <div className="flex-center flex-col md:flex-row gap-2 text-title3 font-orbitron text-disable py-[120px] md:py-8">
      <EmptyLogo />
      <span>No messages</span>
    </div>
  );

  const NotificationList = () => {
    return (
      <>
        {list.map((item: any, index: number) => (
          <div
            key={index}
            className="flex-v gap-1 py-3 px-4 md:px-6 hover:bg-line"
          >
            <p className="text-title4 text-primary">{item.text}</p>
            <span className="text-tertary text-body4">{item.date}</span>
          </div>
        ))}
      </>
    );
  };

  const NotificationPanel = ({ className, showHeader }: any) => (
    <div
      className={cn(
        "bg-bg-popup md:max-w-[320px] pt-1 w-full pb-4 md:pb-1",
        className
      )}
    >
      {showHeader ? (
        <p className="flex text-title2 text-tertary justify-between items-center px-4 h-14 font-orbitron">
          Notification
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
      {showPanel && (
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
          showPanel ? "translate-y-0" : "translate-y-full"
        )}
      >
        <NotificationPanel showHeader className={cn("w-full h-full")} />
      </div>
    </>
  );
}
