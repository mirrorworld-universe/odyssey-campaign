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
import { formatAddress, useAccountInfo } from "@/app/store/account";
import {
  getLotteryDrawPrice,
  getLotteryMintedAmount,
  getLotteryWinnerBoard,
} from "@/app/data/lottery";
import { DrawConfirmDialog } from "../Dialog/DrawConfirm";
import { DrawRecordDialog } from "../Dialog/DrawRecord";
import { DrawResultDialog } from "../Dialog/DrawResult";
import { useDrawConfirmModal, useLotteryInfo } from "@/app/store/lottery";
import { taskGroupList } from "@/app/data/task";

let winnerBoardPage = 1;
let winnerBoardList: any[] = [];
let isScrollingWinnerBoard = false;

export function RingLottery() {
  const scrollAreaRef = useRef<any>(null);

  const [mintedRingAmount, setMintedRingAmount] = useState(0);
  const [totalRingAmount, setTotalRingAmount] = useState(100000000);
  const [winnerBoard, setWinnerBoard] = useState<any[]>([]);
  const [drawPrice, setDrawPrice] = useState(0);
  const [drawAmount, setDrawAmount] = useState("1");

  const { setLotteryDrawAmount } = useLotteryInfo();

  const {
    isOpen: isOpenDrawConfirmModal,
    onOpen: onOpenDrawConfirmModal,
    onClose: onCloseDrawConfirmModal,
  } = useDrawConfirmModal();

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
      queryFn: () => getLotteryMintedAmount({ token }),
      enabled: !!address && !!token,
    });

  const {
    data: dataWinnerBoard,
    isLoading: isLoadingWinnerBoard,
    refetch: refetchWinnerBoard,
  } = useQuery({
    queryKey: ["queryWinnerBoard", address],
    queryFn: () => getLotteryWinnerBoard({ token, page: winnerBoardPage }),
    enabled: !!address && !!token,
  });

  const { data: dataDrawPrice, refetch: refetchDrawPrice } = useQuery({
    queryKey: ["queryDrawPrice", address],
    queryFn: () => getLotteryDrawPrice({ token }),
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
      winnerBoardPage++;
      refetchWinnerBoard().then(() => {
        isScrollingWinnerBoard = false;
      });
    }
  };

  const handleDrawLottery = () => {
    onOpenDrawConfirmModal();
    trackClick({ text: "Ring Lottery" });
  };

  useEffect(() => {
    if (dataDrawPrice?.data?.price) {
      setDrawPrice(dataDrawPrice.data.price);
    }
  }, [dataDrawPrice]);

  useEffect(() => {
    if (dataWinnerBoard?.data) {
      winnerBoardList = winnerBoardList.concat(dataWinnerBoard.data);
      setWinnerBoard(winnerBoardList);
    }
  }, [dataWinnerBoard]);

  useEffect(() => {
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
              <span>{formatAddress(item.wallet)}</span>
              <span className="inline-flex justify-start items-center gap-2 w-[110px]">
                <Ring width={20} height={20} color="#FBB042" />
                <span>x</span>
                <span>{item.ring_number}</span>
              </span>
              <span>#{prettyNumber(item.block_number)}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} nameClassName="bg-[#000]">
        <ul className="list-disc text-xl font-normal leading-relaxed pl-6">
          <li className="">
            Request test SOL first.{" "}
            <a
              className="text-[#25A3ED] hover:underline"
              href="https://faucet.sonic.game/#/"
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
            <a href="#" className="text-[#25A3ED] hover:underline">
              Price Table
            </a>{" "}
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
                    width={18}
                    height={18}
                    color="#FBB042"
                    className="mx-1"
                  />{" "}
                  Ring
                </span>
                .
              </li>
              <li>
                b. Season's first & last winners:{" "}
                <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                  100,000 x{" "}
                  <Ring
                    width={18}
                    height={18}
                    color="#FBB042"
                    className="mx-1"
                  />{" "}
                  Rings each
                </span>
                .
              </li>
              <li>
                c. For every 10,000 winners:{" "}
                <span className="inline-flex flex-row justify-center items-center text-[#FBB042]">
                  50,000 x{" "}
                  <Ring
                    width={18}
                    height={18}
                    color="#FBB042"
                    className="mx-1"
                  />{" "}
                  Rings
                </span>
                .
              </li>
            </ul>
          </li>
        </ul>
      </Card>

      {/* minted rings */}
      <Card
        name="Minted Rings"
        size={CardSize.Medium}
        className="mt-20"
        nameClassName="bg-[#000]"
      >
        <div className="flex flex-row justify-between items-center">
          <Ring width={56} height={56} color="#FBB042" />
          <span className="text-white text-5xl font-semibold font-orbitron">
            {`${prettyNumber(mintedRingAmount)}/${prettyNumber(
              totalRingAmount
            )}`}
          </span>
        </div>
      </Card>

      <div className="flex flex-row gap-20 mt-20">
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
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
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
              </div>
            </div>
            <div className="flex justify-between text-white/60">
              <span className="">Current Price:</span>
              <span className="">{drawPrice} SOL</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span className="">Token Spending:</span>
              <span className="">
                {drawAmount} x {drawPrice}{" "}
                <span className="text-xs">SOL/Draw</span> ={" "}
                {Number(drawAmount) * drawPrice} SOL
              </span>
            </div>
            <Button
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

      {!taskGroupList
        .map((item) => item.list)
        .flat()
        .find((task) => task.id === "ring-lottery")?.available && (
        <div className="w-screen h-screen bg-black/90 fixed top-0 left-0 z-20"></div>
      )}
    </>
  );
}
