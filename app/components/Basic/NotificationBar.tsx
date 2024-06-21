"use client";
import { useEffect, useState } from "react";
import { Trophy } from "../../icons/Trophy";
import { formatAddress } from "../../store/account";

export function NotificationBar() {
  const [winner, setWinner] = useState("");
  const [order, setOrder] = useState(1000);

  const handleAnimationEnd = () => {};

  useEffect(() => {}, []);

  return (
    <div
      className="w-full h-11 flex flex-row justify-center items-center gap-1 text-center bg-[#0000FF] fade-out"
      onAnimationEnd={handleAnimationEnd}
    >
      <Trophy width={24} height={24} color="white" />
      <span className="text-base font-normal text-white">
        Congratulations! to user {formatAddress(winner)} for drawing the {""}
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
  );
}
