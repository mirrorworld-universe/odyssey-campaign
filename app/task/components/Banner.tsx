import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination
} from "@/components/ui/carousel";
import { trackClick } from "@/lib/track";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useNetworkInfo, useWalletModal } from "@/app/store/account";
import { useSwitchNetwork } from "@/app/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { NetworkId } from "@/app/data/config";

export default function Banner() {
  const { networkId } = useNetworkInfo();

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
          <div className="font-orbitron text-headline5 md:text-headline3">
            Odyssey Task Center
          </div>
          <p className="text-title3 text-primary md:text-tertary">
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
                Season 1 on Origin has officially ended! Switch over now to join
                the latest tasks on{" "}
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
            className="text-title3 font-orbitron mt-4 px-6 w-fit hidden md:block"
            variant={"outline"}
          >
            {isFrontierV1 ? "How to Play?" : "Season 2 Guides"}
          </Button>
        </div>
        {/* pc carousel */}
        <div className="h-full grow hidden md:flex justify-end items-center">
          <Slider />
        </div>
      </div>
      {/* mobile carousel */}
      <div className={cn("flex w-full relative z-20 md:hidden")}>
        <Slider />
      </div>
      {/* banner background */}
      <div
        style={{
          backgroundImage: `url("/images/banner/banner-bg.png"), linear-gradient(83deg, rgba(0, 0, 0, 0.6) 11.45%, #25a3ed 128.94%)`,
          backgroundBlendMode: "overlay, normal"
        }}
        className="h-[164px] md:h-full absolute top-0 right-0 max-w-[912px] w-full z-0 bg-black bg-cover md:bg-contain bg-no-repeat"
      />

      {/* mobile how to play button */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-20 bg-black md:hidden">
        <Button
          onClick={handleOnClick}
          className="text-title3 font-orbitron px-6 w-full"
          variant={"outline"}
        >
          {isFrontierV1 ? "How to Play?" : "Season 2 Guides"}
        </Button>
      </div>
    </div>
  );
}

function Slider() {
  const { connected } = useWallet();
  const { onOpen: onOpenWalletModal } = useWalletModal();
  const { networkId, setSwitchTo } = useNetworkInfo();
  const router = useRouter();

  const slides = [
    {
      src: "/images/banner/banner-1.png",
      href: "/task/play-on-sonicx",
      handleClick: () => {
        setSwitchTo(NetworkId.FrontierV1);
        const isTestnetV1 = networkId === NetworkId.FrontierV1;

        if (!isTestnetV1) {
          openModalDirectly(MODAL_HASH_MAP.switchNetwork);
          return;
        }

        if (!connected) {
          onOpenWalletModal();
          return;
        }

        router.push("/task/play-on-sonicx");
      }
    }
  ];

  return (
    <Carousel
      style={{
        boxShadow: "0px 0px 12px 0px rgba(37, 163, 237, 0.80)"
      }}
      className={cn(
        "md:flex md:justify-end md:max-w-[558px] md:w-full rounded",
        slides.length > 1 ? "mb-16" : "mb-10"
      )}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="flex items-center basis-full cursor-pointer group/banner"
          >
            <div className="size-full relative border border-link rounded overflow-hidden">
              <img
                className="size-full transition-all duration-300 rounded group-hover/banner:scale-110"
                src={slide.src}
                alt=""
              />
              <div
                onClick={slide.handleClick}
                className={cn(
                  "flex-center absolute inset-0 rounded z-10 bg-black/70",
                  "text-headline4 font-orbitron gap-1 group-hover/banner:opacity-100 opacity-0 transition-opacity duration-300"
                )}
              >
                <PlayLogo />
                Start Now
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {slides.length > 1 && (
        <CarouselPagination
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
          activeDotClassName="bg-primary"
        />
      )}
    </Carousel>
  );
}

function PlayLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
    >
      <path
        d="M13.0996 31.2008V8.80078L30.6996 20.0008L13.0996 31.2008ZM16.2996 25.3608L24.6996 20.0008L16.2996 14.6408V25.3608Z"
        fill="white"
      />
    </svg>
  );
}
