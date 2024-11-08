"use client";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardSize } from "@/app/components/Basic/Card";
import { Gift } from "@/app/icons/Gift";
import { Twitter } from "@/app/icons/Twitter";
import { Discord } from "@/app/icons/Discord";
import {
  useAccountInfo,
  useNetworkInfo,
  useSystemInfo,
  useWalletModal
} from "@/app/store/account";
import { cn, isInMaintenanceTime, openDialoguePopup } from "@/lib/utils";

import {
  fetchFollowDiscord,
  fetchFollowTwitter,
  fetchFollowingStatus
} from "../../data/task";
import { toast } from "@/components/ui/use-toast";
import { trackClick } from "@/lib/track";
import { Rules } from "./Rules";

let hasFollowedBoth = false;
let currentToken = "";

export function MeetSonic() {
  const { isOpen, onOpen, onClose } = useWalletModal();
  const { address, token } = useAccountInfo();
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const { networkId } = useNetworkInfo();

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [hasFollowedTwitter, setHasFollowedTwitter] = useState(false);
  const [authTwitterState, setAuthTwitterState] = useState("");
  const [authTwitterCode, setAuthTwitterCode] = useState("");

  const [hasFollowedDiscord, setHasFollowedDiscord] = useState(false);
  const [authDiscordState, setAuthDiscordState] = useState("");
  const [authDiscordCode, setAuthDiscordCode] = useState("");

  const [showRules, setShowRules] = useState(false);

  const {
    data: dataFollowingStatus,
    isLoading: loadingFollowingStatus,
    refetch: refetchFollowingStatus
  } = useQuery({
    queryKey: ["queryFollowingStatus", address],
    queryFn: () => fetchFollowingStatus({ token, networkId }),
    enabled: !!token
  });

  const showRewardsToast = () => {
    toast({
      title: '"Meet Sonic" task completed.',
      description: (
        <p role="success" className="block">
          You've received{" "}
          <span className="inline-flex items-center text-[#FBB042]">
            3 x mystery boxes
            <Gift color="#FBB042" className="w-3 h-3 mx-[2px]" />
          </span>
          . Open it in the navbar to exchange for rings.
        </p>
      )
    });
  };

  const mutationFollowTwitter = useMutation({
    mutationKey: ["followTwitter", address],
    mutationFn: () =>
      fetchFollowTwitter({
        state: authTwitterState,
        code: authTwitterCode,
        networkId
      }),
    onSuccess: ({ data, code, message }) => {
      if (code !== 0) {
        toast({
          description: <div role="success">{message}</div>
        });
      } else {
        const result = data?.following_result;
        setHasFollowedTwitter(result?.toLowerCase() === "success");
        if (hasFollowedBoth) {
          showRewardsToast();
        }
      }
    }
  });

  const mutationFollowDiscord = useMutation({
    mutationKey: ["followDiscord", address],
    mutationFn: () =>
      fetchFollowDiscord({
        state: authDiscordState,
        code: authDiscordCode,
        networkId
      }),
    onSuccess: ({ data, code, message }) => {
      if (code !== 0) {
        toast({
          description: <div role="success">{message}</div>
        });
      } else {
        const result = data?.following_result;
        setHasFollowedDiscord(result?.toLowerCase() === "success");
        if (hasFollowedBoth) {
          showRewardsToast();
        }
      }
    }
  });

  useEffect(() => {
    if (window.location.search) {
      const queryParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(queryParams.entries());
      if (params.source === "twitter") {
        setAuthTwitterState(params.state);
        setAuthTwitterCode(params.code);
      }
      if (params.source === "discord") {
        setAuthDiscordState(params.state);
        setAuthDiscordCode(params.code);
      }
    }
  }, []);

  useEffect(() => {
    const followingStatus = dataFollowingStatus?.data;
    if (followingStatus) {
      setIsLoadingStatus(false);
      setHasFollowedTwitter(followingStatus.twitter?.followed);
      setHasFollowedDiscord(followingStatus.discord?.followed);

      hasFollowedBoth =
        followingStatus.twitter?.followed && followingStatus.discord?.followed;

      if (window.location.search) {
        const queryParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(queryParams.entries());
        if (params.source === "twitter") {
          if (!followingStatus?.twitter?.followed) {
            mutationFollowTwitter.mutate();
          }
        }
        if (params.source === "discord") {
          if (!followingStatus?.discord?.followed) {
            mutationFollowDiscord.mutate();
          }
        }
      }
    }
  }, [dataFollowingStatus]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchFollowingStatus();
    }
  }, [token]);

  const socialMediaList = [
    {
      id: "twitter",
      name: "Follow on X",
      link: "https://twitter.com/SonicSVM",
      description:
        "Follow @SonicSVM on X for the latest updates, project progress, and to stay informed about all the exciting developments and news.",
      buttonIcon: <Twitter className="w-4 h-4 md:w-5 md:h-5" />,
      buttonText: "Follow on X",
      handler: () => {
        if (hasFollowedTwitter) {
          return;
        }
        const { data } = dataFollowingStatus;
        const currentHref = `${location.origin}/task/meet-sonic?source=twitter`;
        const redirectUrl = data.twitter.url;
        const newUrl = redirectUrl.replace(
          /(redirect_uri=)[^&]+/,
          `$1${currentHref}`
        );
        window.open(newUrl);
      }
    },
    {
      id: "discord",
      name: "Join Discord",
      link: "https://discord.gg/joinmirrorworld",
      description:
        "Join Sonic's Discord Server to participate in community discussions and contribute to its growth.",
      buttonIcon: <Discord width={20} height={20} />,
      buttonText: "Join Discord",
      handler: () => {
        if (hasFollowedDiscord) {
          return;
        }
        const { data } = dataFollowingStatus;
        const currentHref = `${location.origin}/task/meet-sonic?source=discord`;
        const redirectUrl = data.discord.url;
        const newUrl = redirectUrl.replace(
          /(redirect_uri=)[^&]+/,
          `$1${currentHref}`
        );
        window.open(newUrl);
      }
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Meet Sonic
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="w-full list-disc font-normal pl-6">
            <li className="">
              Click the social buttons to link your account and complete the
              tasks.
            </li>
            <li className="">
              Earn{" "}
              <span className="inline-flex items-center text-[#FBB042]">
                3 x{" "}
                <Gift
                  color="#FBB042"
                  className="w-3 h-3 md:w-[18px] md:h-[18px] mx-[2px]"
                />{" "}
                Ring Mystery Boxes
              </span>{" "}
              after linking both your X and Discord accounts.
            </li>
            <li className="">This is a one-time task and will not reset.</li>
          </ul>
        </Rules>

        {/* main */}
        <Card
          size={CardSize.Medium}
          className="max-w-[1024px] md:mt-20 p-6 rounded-lg md:p-10 md:rounded-xl"
          nameClassName="bg-[#000]"
        >
          <ul className="list-disc font-normal leading-relaxed md:pl-6">
            {socialMediaList.map((socialMedia, socialMediaIndex) => (
              <li
                className={`flex flex-col xl:flex-row items-start xl:items-center w-full ${
                  socialMediaIndex > 0
                    ? "border-t-[1px] border-white/10 border-solid pt-6 md:pt-10"
                    : "pb-6 md:pb-10"
                }`}
                key={socialMediaIndex}
              >
                <div className="flex flex-col pr-20 xl:border-r xl:border-solid xl:border-white/10">
                  <h5 className="text-sm md:text-xl text-white font-semibold font-orbitron">
                    {socialMedia.name}
                  </h5>
                  <p className="w-full text-xs md:text-base text-white/50 font-normal mt-2 md:mt-4">
                    {socialMedia.description}
                  </p>
                </div>
                <Button
                  className={cn(
                    "inline-flex justify-center items-center w-[148px] md:w-[178px] md:h-12 rounded gap-2 px-4 py-2 md:py-[10px] bg-[#0000FF] transition-all duration-300 mt-5 md:mt-10 xl:mt-0 xl:ml-20",
                    socialMedia.id === "twitter"
                      ? hasFollowedTwitter
                        ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                        : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                      : hasFollowedDiscord
                      ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                      : "hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60",
                    isInMaintenance
                      ? "hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                      : ""
                  )}
                  onClick={() => {
                    if (isInMaintenance) {
                      return;
                    }

                    if (!address || !token) {
                      onOpen();
                      return;
                    }
                    socialMedia.handler();
                    trackClick({ text: "Meet Sonic" });
                  }}
                >
                  {socialMedia.buttonIcon}
                  <span className="text-white font-orbitron text-sm md:text-base font-semibold">
                    {address && token
                      ? isLoadingStatus
                        ? "Loading"
                        : socialMedia.id === "twitter"
                        ? hasFollowedTwitter
                          ? "Followed"
                          : socialMedia.buttonText
                        : hasFollowedDiscord
                        ? "Followed"
                        : socialMedia.buttonText
                      : "Connect Wallet"}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
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
