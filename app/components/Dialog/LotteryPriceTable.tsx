"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLotteryInfo, useLotteryPriceTableModal } from "@/app/store/lottery";
import { Button } from "@/components/ui/button";

export function LotteryPriceTableDialog() {
  const { isOpen, onOpen, onClose } = useLotteryPriceTableModal();
  const { lotterySeason } = useLotteryInfo();

  const priceTables = [
    // season 1
    [
      {
        range: "1-432,000",
        price: 0,
      },
      {
        range: "432,001~864,000",
        price: 0.01,
      },
      {
        range: "864,001~1,296,000",
        price: 0.02,
      },
      {
        range: "1,296,001+",
        price: 0.03,
      },
    ],

    // season 2
    [
      {
        range: "1-432,000",
        price: 0,
      },
      {
        range: "432,001~864,000",
        price: 0.01,
      },
      {
        range: "864,001~1,296,000",
        price: 0.02,
      },
      {
        range: "1,296,001~1,728,000",
        price: 0.03,
      },
      {
        range: "1,728,001~2,160,000",
        price: 0.04,
      },
      {
        range: "2,160,001~",
        price: 0.05,
      },
    ],
  ];

  const handleConfirm = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[468px] bg-[#1A1A1A] border-none px-8 py-8">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex flex-row justify-start items-center gap-3 text-white text-[32px] font-semibold font-orbitron">
            <span>Price Table</span>{" "}
            {/* <span className="text-white/20">Season {lotterySeason || 1}</span> */}
            <span className="text-white/20">Season 1</span>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex flex-col gap-5 p-6 border border-solid border-[#535353] text-sm rounded-xl mt-12">
          <div className="flex flex-row justify-between text-white/60 pt-2">
            <div>Rings Range</div>
            <div>Lottery Price (Test SOL)</div>
          </div>
          {priceTables[(lotterySeason || 1) - 1].map((table) => (
            <div className="flex flex-row justify-between text-white">
              <div>{table.range}</div>
              <div>{table.price}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-12 mt-12">
          <Button
            className="w-full h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/50 text-white font-orbitron transition-colors duration-300"
            onClick={handleConfirm}
          >
            OK
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
