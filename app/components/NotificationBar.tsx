import { useState } from "react";
import { Trophy } from "../icons/Trophy";
import { formatAddress } from "../store/account";

export function NotificationBar() {
  const [winner, setWinner] = useState("");

  return (
    <div className="w-full flex flex-row justify-center items-center gap-1 text-center bg-[#0000FF]">
      <Trophy width={24} height={24} color="white" />
      <span className="text-base font-normal text-white">
        Congratulations! to user ${formatAddress(winner)} for drawing the
        10,000th ring in the Ring Lottery! Well done!
      </span>
    </div>
  );
}
