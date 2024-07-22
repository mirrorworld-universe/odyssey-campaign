"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { prettyNumber } from "@/lib/utils";
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
  SelectValue,
} from "@/components/ui/select";
import { trackClick } from "@/lib/track";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  formatAddress,
  useAccountInfo,
  useNetworkInfo,
} from "@/app/store/account";
import {
  getLotteryDrawPrice,
  getLotteryMintedAmount,
  getLotteryWinnerBoard,
} from "@/app/data/lottery";
import { DrawConfirmDialog } from "../Dialog/DrawConfirm";
import { DrawRecordDialog } from "../Dialog/DrawRecord";
import { DrawResultDialog } from "../Dialog/DrawResult";
import {
  useDrawConfirmModal,
  useLotteryInfo,
  useLotteryPriceTableModal,
} from "@/app/store/lottery";
import { taskGroupList } from "@/app/data/task";
import { LotteryPriceTableDialog } from "../Dialog/LotteryPriceTable";
import { Rules } from "./Rules";

let winnerBoardPage = 1;
let winnerBoardList: any[] = [];
let isScrollingWinnerBoard = false;

export function RingLottery() {
  const maxDrawAmount = 5;
  const maxMintAmount = 1512000;
  const scrollAreaRef = useRef<any>(null);

  const [mintedRingAmount, setMintedRingAmount] = useState(0);
  const [totalRingAmount, setTotalRingAmount] = useState(maxMintAmount);
  const [winnerBoard, setWinnerBoard] = useState<any[]>([]);
  const [drawAmount, setDrawAmount] = useState("1");
  const [season, setSeason] = useState(0);

  const [showRules, setShowRules] = useState(false);

  const {
    lotteryDrawPrice,
    setLotteryDrawPrice,
    setLotteryDrawAmount,
    setLotterySeason,
  } = useLotteryInfo();

  const {
    isOpen: isOpenDrawConfirmModal,
    onOpen: onOpenDrawConfirmModal,
    onClose: onCloseDrawConfirmModal,
  } = useDrawConfirmModal();

  const { onOpen: onOpenLotteryPriceTableModal } = useLotteryPriceTableModal();
  const { networkId } = useNetworkInfo();
  const {
    address,
    token,
    reset,
    hasNews,
    setNews: hasNotification,
  } = useAccountInfo();

  const { data: dataMintedRingAmount, refetch: refetchMintedRingAmount } =
    useQuery({
      queryKey: ["queryMintedRingAmount", address],
      queryFn: () => getLotteryMintedAmount({ token, networkId }),
      enabled: !!address && !!token,
    });

  const {
    data: dataWinnerBoard,
    isLoading: isLoadingWinnerBoard,
    refetch: refetchWinnerBoard,
  } = useQuery({
    queryKey: ["queryWinnerBoard", address],
    queryFn: () =>
      getLotteryWinnerBoard({ token, page: winnerBoardPage, networkId }),
    enabled: !!address && !!token,
  });

  const { data: dataDrawPrice, refetch: refetchDrawPrice } = useQuery({
    queryKey: ["queryDrawPrice", address],
    queryFn: () => getLotteryDrawPrice({ token, networkId }),
    enabled: !!address && !!token,
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
        className="max-h-[280px] overflow-y-auto"
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

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="flex text-white font-orbitron font-semibold text-2xl md:text-[64px] gap-6">
        <span className="hidden md:inline">Ring Lottery</span>
        {season > 0 ? (
          // <span className="text-white/50 md:text-white/20">Season {season}</span>
          <span className="text-white/50 md:text-white/20">Season 1</span>
        ) : null}
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="mt-8 md:mt-0">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-disc font-normal pl-6">
            <li className="">
              Request test SOL first.{" "}
              <a
                className="text-[#25A3ED] hover:underline"
                href={`https://faucet.sonic.game/#/${
                  networkId === "testnet" ? "?network=testnet" : ""
                }`}
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
            </li>
          </ul>
        </Rules>

        {/* minted rings */}
        <Card
          name="Minted Rings"
          size={CardSize.Medium}
          className="mt-8 md:mt-20 max-w-[1024px]"
          nameClassName="bg-[#000]"
        >
          <div className="flex flex-row justify-between items-center">
            <Ring width={56} height={56} color="#FBB042" />
            <span className="text-white text-5xl font-semibold font-orbitron">
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
            className="w-[470px]"
            nameClassName="bg-[#000]"
          >
            {winnerBoard.length ? (
              <WinnerBoard />
            ) : (
              <p className="flex w-full h-full justify-center items-center text-white/30">
                No winner yet
              </p>
            )}
          </Card>

          {/* draw */}
          <Card
            size={CardSize.Medium}
            className="w-[470px]"
            nameClassName="bg-[#000]"
          >
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-row justify-between">
                <span className="text-white text-xl font-orbitron">
                  Number of draws
                </span>
                <div className="flex items-center">
                  <Select
                    disabled={true}
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
                        {Array.from(
                          { length: maxDrawAmount },
                          (_, i) => i + 1
                        ).map((number) => (
                          <SelectItem
                            value={number.toString()}
                            key={number}
                            className="focus:bg-white/5 text-white focus:text-white h-11"
                          >
                            {number}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col xl:flex-row justify-between text-white/60">
                <span className="">Current Price:</span>
                <span className="font-semibold xl:font-normal">
                  {lotteryDrawPrice} SOL
                </span>
              </div>
              <div className="flex flex-col xl:flex-row justify-between text-white/60">
                <span className="">Token Spending:</span>
                <span className="font-semibold xl:font-normal">
                  {drawAmount} x {lotteryDrawPrice}{" "}
                  <span className="text-xs">SOL/Draw</span> ={" "}
                  {Number(drawAmount) * lotteryDrawPrice} SOL
                </span>
              </div>
              <Button
                disabled={season === 0 || season > 1}
                onClick={handleDrawLottery}
                className="h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white text-base font-bold font-orbitron transition-colors duration-300"
              >
                Draw
              </Button>
            </div>
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

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-full h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
      </div>
    </div>
  );
}
