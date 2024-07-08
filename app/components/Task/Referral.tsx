"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getReferralInfo } from "@/app/data/account";
import { Card, CardSize } from "../Basic/Card";
import { trackClick } from "@/lib/track";

let currentToken = "";

export function Referral() {
  const { address, token } = useAccountInfo();
  const { toast } = useToast();

  const [inviteCode, setInviteCode] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [referralAmount, setReferralAmount] = useState(0);
  const [referralRewards, setReferralRewards] = useState(0);

  const {
    data: dataReferralInfo,
    isLoading: loadingReferralInfo,
    refetch: refetchReferralInfo,
  } = useQuery({
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

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchReferralInfo();
    }
  }, [token]);

  const handleInviteNow = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast({
        title: "Copy Successful",
        description: "The invitation link has been copied successfully.",
      });
      trackClick({ text: "Referral" });
    } catch (err) {
      console.error("Failed to copy invitation url: ", err);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="text-white font-orbitron font-semibold text-[64px]">
        Referral
      </h1>

      {/* line */}
      <div className="w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Card name="Rules" size={CardSize.Medium} nameClassName="bg-[#000]">
          <ul className="list-disc text-xl font-normal leading-relaxed pl-6">
            <li className="">
              Copy the invite code and send it to a friend. If the friend
              successfully completes the "Meet Sonic" task, they will be
              considered successfully activated, and you will receive the
              corresponding reward.
            </li>
            <li className="">
              For each successfully invited friend, you will receive{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                1 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Mystery
                Box
              </span>{" "}
              automatically.
            </li>
          </ul>
        </Card>

        {/* invite code */}
        <Card
          name="Invite Code"
          size={CardSize.Medium}
          className="mt-20"
          nameClassName="bg-[#000]"
        >
          <div className="w-full flex flex-row items-center justify-between">
            <span className="text-white text-xl font-orbitron font-normal">
              {inviteUrl}
            </span>
            <Button
              className="w-[183px] h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
              onClick={handleInviteNow}
            >
              Invite Now
            </Button>
          </div>
        </Card>

        {/* rewards */}
        <Card
          name="Rewards"
          size={CardSize.Medium}
          className="mt-20"
          nameClassName="bg-[#000]"
        >
          <ul className="w-full">
            <li className="flex flex-row items-center justify-between pb-5">
              <span className="text-xl text-white  font-orbitron">
                Successfully activated invitees
              </span>
              <span className="text-[56px] text-[#FBB042] font-semibold font-orbitron">
                {referralAmount}
              </span>
            </li>
            <li className="flex flex-row items-center justify-between pt-5 border-t border-solid border-white/10">
              <span className="text-xl text-white font-orbitron">
                Received Ring Mystery Boxes
              </span>
              <span className="text-[56px] text-[#FBB042] font-semibold font-orbitron">
                {referralRewards}
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
