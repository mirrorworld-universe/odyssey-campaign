import { NetworkId, networkMap } from "@/app/data/config";
import { useSwitchNetwork } from "@/app/hooks";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { useNetworkInfo } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Slider from "./Slider";

export default function Banner() {
  const { networkId } = useNetworkInfo();

  const [bgClassName, setBgClassName] = useState("");

  const { handleSwitchNetwork } = useSwitchNetwork();

  const isFrontierV1 = networkId === NetworkId.FrontierV1;

  const handleOnClick = () => {
    if (isFrontierV1) {
      openModalDirectly(MODAL_HASH_MAP.howToPlay);
      trackClick({ text: "How to play?" });
    } else {
      openModalDirectly(MODAL_HASH_MAP.seasonTwo);
    }
  };

  return (
    <div className="w-full bg-black relative">
      <div className="text-primary max-w-view w-full mx-auto px-4 h-[164px] md:h-[300px] flex flex-col md:flex-row justify-center md:justify-start md:items-center relative z-10">
        {/* left part */}
        <div className="flex flex-col gap-1.5 md:gap-4 max-w-[486px]">
          <div className="font-orbitron sonic-headline5 md:sonic-headline3">
            Odyssey Task Center
          </div>
          <p className="sonic-body3 text-primary">
            {isFrontierV1 ? (
              <>
                Embark on your Odyssey by completing various tasks! Earn more
                rings along the way! If you have any questions, feel free to
                check out the
                <span
                  className="text-link cursor-pointer"
                  onClick={() => openModalDirectly(MODAL_HASH_MAP.faq)}
                >
                  {` `}FAQs
                </span>
                .
              </>
            ) : (
              <>
                Season 1 on {networkMap[networkId]?.name} has officially ended!
                Switch over now to join the latest tasks on{" "}
                <span
                  onClick={() => handleSwitchNetwork(NetworkId.FrontierV1)}
                  className="text-link cursor-pointer hover:text-primary-blue"
                >
                  Frontier V1
                </span>
                !
              </>
            )}
          </p>
          {/* pc how to play button */}
          <Button
            onClick={handleOnClick}
            className="sonic-title3 font-orbitron mt-4 px-6 w-fit hidden md:block"
            variant={"outline"}
          >
            {isFrontierV1 ? "How to Play?" : "Season 2 Guides"}
          </Button>
        </div>
        {/* pc carousel */}
        <div className="h-full grow hidden md:flex justify-end items-center">
          <Slider setBgClassName={setBgClassName} />
        </div>
      </div>
      {/* mobile carousel */}
      <div
        className={cn("flex w-full relative z-20 md:hidden mix-blend-normal")}
      >
        <Slider setBgClassName={setBgClassName} />
      </div>
      {/* banner background */}
      <div
        className={cn(
          "h-[164px] md:h-full absolute top-0 right-0 md:max-w-[63%] w-full z-0",
          bgClassName
        )}
      />

      {/* mobile how to play button */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-20 bg-black md:hidden">
        <Button
          onClick={handleOnClick}
          className="sonic-title3 font-orbitron px-6 w-full"
          variant={"outline"}
        >
          {isFrontierV1 ? "How to Play?" : "Season 2 Guides"}
        </Button>
      </div>
    </div>
  );
}
