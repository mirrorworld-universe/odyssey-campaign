import { NetworkId } from "@/app/data/config";
import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";
import { useNetworkInfo, useWalletModal } from "@/app/store/account";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPagination
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Slider({
  setBgClassName
}: {
  setBgClassName: (className: string) => void;
}) {
  const { connected } = useWallet();
  const { onOpen: onOpenWalletModal } = useWalletModal();
  const { networkId, setSwitchTo } = useNetworkInfo();
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      const selectedSlide = api.selectedScrollSnap();
      const carouselElement = api.rootNode();
      if (carouselElement.parentElement) {
        carouselElement.parentElement.style.boxShadow =
          slides[selectedSlide].boxShadow;
      }
      setBgClassName(slides[selectedSlide].bgClassName);
    };
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const slides = [
    {
      src: "/images/banner/banner-1.png",
      boxShadow: "0px 0px 12px 0px #A315FF",
      borderColor: "#9B00FF",
      bgClassName: "banner-bg-1",
      handleClick: () => {
        window.open(
          "https://www.bybit.com/en/web3/airdrop/activity?activityId=250",
          "_blank"
        );
      }
    },
    {
      src: "/images/banner/banner-0.png",
      borderColor: "#25A3ED",
      bgClassName: "banner-bg-0",
      boxShadow: "0px 0px 12px 0px rgba(37, 163, 237, 0.80)",
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
      setApi={(api) => setApi(api)}
      style={{
        boxShadow: slides[0].boxShadow
      }}
      opts={{
        loop: true,
        dragFree: false
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: false
        })
      ]}
      className={cn(
        "md:flex md:justify-end md:max-w-[558px] md:w-full rounded md:mb-0",
        slides.length > 1 ? "mb-16" : "mb-10"
      )}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            className="flex items-center basis-full cursor-pointer group/banner"
          >
            <div
              className="size-full relative border-t md:border md:rounded overflow-hidden"
              style={{ borderColor: slide.borderColor }}
            >
              <img
                className="size-full transition-all duration-300 group-hover/banner:scale-110"
                src={slide.src}
                alt=""
              />
              <div
                onClick={slide.handleClick}
                className={cn(
                  "flex-center absolute inset-0 rounded z-10 bg-bg-mask/80",
                  "sonic-headline4 font-orbitron gap-1 group-hover/banner:opacity-100 opacity-0 transition-opacity duration-300"
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
