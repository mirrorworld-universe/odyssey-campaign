import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader2, ChevronLeft } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ring } from "../../icons/Ring";
import { Arrow } from "../../icons/Arrow";
import { Gift } from "../../icons/Gift";
import { Card, CardSize } from "./Card";
import { cn, prettyNumber } from "@/lib/utils";
import { useAccountInfo } from "../../store/account";
import { getMysteryboxHistory } from "../../data/reward";
import {
  useMysteryBoxInfo,
  useMysteryBoxConfirmModal,
  useMysteryBoxRecordModal,
} from "../../store/task";
import { isSupportSonic } from "../../wallet/wallet-list";
import { getUserRewardInfo } from "../../data/account";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RingPopover() {
  const { address, token } = useAccountInfo();
  const { wallet } = useWallet();
  const { setMysteryBoxAmount, setMysteryBoxRewardsAmount } =
    useMysteryBoxInfo();
  const {
    isOpen: isOpenConfirmModal,
    onOpen: onOpenConfirmModal,
    onClose: onCloseConfirmModal,
  } = useMysteryBoxConfirmModal();
  const {
    isOpen: isOpenRecordModal,
    onOpen: onOpenRecordModal,
    onClose: onCloseRecordModal,
  } = useMysteryBoxRecordModal();

  const [isOpeningMysterybox, setIsOpeningMysterybox] = useState(false);
  const [ringAmount, setRingAmount] = useState(0);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(0);
  const [canOpenMysteryBox, setCanOpenMysteryBox] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showClaimHistory, setShowClaimHistory] = useState(false);

  const {
    data: dataRewardsInfo,
    isLoading: loadingRewardsInfo,
    refetch: refetchRewardsInfo,
  } = useQuery({
    queryKey: ["queryUserRewardsInfo", address],
    queryFn: () => getUserRewardInfo({ token }),
    enabled: !!address && !!token,
  });

  const {
    data: dataMysteryBoxHistory,
    isLoading: loadingMysteryBoxHistory,
    refetch: refetchRewardsHistory,
  } = useQuery({
    queryKey: ["queryMysteryBoxHistory", address],
    queryFn: () => getMysteryboxHistory({ token }),
    enabled: !!address && !!token,
  });

  const handleOpenMysterybox = () => {
    if (isOpeningMysterybox || !canOpenMysteryBox) {
      return;
    }
    setIsOpeningMysterybox(true);
    onOpenConfirmModal();
  };

  const handleLoadMoreClaimHistory = () => {
    setShowClaimHistory(true);
  };

  const handleBackClaimHistory = () => {
    setShowClaimHistory(false);
  };

  useEffect(() => {
    const data = dataRewardsInfo?.data;
    if (data) {
      const { wallet_balance, ring, ring_monitor } = data;
      setRingAmount(ring);
      setMysteryBoxRewardsAmount(ring);

      setRingMonitorAmount(ring_monitor);
      setMysteryBoxAmount(ring_monitor);

      setCanOpenMysteryBox(ring_monitor && ring_monitor > 0);
    }
  }, [dataRewardsInfo]);

  useEffect(() => {
    if (!isOpenConfirmModal && !isOpenRecordModal) {
      setIsOpeningMysterybox(false);
      refetchRewardsInfo();
      refetchRewardsHistory();
    }
  }, [isOpenConfirmModal, isOpenRecordModal]);

  useEffect(() => {
    const data = dataMysteryBoxHistory?.data;
    if (data) {
      setHistoryList(data);
    }
  }, [dataMysteryBoxHistory]);

  useEffect(() => {
    if (popoverOpen) {
      refetchRewardsInfo();
      refetchRewardsHistory();
    }
  }, [popoverOpen]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Ring width={24} height={24} color="#FBB042" />
          <span className="text-white text-base font-orbitron font-semibold">
            {prettyNumber(ringAmount)}
          </span>
          <Arrow
            width={24}
            height={24}
            color="white"
            className={cn(
              "transition-transform duration-300",
              popoverOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={`w-[320px] bg-[#1B1B1B] border-none rounded-2 px-0 py-0 mt-5`}
      >
        <div
          className={cn(
            "block w-full overflow-hidden relative",
            historyList.length ? "h-[286px]" : "h-[166px]"
          )}
        >
          <div
            className={cn(
              "w-full h-full absolute transition-transform duration-300",
              !showClaimHistory ? "translate-x-0" : `-translate-x-[320px]`
            )}
          >
            {/* balance */}
            <div className="flex flex-col gap-5 px-4 py-[24px]">
              <Card
                name="Current Balance"
                nameClassName="bg-[#1B1B1B]"
                size={CardSize.Small}
              >
                <div className="flex flex-row justify-between">
                  <div className="flex items-center">
                    <Gift
                      width={16}
                      height={16}
                      color="#FBB042"
                      className="mr-1"
                    />{" "}
                    <span className="text-white text-base font-orbitron font-semibold">
                      {ringMonitorAmount}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Ring
                      width={16}
                      height={16}
                      color="#FBB042"
                      className="mr-1"
                    />{" "}
                    <span className="text-white text-base font-orbitron font-semibold">
                      {ringAmount}
                    </span>
                  </div>
                </div>
              </Card>

              {/* open mystery box button */}
              <Button
                disabled={
                  !canOpenMysteryBox ||
                  isOpeningMysterybox ||
                  !isSupportSonic(wallet?.adapter.name)
                }
                className={cn(
                  "bg-[#0000FF] transition-all duration-300",
                  !canOpenMysteryBox || !isSupportSonic(wallet?.adapter.name)
                    ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                    : isOpeningMysterybox
                    ? "hover:bg-[#0000FF] opacity-60 cursor-not-allowed"
                    : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
                )}
                onClick={handleOpenMysterybox}
              >
                {isOpeningMysterybox && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span className="text-white text-sm font-orbitron">
                  Open Mystery Box
                </span>
                <Gift
                  width={16}
                  height={16}
                  color="white"
                  className="mx-[2px]"
                />
              </Button>
            </div>

            {/* claim history */}
            {historyList.length ? (
              <div
                className={cn(
                  "flex flex-col px-4 py-2 font-orbitron border-t border-solid border-white/10"
                )}
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="text-white text-sm py-2">Claim History</div>
                  <div
                    className="text-[#25A3ED] text-[10px] hover:underline cursor-pointer"
                    onClick={handleLoadMoreClaimHistory}
                  >
                    Load More
                  </div>
                </div>
                <div className="flex flex-col w-full max-h-[180px]">
                  {historyList
                    .slice(0, 2)
                    .map((history: any, historyIndex: number) => (
                      <div
                        key={historyIndex}
                        className="flex flex-row justify-between text-white/50 text-xs py-2"
                      >
                        <div className="flex items-center">
                          Claimed x 1{" "}
                          <Gift
                            width={12}
                            height={12}
                            color="rgba(255,255,255,.5)"
                            className="mx-[2px]"
                          />
                        </div>
                        <div className="flex items-center">
                          + {history.quantity}{" "}
                          <Ring
                            width={12}
                            height={12}
                            color="rgba(255,255,255,.5)"
                            className="mx-[2px]"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* claim history window */}
          {historyList.length ? (
            <div
              className={cn(
                "w-full h-full flex flex-col py-2 transition-transform duration-300 absolute",
                showClaimHistory ? "translate-x-0" : `translate-x-[320px]`
              )}
            >
              <div className="flex justify-center px-4 relative">
                <ChevronLeft
                  size={24}
                  color="rgba(255, 255, 255, .3)"
                  className="cursor-pointer absolute top-0 bottom-0 left-0 m-auto"
                  onClick={handleBackClaimHistory}
                />
                <div className="text-white text-sm font-orbitron py-2">
                  Claim History
                </div>
              </div>
              <ScrollArea className="flex flex-col w-full h-full overflow-y-auto">
                {historyList.map((history: any, historyIndex: number) => (
                  <div
                    key={historyIndex}
                    className={cn(
                      "border-solid border-white/5 px-4 py-2",
                      historyIndex > 0 ? "border-t" : ""
                    )}
                  >
                    <div
                      key={historyIndex}
                      className="flex flex-row justify-between text-white text-xs font-orbitron"
                    >
                      <div className="flex items-center">
                        Claimed x 1{" "}
                        <Gift
                          width={12}
                          height={12}
                          color="white"
                          className="mx-[2px]"
                        />
                      </div>
                      <div className="flex items-center">
                        + {history.quantity}{" "}
                        <Ring
                          width={12}
                          height={12}
                          color="#FBB042"
                          className="mx-[2px]"
                        />
                      </div>
                    </div>
                    <div className="text-white/50 text-[10px] mt-1">
                      {history.date}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
