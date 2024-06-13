"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getReferralInfo } from "@/app/data/account";
import { Card, CardSize } from "../Card";

export function Referral() {
  const { address, token } = useAccountInfo();
  const { toast } = useToast();

  const [inviteCode, setInviteCode] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [referralAmount, setReferralAmount] = useState(0);
  const [referralRewards, setReferralRewards] = useState(0);

  const { data: dataReferralInfo, isLoading: loadingReferralInfo } = useQuery({
    queryKey: ["queryReferralInfo", address],
    queryFn: () => getReferralInfo({ token }),
    enabled: !!token,
  });

  useEffect(() => {
    const referralInfo = dataReferralInfo?.data;
    if (referralInfo) {
      const { invitation_code, referrals, referral_rewards } = referralInfo;
      setInviteCode(invitation_code);
      setInviteUrl(
        `${process.env.NEXT_PUBLIC_DOMAIN}/?join=${invitation_code}`
      );
      setReferralAmount(referrals);
      setReferralRewards(referral_rewards);
    }
  }, [dataReferralInfo]);

  const handleInviteNow = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast({
        title: "Copy Successful",
        description: "The invitation link has been copied successfully.",
      });
    } catch (err) {
      console.error("Failed to copy invitation url: ", err);
    }
  };

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          <li className="">
            Copy Copy the invite code and send it to a friend. If the friend
            successfully completes the "Meet Sonic" task, they will be
            considered successfully activated, and you will receive the
            corresponding reward.
          </li>
          <li className="">
            For each successfully invited friend, you will receive{" "}
            <span className="inline-flex items-center text-[#FBB042]">
              4 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Monitors
            </span>{" "}
            automatically.
          </li>
        </ul>
      </Card>

      {/* invite code */}
      <Card name="Invite Code" size={CardSize.Medium} className="mt-20">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="text-white text-[20px] font-orbitron font-normal">
            {inviteUrl}
          </span>
          <Button
            className="w-[183px] h-[48px] bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-[16px] font-orbitron font-semibold transition-colors duration-300"
            onClick={handleInviteNow}
          >
            Invite Now
          </Button>
        </div>
      </Card>

      {/* rewards */}
      <Card name="Rewards" size={CardSize.Medium} className="mt-20">
        <ul className="w-full">
          <li className="flex flex-row items-center justify-between pb-5">
            <span className="text-[20px] text-white  font-orbitron">
              Successfully activated invitees
            </span>
            <span className="text-[56px] text-[#FBB042] font-semibold font-orbitron">
              {referralAmount}
            </span>
          </li>
          <li className="flex flex-row items-center justify-between pt-5 border-t border-solid border-white/10">
            <span className="text-[20px] text-white font-orbitron">
              Received Ring Monitor
            </span>
            <span className="text-[56px] text-[#FBB042] font-semibold font-orbitron">
              {referralRewards}
            </span>
          </li>
        </ul>
      </Card>
    </>
  );
}
