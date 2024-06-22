"use client";
import { useEffect, useState } from "react";
import { Trophy } from "../../icons/Trophy";
import { formatAddress } from "../../store/account";

export function NotificationBar({ children }: any) {
  const [winner, setWinner] = useState("");
  const [order, setOrder] = useState(1000);

  const handleAnimationEnd = () => {};

  useEffect(() => {}, []);

  return (
    <div
      className="w-full h-11 flex justify-center items-center bg-[#0000FF] text-base font-normal text-white fade-out"
      onAnimationEnd={handleAnimationEnd}
    >
      {children ? (
        <div className="flex flex-row justify-center items-center gap-1 text-center">
          {children}
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-1 text-center">
          <Trophy width={24} height={24} color="white" />
          <span>
            Congratulations! to user {formatAddress(winner)} for drawing the{" "}
            {""}
            {order}
            {order === 1
              ? "st"
              : order === 2
              ? "nd"
              : order === 3
              ? "rd"
              : "th"}{" "}
            ring in the Ring Lottery! Well done!
          </span>
        </div>
      )}
    </div>
  );
}
