"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  cn,
  isInLotteryCampaignTime,
  isInMaintenanceTime,
  isMobileViewport,
  prettyNumber
} from "@/lib/utils";
import { Arrow } from "@/app/icons/Arrow";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Basic/Card";
import { Ring } from "@/app/icons/Ring";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { trackClick } from "@/lib/track";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  formatAddress,
  useAccountInfo,
  useNetworkInfo
} from "@/app/store/account";
import {
  getLotteryDrawPrice,
  getLotteryMintedAmount,
  getLotteryWinnerBoard
} from "@/app/data/lottery";
import { DrawConfirmDialog } from "../Dialog/DrawConfirm";
import { DrawRecordDialog } from "../Dialog/DrawRecord";
import { DrawResultDialog } from "../Dialog/DrawResult";
import {
  useDrawConfirmModal,
  useLotteryInfo,
  useLotteryPriceTableModal
} from "@/app/store/lottery";
import { taskGroupList } from "@/app/data/task";
import { LotteryPriceTableDialog } from "../Dialog/LotteryPriceTable";
import { Rules } from "./Rules";
import { Close } from "@/app/icons/Close";
import { getFaucetUrl } from "@/app/data/config";

let winnerBoardPage = 1;
let winnerBoardList: any[] = [];
let isScrollingWinnerBoard = false;

export function RingLottery() {
  const maxDrawAmount = 5;
  const maxMintAmount = 1512000;
  const scrollAreaRef = useRef<any>(null);

  const { wallet } = useWallet();

  const [mintedRingAmount, setMintedRingAmount] = useState(0);
  const [totalRingAmount, setTotalRingAmount] = useState(maxMintAmount);
  const [winnerBoard, setWinnerBoard] = useState<any[]>([]);
  const [drawAmount, setDrawAmount] = useState("1");
  const [season, setSeason] = useState(0);

  const [showRules, setShowRules] = useState(false);
  const [showDrawPanel, setShowDrawPanel] = useState(false);

  const {
    lotteryDrawPrice,
    setLotteryDrawPrice,
    setLotteryDrawAmount,
    setLotterySeason
  } = useLotteryInfo();

  const {
    isOpen: isOpenDrawConfirmModal,
    onOpen: onOpenDrawConfirmModal,
    onClose: onCloseDrawConfirmModal
  } = useDrawConfirmModal();

  const { onOpen: onOpenLotteryPriceTableModal } = useLotteryPriceTableModal();
  const { networkId } = useNetworkInfo();
  const {
    address,
    token,
    reset,
    hasNews,
    setNews: hasNotification
  } = useAccountInfo();

  const { data: dataMintedRingAmount, refetch: refetchMintedRingAmount } =
    useQuery({
      queryKey: ["queryMintedRingAmount", address],
      queryFn: () => getLotteryMintedAmount({ token, networkId }),
      enabled: !!address && !!token
    });

  const {
    data: dataWinnerBoard,
    isLoading: isLoadingWinnerBoard,
    refetch: refetchWinnerBoard
  } = useQuery({
    queryKey: ["queryWinnerBoard", address],
    queryFn: () =>
      getLotteryWinnerBoard({ token, page: winnerBoardPage, networkId }),
    enabled: !!address && !!token
  });

  const { data: dataDrawPrice, refetch: refetchDrawPrice } = useQuery({
    queryKey: ["queryDrawPrice", address],
    queryFn: () => getLotteryDrawPrice({ token, networkId }),
    enabled: !!address && !!token
  });

  const handleSetLotteryDrawAmount = (drawAmount: string) => {
    setDrawAmount(drawAmount);
    setLotteryDrawAmount(Number(drawAmount));
  };

  const handleScrollWinnerBoard = () => {
    const offset = 30;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight - offset &&
      !isScrollingWinnerBoard
    ) {
      isScrollingWinnerBoard = true;
      refetchWinnerBoard().then(() => {
        isScrollingWinnerBoard = false;
      });
    }
  };

  const handleDrawLottery = () => {
    onOpenDrawConfirmModal();
    trackClick({ text: "Ring Lottery" });
  };

  const handleOpenPriceTable = () => {
    onOpenLotteryPriceTableModal();
  };

  useEffect(() => {
    if (dataDrawPrice?.data?.price) {
      setLotteryDrawPrice(dataDrawPrice.data.price || 0);
    }
  }, [dataDrawPrice]);

  useEffect(() => {
    if (dataWinnerBoard?.data?.length) {
      winnerBoardList = winnerBoardList.concat(dataWinnerBoard.data);
      setWinnerBoard(winnerBoardList);
      winnerBoardPage++;
    }
  }, [dataWinnerBoard]);

  useEffect(() => {
    // season
    if (dataMintedRingAmount?.data?.season) {
      setSeason(dataMintedRingAmount.data.season);
      setLotterySeason(dataMintedRingAmount.data.season);
    }
    // minted amount
    if (dataMintedRingAmount?.data?.minted) {
      setMintedRingAmount(dataMintedRingAmount.data.minted);
    }
    // total amount
    if (dataMintedRingAmount?.data?.total) {
      setTotalRingAmount(dataMintedRingAmount.data.total);
    }
  }, [dataMintedRingAmount]);

  useEffect(() => {
    setLotteryDrawAmount(Number(drawAmount));
  }, []);

  const WinnerBoard = () => (
    <div className="flex flex-col gap-5 text-sm">
      {/* title */}
      <div className="flex flex-row justify-between items-center text-white/60 pt-2">
        <span>Wallet Address</span>
        <span>Number of Rings</span>
        <span>Block Number</span>
      </div>
      {/* rows */}
      <ScrollArea
        ref={scrollAreaRef}
        className="h-[180px] md:h-[280px] pr-2.5"
        onScroll={handleScrollWinnerBoard}
      >
        <div className="flex flex-col gap-5">
          {winnerBoard.map((item: any, itemIndex: number) => (
            <div
              key={itemIndex}
              className="flex flex-row justify-between text-white items-center"
            >
              <span className="w-24">{formatAddress(item.wallet)}</span>
              <span className="inline-flex justify-start items-center gap-2 w-[110px]">
                <Ring width={20} height={20} color="#FBB042" />
                <span>x</span>
                <span>{item.ring_number}</span>
              </span>
              <span className="w-[88px] text-right">
                #{prettyNumber(item.block_number)}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const DrawAmountSelector = () => (
    <div className="flex flex-row items-center gap-4">
      <span
        className="minus text-2xl font-bold inline-flex bg-[#1d1d1d] w-6 h-6 justify-center items-center text-[#616161] cursor-pointer active:opacity-80"
        onClick={() =>
          Number(drawAmount) > 1
            ? handleSetLotteryDrawAmount((Number(drawAmount) - 1).toString())
            : null
        }
      >
        -
      </span>
      <span className="text-white text-[18px]">{drawAmount}</span>
      <span
        className="plus text-2xl font-bold inline-flex bg-[#1d1d1d] w-6 h-6 justify-center items-center text-[#616161] cursor-pointer active:opacity-80"
        onClick={() =>
          Number(drawAmount) < maxDrawAmount
            ? handleSetLotteryDrawAmount((Number(drawAmount) + 1).toString())
            : null
        }
      >
        +
      </span>
    </div>
  );

  const DrawLotteryPanel = ({ className, showHeader }: any) => (
    <div className={cn("flex flex-col", className)}>
      {showHeader ? (
        <p className="flex justify-between items-center py-5">
          <span className="text-white/50 text-sm font-orbitron font-semibold">
            Draw Setting
          </span>
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={() => setShowDrawPanel(false)}
          >
            <Close color="rgba(255, 255, 255, .3)" width={24} height={24} />
          </span>
        </p>
      ) : null}

      <div className={cn("w-full flex flex-col gap-5 pt-2 md:pt-0")}>
        <div className="w-full flex flex-row justify-between">
          <span className="text-white text-base md:text-xl font-orbitron">
            Number of draws
          </span>
          <div className="flex items-center">
            {isMobileViewport() ? (
              <DrawAmountSelector />
            ) : (
              <Select
                disabled={isInMaintenanceTime()}
                value={drawAmount}
                onValueChange={(value: string) =>
                  handleSetLotteryDrawAmount(value)
                }
              >
                <SelectTrigger className="bg-transparent text-white text-lg font-semibold outline-none border-none">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B1B1B] border-none text-white rounded">
                  <SelectGroup>
                    {Array.from({ length: maxDrawAmount }, (_, i) => i + 1).map(
                      (number) => (
                        <SelectItem
                          value={number.toString()}
                          key={number}
                          className="focus:bg-white/5 text-white focus:text-white h-11"
                        >
                          {number}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex flex-row md:flex-col xl:flex-row justify-between text-white/60">
          <span className="text-sm md:text-base">Current Price:</span>
          <span className="text-sm md:text-base font-semibold xl:font-normal">
            {lotteryDrawPrice} SOL
          </span>
        </div>
        <div className="flex flex-row md:flex-col xl:flex-row justify-between text-white/60">
          <span className="text-sm md:text-base">Token Spending:</span>
          <span className="text-sm md:text-base font-semibold xl:font-normal">
            {drawAmount} x {lotteryDrawPrice}{" "}
            <span className="text-[10px] md:text-xs">SOL/Draw</span>{" "}
            <span className="text-sm md:text-base">=</span>{" "}
            {Number(drawAmount) * lotteryDrawPrice}{" "}
            <span className="text-[10px] md:text-xs">SOL</span>
          </span>
        </div>

        <Button
          disabled={
            season === 0 ||
            season > 1 ||
            (isInLotteryCampaignTime(networkId) &&
              wallet?.adapter.name.toLowerCase() !== "okx wallet")
          }
          onClick={handleDrawLottery}
          className="h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300 mt-5 md:mt-0"
        >
          {!isInLotteryCampaignTime(networkId) ||
          (isInLotteryCampaignTime(networkId) &&
            wallet?.adapter.name.toLowerCase() === "okx wallet")
            ? "Draw"
            : "OKX Wallet Needed"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full pb-20 md:pb-0">
      {/* title */}
      <h1 className="flex text-white font-orbitron font-semibold text-2xl md:text-[58px] 2xl:text-[64px] gap-6">
        <span className="hidden md:inline text-nowrap">Ring Lottery</span>
        <span className="text-white/50 md:text-white/20 text-nowrap">
          {" "}
          {isInLotteryCampaignTime(networkId)
            ? "OKX Season"
            : season > 0
            ? "Season 1"
            : `Season ${season}`}
        </span>
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="flex flex-col-reverse md:flex-col mt-0">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-disc font-normal pl-6">
            <li className="">
              Request test SOL first.{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href={getFaucetUrl()}
                target="_blank"
              >
                Request here.
              </a>
            </li>
            <li className="">
              Enter the number of times you want to draw to participate in the
              lottery.
            </li>
            <li className="">
              Each block will have only one winner, and each winner will win 1
              ring!
            </li>
            <li className="">
              The lottery price and the number of rings follow a bonding curve.
              Check the{" "}
              <span
                className="text-[#25A3ED] hover:underline cursor-pointer"
                onClick={handleOpenPriceTable}
              >
                Price Table
              </span>{" "}
              .
            </li>
            <li className="">
              Rewards Detail:
              {isInLotteryCampaignTime(networkId) ? (
                <ul className="list-item pl-2">
                  <li className="">
                    a. Block winner:{" "}
                    <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                      1 x{" "}
                      <Ring
                        color="#FBB042"
                        className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                      />{" "}
                      Ring
                    </span>
                    .
                  </li>
                  <li>
                    b. For every 10,000 winners:{" "}
                    <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                      {prettyNumber(1000)} x{" "}
                      <Ring
                        color="#FBB042"
                        className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                      />{" "}
                      Rings
                    </span>
                    .
                  </li>
                </ul>
              ) : (
                <ul className="list-item pl-2">
                  <li className="">
                    a. Block winner:{" "}
                    <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                      1 x{" "}
                      <Ring
                        color="#FBB042"
                        className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                      />{" "}
                      Ring
                    </span>
                    .
                  </li>
                  <li>
                    b. Season's first winners:{" "}
                    <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                      {prettyNumber(100000)} x{" "}
                      <Ring
                        color="#FBB042"
                        className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                      />{" "}
                      Rings each
                    </span>
                    .
                  </li>
                  <li>
                    c. For every 10,000 winners:{" "}
                    <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                      {prettyNumber(10000)} x{" "}
                      <Ring
                        color="#FBB042"
                        className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                      />{" "}
                      Rings
                    </span>
                    .
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </Rules>

        {/* minted rings */}
        <Card
          name="Minted Rings"
          size={CardSize.Medium}
          className="mt-8 md:mt-20 max-w-[1024px] p-4 md:p-10"
          nameClassName="text-sm md:text-[28px] bg-[#000] px-1 md:px-4 left-5 md:left-8 -top-3 md:-top-3"
        >
          <div className="flex flex-row justify-between items-center">
            <Ring color="#FBB042" className="w-6 md:w-14 h-6 md:h-14" />
            <span className="text-white text-base md:text-5xl font-semibold font-orbitron">
              {season > 1
                ? `${prettyNumber(maxMintAmount)}/${prettyNumber(
                    maxMintAmount
                  )}`
                : `${prettyNumber(mintedRingAmount)}/${prettyNumber(
                    totalRingAmount
                  )}`}
            </span>
          </div>
        </Card>

        <div className="flex flex-row items-start gap-20 mt-8 md:mt-20">
          {/* winner board */}
          <Card
            name="Winner Board"
            size={CardSize.Medium}
            className="w-[470px] p-4 md:p-10"
            nameClassName="text-sm md:text-[28px] bg-[#000] px-1 md:px-4 left-5 md:left-8 -top-3 md:-top-3"
          >
            {winnerBoard.length ? (
              <WinnerBoard />
            ) : (
              <p className="flex w-full h-full justify-center items-center text-white/30">
                No winner yet
              </p>
            )}
          </Card>

          {/* draw panel */}
          <Card
            size={CardSize.Medium}
            className={cn("w-[470px] hidden md:flex")}
            nameClassName="bg-[#000]"
          >
            <DrawLotteryPanel />
          </Card>
        </div>

        {/* dialog */}
        <DrawConfirmDialog />
        <DrawRecordDialog />
        <DrawResultDialog />
        <LotteryPriceTableDialog />

        {!taskGroupList
          .map((item) => item.list)
          .flat()
          .find((task) => task.id === "ring-lottery")?.available && (
          <div className="w-screen h-screen bg-black/90 fixed top-0 left-0 z-20"></div>
        )}
      </div>

      {/* shadow */}
      {showDrawPanel && (
        <div
          className={cn(
            "flex md:hidden bg-black/80 fixed z-20 top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
          )}
          onClick={() => setShowDrawPanel(false)}
        ></div>
      )}

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5 gap-4">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className={cn(
            "w-4/6 h-12 text-white text-base font-semibold font-orbitron bg-[#0000FF] transition-colors duration-300",
            isInMaintenanceTime()
              ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
              : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 cursor-pointer"
          )}
          onClick={() => setShowDrawPanel(true)}
        >
          Set Draw
        </Button>
      </div>

      {/* draw panel */}
      <div
        className={cn(
          "flex md:hidden z-30 flex-col fixed bottom-0 right-0 left-0 m-auto bg-[#111] pt-0 pb-5 px-5 transition-transform duration-300 rounded-xl",
          showDrawPanel || !isMobileViewport()
            ? "translate-y-0"
            : "translate-y-full"
        )}
      >
        <DrawLotteryPanel showHeader />
      </div>
    </div>
  );
}
