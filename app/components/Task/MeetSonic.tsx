"use client";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardSize } from "@/app/components/Card";
import { Gift } from "@/app/icons/Gift";
import { Twitter } from "@/app/icons/Twitter";
import { Discord } from "@/app/icons/Discord";
import { useAccountInfo, useWalletModal } from "@/app/store/account";
import { openDialoguePopup } from "@/lib/utils";

import {
  fetchFollowDiscord,
  fetchFollowTwitter,
  fetchFollowingStatus,
} from "../../data/task";

export function MeetSonic() {
  const { isOpen, onOpen, onClose } = useWalletModal();
  const { address, token } = useAccountInfo();

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [hasFollowedTwitter, setHasFollowedTwitter] = useState(false);
  const [authTwitterState, setAuthTwitterState] = useState("");
  const [authTwitterCode, setAuthTwitterCode] = useState("");

  const [hasFollowedDiscord, setHasFollowedDiscord] = useState(false);
  const [authDiscordState, setAuthDiscordState] = useState("");
  const [authDiscordCode, setAuthDiscordCode] = useState("");

  const { data: dataFollowingStatus, isLoading: loadingFollowingStatus } =
    useQuery({
      queryKey: ["queryFollowingStatus", address],
      queryFn: () => fetchFollowingStatus({ token }),
      enabled: !!token,
    });

  const mutationFollowTwitter = useMutation({
    mutationKey: ["followTwitter", address],
    mutationFn: () => fetchFollowTwitter(authTwitterState, authTwitterCode),
    onSuccess: ({ data }) => {
      const result = data?.following_result;
      setHasFollowedTwitter(result?.toLowerCase() === "success");
    },
  });

  const mutationFollowDiscord = useMutation({
    mutationKey: ["followDiscord", address],
    mutationFn: () => fetchFollowDiscord(authDiscordState, authDiscordCode),
    onSuccess: ({ data }) => {
      const result = data?.following_result;
      setHasFollowedDiscord(result?.toLowerCase() === "success");
    },
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

  const socialMediaList = [
    {
      id: "twitter",
      name: "Follow on X",
      link: "https://twitter.com/SonicSVM",
      description:
        "Follow @SonicSVM on X for the latest updates, project progress, and to stay informed about all the exciting developments and news.",
      buttonIcon: <Twitter width={20} height={20} />,
      buttonText: "Follow on X",
      handler: () => {
        if (hasFollowedTwitter) {
          return;
        }
        const { data } = dataFollowingStatus;
        const currentHref = `${process.env.NEXT_PUBLIC_DOMAIN}/task/meet-sonic?source=twitter`;
        const redirectUrl = data.twitter.url;
        const newUrl = redirectUrl.replace(
          /(redirect_uri=)[^&]+/,
          `$1${currentHref}`
        );
        window.location.href = newUrl;
      },
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
        const currentHref = `${process.env.NEXT_PUBLIC_DOMAIN}/task/meet-sonic?source=discord`;
        const redirectUrl = data.discord.url;
        const newUrl = redirectUrl.replace(
          /(redirect_uri=)[^&]+/,
          `$1${currentHref}`
        );
        window.location.href = newUrl;
      },
    },
  ];

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          <li className="">
            Click the corresponding social buttons. Complete the tasks by
            successfully linking your account.
          </li>
          <li className="">
            Automatically receive{" "}
            <span className="inline-flex items-center text-[#FBB042]">
              3 x <Gift color="#FBB042" className="mx-[2px]" /> Ring Monitor
            </span>{" "}
            after completing both the X account and Discord tasks.
          </li>
          <li className="">
            This is a one-time task and will not reset after completion.
          </li>
        </ul>
      </Card>

      {/* main */}
      <Card size={CardSize.Medium} className="mt-20">
        <ul className="list-disc text-[20px] font-normal leading-relaxed pl-6">
          {socialMediaList.map((socialMedia, socialMediaIndex) => (
            <li
              className={`flex flex-row items-center w-full ${
                socialMediaIndex > 0
                  ? "border-t-[1px] border-white/10 border-solid pt-10"
                  : "pb-10"
              }`}
              key={socialMediaIndex}
            >
              <div className="flex flex-col pr-20 border-r border-solid border-white/10">
                <h5 className="text-white font-orbitron">{socialMedia.name}</h5>
                <p className="w-[600px] text-[16px] text-white/50 font-normal mt-4">
                  {socialMedia.description}
                </p>
              </div>
              <Button
                className={`inline-flex justify-center items-center w-[177px] h-[48px] rounded gap-2 px-[16px] py-[10px] transition-colors duration-300 ml-20 ${
                  socialMedia.id === "twitter"
                    ? hasFollowedTwitter
                      ? "bg-[#888888] hover:bg-[#888888]"
                      : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                    : hasFollowedDiscord
                    ? "bg-[#888888] hover:bg-[#888888]"
                    : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                }`}
                onClick={() => {
                  if (!address || !token) {
                    onOpen();
                    return;
                  }
                  socialMedia.handler();
                }}
              >
                {socialMedia.buttonIcon}
                <span className="text-white font-orbitron text-[16px] font-semibold">
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
    </>
  );
}
