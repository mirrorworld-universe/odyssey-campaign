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
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  const handleOpenHowToPlayDialog = () => {
    openModalDirectly(MODAL_HASH_MAP.howToPlay);
    trackClick({ text: "How to play?" });
  };
  return (
    <div className="bg-black text-primary relative">
      <div className="max-w-view w-full mx-auto px-4 h-[300px] flex items-center relative z-10">
        {/* left part */}
        <div className="flex flex-col gap-4 max-w-[486px]">
          <div className="font-orbitron text-headline3">
            Odyssey Task Center
          </div>
          <p className="text-body3 text-tertary">
            Embark on your Odyssey by completing various tasks! Earn more rings
            along the way! If you have any questions, feel free to check out the
            <span
              className="text-link cursor-pointer"
              onClick={() => openModalDirectly(MODAL_HASH_MAP.faq)}
            >
              {` `}FAQs
            </span>
            .
          </p>
          <Button
            onClick={() => handleOpenHowToPlayDialog()}
            className="text-title3 font-orbitron mt-4 px-6 w-fit hidden md:block"
            variant={"outline"}
          >
            How to Play?
          </Button>
          <div className="fixed bottom-0 left-0 w-full p-4 z-20 bg-black md:hidden">
            <Button
              onClick={() => handleOpenHowToPlayDialog()}
              className="text-title3 font-orbitron px-6 w-full"
              variant={"outline"}
            >
              How to Play?
            </Button>
          </div>
        </div>
        <div className="h-full grow flex justify-end items-center">
          <Carousel
            className="flex justify-end w-[558px] h-[172px]"
            plugins={[Autoplay({ delay: 3000 })]}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center basis-full cursor-pointer group/banner"
                >
                  <div className="size-full relative">
                    <img
                      className="size-full"
                      src="/images/banner/banner-1.png"
                      alt=""
                    />
                    <Link
                      href={"/"}
                      className={cn(
                        "flex-center absolute inset-0 rounded border border-link z-10 bg-black/70",
                        "text-headline4 font-orbitron gap-1 group-hover/banner:opacity-100 opacity-0 transition-opacity duration-300"
                      )}
                    >
                      <PlayLogo />
                      Start Now
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPagination
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
              activeDotClassName="bg-primary"
            />
          </Carousel>
        </div>
      </div>
      {/* right part */}
      <div className="h-full absolute top-0 right-0 w-[912px] h-[300px] z-0">
        <img className="size-full" src="/images/banner/banner-bg.png" alt="" />
      </div>
    </div>
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
