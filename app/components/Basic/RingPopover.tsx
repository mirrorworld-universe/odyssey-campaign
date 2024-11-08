import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader2, ChevronLeft } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ring } from "../../icons/Ring";
import { Arrow } from "../../icons/Arrow";
import { Gift } from "../../icons/Gift";
import { Card, CardSize } from "./Card";
import { cn, prettyNumber } from "@/lib/utils";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo
} from "../../store/account";
import { getMysteryboxHistory } from "../../data/reward";
import {
  useMysteryBoxInfo,
  useMysteryBoxConfirmModal,
  useMysteryBoxRecordModal
} from "../../store/task";
import { isSupportSonic } from "../../wallet/wallet-list";
import { getUserRewardInfo } from "../../data/account";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDrawRecordModal, useDrawResultModal } from "@/app/store/lottery";
import { Close } from "@/app/icons/Close";

let currentToken = "";

export default function RingPopover() {
  const { isInMaintenance } = useSystemInfo();
  const { address, token } = useAccountInfo();
  const { networkId } = useNetworkInfo();
  const { wallet } = useWallet();
  const { setMysteryBoxAmount, setMysteryBoxRewardsAmount } =
    useMysteryBoxInfo();
  const {
    isOpen: isOpenMysteryboxConfirmModal,
    onOpen: onOpenMysteryboxConfirmModal
  } = useMysteryBoxConfirmModal();
  const {
    isOpen: isOpenMysteryboxRecordModal,
    onOpen: onOpenMysteryboxRecordModal
  } = useMysteryBoxRecordModal();
  const {
    isOpen: isOpenDrawLotteryRecordModal,
    onOpen: onOpenDrawLotteryRecordModal
  } = useDrawRecordModal();
  const {
    isOpen: isOpenDrawLotteryResultModal,
    onOpen: onOpenDrawLotteryResultModal
  } = useDrawResultModal();

  const [isOpeningMysterybox, setIsOpeningMysterybox] = useState(false);
  const [ringAmount, setRingAmount] = useState(0);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(0);
  const [canOpenMysteryBox, setCanOpenMysteryBox] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showClaimHistory, setShowClaimHistory] = useState(false);

  const {
    data: dataRewardsInfo,
    isLoading: loadingRewardsInfo,
    refetch: refetchRewardsInfo
  } = useQuery({
    queryKey: ["queryUserRewardsInfo", address],
    queryFn: () => getUserRewardInfo({ token, networkId }),
    enabled: !!address && !!token
  });

  const {
    data: dataMysteryBoxHistory,
    isLoading: loadingMysteryBoxHistory,
    refetch: refetchRewardsHistory
  } = useQuery({
    queryKey: ["queryMysteryBoxHistory", address],
    queryFn: () => getMysteryboxHistory({ token, networkId }),
    enabled: !!address && !!token
  });

  const handleOpenMysterybox = () => {
    if (isOpeningMysterybox || !canOpenMysteryBox) {
      return;
    }
    setIsOpeningMysterybox(true);
    onOpenMysteryboxConfirmModal();
    setPopoverOpen(false);
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
    if (!isOpenMysteryboxConfirmModal && !isOpenMysteryboxRecordModal) {
      setIsOpeningMysterybox(false);
      refetchRewardsInfo();
    }
  }, [isOpenMysteryboxConfirmModal, isOpenMysteryboxRecordModal]);

  useEffect(() => {
    if (!isOpenDrawLotteryResultModal && !isOpenDrawLotteryRecordModal) {
      setIsOpeningMysterybox(false);
      refetchRewardsInfo();
    }
  }, [isOpenDrawLotteryResultModal, isOpenDrawLotteryRecordModal]);

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

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchRewardsInfo();
      refetchRewardsHistory();
    }
  }, [token]);

  const RingPanel = ({ className, showHeader }: any) => (
    <div
      className={cn(
        "flex flex-col bg-bg-popup w-full pointer-events-auto pb-4",
        className
      )}
    >
      {showHeader ? (
        <p className="flex justify-between items-center px-4 h-14">
          <span className="sonic-title3 font-orbitron text-tertary px-1">
            Current Balance
          </span>
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={() => setShowPanel(false)}
          >
            <Close color="rgba(255, 255, 255, .3)" width={24} height={24} />
          </span>
        </p>
      ) : null}

      <div
        className={cn(
          "block w-full overflow-hidden relative",
          historyList.length
            ? "min-h-[283px] md:min-h-[248px]"
            : "min-h-[150px] md:min-h-[150px]",
          className
        )}
      >
        <div
          className={cn(
            "w-full h-full absolute transition-transform duration-300",
            !showClaimHistory
              ? "translate-x-0"
              : "-translate-x-full md:-translate-x-[320px]"
          )}
        >
          {/* balance */}
          <div className="flex flex-col px-4 md:px-6 pb-4 pt-4 md:pt-5">
            <Card
              name="Current Balance"
              nameClassName="bg-bg-popup sonic-title3 text-primary"
              size={CardSize.Small}
              className="border-line rounded-none"
            >
              <div className="flex flex-row justify-between">
                <div className="flex items-center">
                  <Gift
                    width={16}
                    height={16}
                    color="#FBB042"
                    className="mr-1"
                  />{" "}
                  <span className="text-white sonic-title3 font-orbitron">
                    {isInMaintenance ? "--" : ringMonitorAmount}
                  </span>
                </div>
                <div className="flex items-center">
                  <Ring
                    width={16}
                    height={16}
                    color="#FBB042"
                    className="mr-1"
                  />{" "}
                  <span className="text-white font-orbitron sonic-title3">
                    {isInMaintenance ? "--" : ringAmount}
                  </span>
                </div>
              </div>
            </Card>

            {/* open mystery box button */}
            <Button
              disabled={
                !canOpenMysteryBox ||
                isOpeningMysterybox ||
                !isSupportSonic(wallet?.adapter.name) ||
                isInMaintenance
              }
              className={cn(
                "bg-[#0000FF] transition-all duration-300 mt-4",
                !canOpenMysteryBox ||
                  !isSupportSonic(wallet?.adapter.name) ||
                  isInMaintenance
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
              <span className="text-white sonic-title3 font-orbitron">
                Open Mystery Box
              </span>
              <Gift width={16} height={16} color="white" className="mx-[2px]" />
            </Button>

            {/* upgrade tip */}
            {isInMaintenance ? (
              <p className="flex flex-row gap-1 mt-2">
                <img
                  className="w-4 h-4 mt-[1px]"
                  src="/images/icons/report.svg"
                />
                <span className="text-[#FBB042] text-xs">
                  Sonic Testnet is currently undergoing an upgrade and will
                  resume in 6 hours.
                </span>
              </p>
            ) : null}
          </div>

          {/* claim history */}
          {historyList.length ? (
            <div
              className={cn(
                "flex flex-col px-4 md:px-6 py-4 md:py-2 font-orbitron border-t border-solid border-line"
              )}
            >
              <div className="flex flex-row items-center justify-between py-2">
                <div className="sonic-title3 text-primary font-orbitron">
                  Claim History
                </div>
                <div
                  className="text-link text-ten hover:text-primary-blue cursor-pointer"
                  onClick={handleLoadMoreClaimHistory}
                >
                  Load More
                </div>
              </div>
              <div className="flex flex-col w-full max-h-[180px] gap-2">
                {historyList
                  .slice(0, 2)
                  .map((history: any, historyIndex: number) => (
                    <div
                      key={historyIndex}
                      className="flex flex-row justify-between sonic-title4 text-tertary"
                    >
                      <div className="flex items-center">
                        Claimed x 1{" "}
                        <Gift
                          width={12}
                          height={12}
                          color="#666"
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
              "w-full h-full flex flex-col py-4 transition-transform duration-300 absolute",
              showClaimHistory
                ? "translate-x-0"
                : "translate-x-full md:translate-x-[320px]"
            )}
          >
            <div className="flex justify-center px-4 md:px-6 relative pb-2">
              <ChevronLeft
                size={24}
                color="rgba(255, 255, 255, .3)"
                className="cursor-pointer absolute top-0 bottom-0 left-4 m-auto"
                onClick={handleBackClaimHistory}
              />
              <div className="sonic-title3 font-orbitron text-primary">
                Claim History
              </div>
            </div>
            <ScrollArea className="flex flex-col w-full h-full overflow-y-auto">
              {historyList.map((history: any, historyIndex: number) => (
                <div
                  key={historyIndex}
                  className={cn(
                    "border-solid border-line px-4 md:px-6 flex flex-col justify-center h-[62px] border-b last:border-b-0"
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
                    <div className="flex items-center gap-0.5">
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
    </div>
  );

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <div
            className="flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => setShowPanel(true)}
          >
            <Ring width={24} height={24} color="#FBB042" />
            <span className="hidden md:inline-flex text-white text-base font-orbitron font-semibold">
              {isInMaintenance ? "--" : prettyNumber(ringAmount)}
            </span>
            <Arrow
              width={24}
              height={24}
              color="white"
              className={cn(
                "hidden md:inline-flex transition-transform duration-300",
                popoverOpen ? "rotate-0" : "rotate-180"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="hidden md:flex max-w-full w-full md:w-[280px] bg-bg-popup border-none p-0 mt-5">
          <RingPanel />
        </PopoverContent>
      </Popover>

      {/* shadow */}
      {showPanel && (
        <div
          className={cn(
            "flex md:hidden bg-black/80 fixed z-20 top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
          )}
          onClick={() => setShowPanel(false)}
        ></div>
      )}

      {/* mobile */}
      <div
        className={cn(
          "flex md:hidden flex-col w-full max-h-full fixed right-0 left-0 bottom-0 z-30 transition-transform duration-300",
          showPanel ? "translate-y-0" : "translate-y-full"
        )}
      >
        <RingPanel showHeader className={cn("w-full h-full")} />
      </div>
    </>
  );
}
