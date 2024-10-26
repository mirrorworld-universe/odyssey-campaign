"use client";

import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { loadHomePageStatics, openWalletStatics } from "@/lib/analytics";
import { http } from "@/lib/http";
import { trackClick } from "@/lib/track";
import { useAccountInfo, useSystemInfo, useWalletModal } from "./store/account";

export default function Home() {
  const router = useRouter();
  const { connected } = useWallet();
  const { address, token } = useAccountInfo();
  const { onOpen } = useWalletModal();
  const { isInMaintenance, setInMaintenance } = useSystemInfo();
  const searchParams = useSearchParams();

  const mutationInvitation = useMutation({
    mutationKey: ["invitation", address],
    mutationFn: (code: string) =>
      http.post("/user/referral", {
        invitation_code: code
      })
  });

  useEffect(() => {
    loadHomePageStatics();
  }, []);

  useEffect(() => {
    if (token) {
      const join = searchParams.get("join");
      if (join) {
        mutationInvitation.mutate(join);
      }
    }
  }, [token]);

  const handleGetStarted = () => {
    if (isInMaintenance) {
      return;
    }

    if (!connected) {
      onOpen();
    } else {
      router.push("/task");
    }
    // ttq
    openWalletStatics();
    // ga4
    trackClick({ text: "Get Started" });
  };

  return (
    <main className="grow flex flex-col text-primary">
      <div className="max-w-view px-4 w-full mx-auto flex flex-col justify-center items-center gap-6 grow">
        <div className="flex gap-3 md:gap-4 justify-center items-center mt-auto md:mt-0">
          <img
            className="h-11 w-[156px] md:w-auto object-contain md:h-12"
            src="/images/odyssey.png"
            alt=""
          />
          <h2 className="text-headline2 md:text-headline0 font-orbitron">
            Season 2
          </h2>
        </div>

        <p className="text-body3 md:text-headline5 max-w-[707px] text-center">
          Jump into Sonic Odyssey Season 2! More games and products are coming
          soon to supercharge your ring rewards!
        </p>
        <Button
          className="text-title2 font-orbitron w-full md:w-[230px] md:mt-4 mb-4 mt-auto mx-auto"
          size={"lg"}
          variant={"primary"}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </div>
    </main>
  );
}
