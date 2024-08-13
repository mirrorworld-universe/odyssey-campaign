"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift } from "@/app/icons/Gift";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getReferralInfo } from "@/app/data/account";
import { Card, CardSize } from "../Basic/Card";
import { trackClick } from "@/lib/track";
import { Rules } from "./Rules";

let currentToken = "";

export function MysteryNFT() {
  const { address, token } = useAccountInfo();
  const { toast } = useToast();
  const { networkId } = useNetworkInfo();

  const [inviteCode, setInviteCode] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [referralAmount, setReferralAmount] = useState(0);
  const [referralRewards, setReferralRewards] = useState(0);

  const [showRules, setShowRules] = useState(false);

  const nfts: any[] = [
    {
      id: "1",
      image: "",
      name: "Sonic Cartridge Collection",
      isLimited: true,
      introduction:
        "The Sonic Cartridge is a limited-edition NFT collection that offers special bonus effects during the Odyssey. The NFTs in this series come in four different rarities: Common, Rare, Epic, and Legendary. Each rarity provides different reward effects.",
      totalAmount: 1000,
      mintedAmount: 1000,
      available: true,
    },
    {
      id: "2",
      image: "",
      name: "Sonic Adventure Pass",
      isLimited: false,
      introduction:
        "The Sonic Adventure Pass is an unlimited NFT series commemorating user participation in Sonic Odyssey. It represents user adventures and achievements within the community and holds significant value.",
      totalAmount: -1,
      mintedAmount: 1000,
      available: true,
    },
  ];

  const {
    data: dataReferralInfo,
    isLoading: loadingReferralInfo,
    refetch: refetchReferralInfo,
  } = useQuery({
    queryKey: ["queryReferralInfo", address],
    queryFn: () => getReferralInfo({ token, networkId }),
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
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Mystery NFT
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
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
              Each NFT belongs to a different series, with varying rarity and
              quantities.
            </li>
            <li className="">
              The NFTs are free to mint; just click "Mint" to get started!
            </li>
          </ul>
        </Rules>

        {/* nft list */}
        <div className="flex flex-col gap-6 mt-20">
          {nfts.map((nft: any, index: number) => (
            <Card
              key={index}
              size={CardSize.Medium}
              className="max-w-[1024px] w-full relative p-6 md:p-10 rounded-none border-[#27282D]"
            >
              <div className="w-full flex flex-row items-center justify-between gap-10">
                {/* nft */}
                <div className="nft flex flex-row gap-10">
                  <div className="w-[200px] h-[112px] overflow-hidden">
                    <img src="" alt="" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-orbitron text-xl font-semibold text-white">
                      {nft.name}
                    </div>
                    <p className="text-[#666] text-base font-manrope">
                      {nft.introduction}
                    </p>
                    <p className="flex flex-row gap-2 text-xs text-[#999]">
                      <span className="font-orbitron">Minted Amount:</span>
                      <span className="font-manrope">
                        {nft.mintedAmount}/{nft.totalAmount}
                      </span>
                    </p>
                  </div>
                </div>
                {/* tools */}
                <div className="flex gap-2">
                  <Button>Mint</Button>
                  <Button>Trade</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-4 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className="w-4/6 h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
          onClick={handleInviteNow}
        >
          Invite Now
        </Button>
      </div>
    </div>
  );
}
