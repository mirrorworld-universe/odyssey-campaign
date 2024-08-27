"use client";
import Link from "next/link";
import { Link as IconLink } from "@/app/icons/Link";
import { Play as IconPlay } from "@/app/icons/Play";
import { Hour as IconHour } from "@/app/icons/Hour";
import { Card, CardSize } from "../Basic/Card";
import { trackLinkClick } from "@/lib/track";
import { UTCDate } from "@date-fns/utc";
import { Rules } from "./Rules";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNetworkInfo } from "@/app/store/account";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, isMobileViewport } from "@/lib/utils";
import { Close } from "@/app/icons/Close";

export function GameVenture() {
  const { networkId } = useNetworkInfo();
  const games: any = {
    devnet: [
      {
        name: "SnakeLite",
        cover: "/images/games/snakelite.jpg",
        guide:
          "https://mirrorworldfun.notion.site/SnakeLite-Odyssey-Game-and-Task-Guide-585d67b5d76348ba868d58a5d1acfa72?pvs=4",
        play: "https://t.me/Snakelite_official_bot",
        time: "2024-07-04T21:00:00+08:00",
        available: true,
      },
      // {
      //   name: "Lumittera",
      //   cover: "/images/games/a.jpg",
      //   guide: "",
      //   play: "",
      // },
      {
        name: "FoMoney",
        cover: "/images/games/b.jpg",
        guide:
          "https://fomoney.gitbook.io/fomoney-litepaper/how-to-play-fomoney-to-earn-1-million-usdsonic-rings-via-odyssey-campaign",
        play: "https://fomoney-sonic.io/",
        time: "2024-06-27T21:00:00+08:00",
        available: true,
      },
      {
        name: "JOGO JOGO",
        cover: "/images/games/jogo.jpg",
        guide:
          "https://mirrorworldfun.notion.site/JOGOJOGO-Odyssey-Game-and-Task-Guide-f8b1e4d54bee4d318926964c9f87a4be",
        play: "https://app.jogojogo.game/register?code=SOSONIC",
        time: "2024-07-30T21:00:00+08:00",
        available: true,
      },
      {
        name: "Startup",
        cover: "/images/games/startup.png",
        guide: "https://playstartup.io/guide",
        play: "https://playstartup.io/",
        time: "2024-08-23T18:00:00+08:00",
        available: true,
      },
    ],

    testnet: [
      {
        name: "SnakeLite",
        cover: "/images/games/snakelite.jpg",
        guide:
          "https://mirrorworldfun.notion.site/SnakeLite-Odyssey-Game-and-Task-Guide-585d67b5d76348ba868d58a5d1acfa72?pvs=4",
        play: "https://t.me/Snakelite_official_bot",
        time: "2024-08-08T21:00:00+08:00",
        available: true,
      },
      {
        name: "JOGO JOGO",
        cover: "/images/games/jogo.jpg",
        guide:
          "https://mirrorworldfun.notion.site/JOGOJOGO-Odyssey-Game-and-Task-Guide-f8b1e4d54bee4d318926964c9f87a4be",
        play: "https://app.jogojogo.game/register?code=SOSONIC",
        time: "2024-07-30T21:00:00+08:00",
        available: true,
      },
      {
        name: "Zeebit",
        cover: "/images/games/zeebit.png",
        guide: "https://zeebit.gitbook.io/zeebit-sonic",
        play: "https://dev.zeebit.io/",
        time: "2024-08-27T18:00:00+08:00",
        available: true,
      },
    ],
  };

  const [showRules, setShowRules] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [currentGameDetail, setCurrentGameDetail] = useState<any>(null);

  const handleClickGameBlock = () => {
    return false;
  };

  const handleCloseGameDetail = () => {
    setIsOpenDetail(false);
  };

  const handleClickGameDetail = (game: any) => {
    if (!isMobileViewport()) {
      return;
    }
    setCurrentGameDetail(game);
    setIsOpenDetail(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Game Adventure
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="pb-[88px] md:pb-0">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-decimal font-normal pl-6">
            <li className="">
              Click any game below to download or try it out.
            </li>
            <li className="">
              Learn the game rules and reward distribution guidelines.
            </li>
            <li className="">Play these games to earn rewards.</li>
          </ul>
        </Rules>

        {/* main */}
        <div className="w-full max-w-[1024px] flex flex-row flex-wrap justify-between gap-8 md:gap-10 md:mt-20">
          {games[networkId || "devnet"]
            .filter(
              (game: any) => !game.time || new UTCDate() > new Date(game.time)
            )
            .map((game: any, gameIndex: number) => (
              <div
                key={gameIndex}
                className="group/game w-full md:max-w-[492px] h-auto md:max-h-[263px] flex rounded-lg overflow-hidden relative"
                onClick={() => handleClickGameDetail(game)}
              >
                <AspectRatio ratio={492 / 263} key={gameIndex} className="">
                  <img
                    className="w-full h-full md:group-hover/game:scale-110 transition-transform duration-300"
                    src={game.cover}
                    alt=""
                  />

                  {!isMobileViewport() ? (
                    <div className="w-full bg-[#0000FF]/80 absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover/game:opacity-100 transition-opacity duration-300">
                      <img
                        className="absolute top-0 bottom-0 -left-2 m-auto group-hover/game:left-4 transition-all duration-300"
                        src="/images/icons/arrow-polygon.svg"
                        alt=""
                      />
                      <img
                        className="absolute top-0 bottom-0 -right-2 m-auto group-hover/game:right-4 transition-all duration-300 rotate-180"
                        src="/images/icons/arrow-polygon.svg"
                        alt=""
                      />
                      <h6 className="text-white text-5xl font-bold font-orbitron text-center mt-20 translate-y-2 group-hover/game:translate-y-0 transition-transform duration-300">
                        {game.name}
                      </h6>
                      <p
                        className="flex flex-row justify-center gap-6 mt-5 translate-y-2 group-hover/game:translate-y-0 transition-transform duration-300"
                        onClick={handleClickGameBlock}
                      >
                        {!game.available ? (
                          <span className="h-8 inline-flex flex-row items-center gap-1">
                            <IconHour width={32} height={32} color="white" />
                            <span className="text-white  text-xl font-semibold font-orbitron">
                              Coming soon...
                            </span>
                          </span>
                        ) : (
                          <>
                            <a
                              className="group/link h-8 inline-flex flex-row items-center gap-1"
                              href={game.guide}
                              target="_blank"
                              onClick={trackLinkClick}
                            >
                              <span className="inline-flex w-8 h-8 relative">
                                <IconLink
                                  width={32}
                                  height={32}
                                  color="#25A3ED"
                                  className="absolute"
                                />
                                <IconLink
                                  width={32}
                                  height={32}
                                  color="white"
                                  className="absolute group-hover/link:opacity-0 transition-opacity"
                                />
                              </span>
                              <span className="text-white group-hover/link:text-[#25A3ED] text-xl font-semibold font-orbitron transition-colors">
                                Guide
                              </span>
                            </a>
                            <a
                              className="group/link h-8 inline-flex flex-row items-center gap-1"
                              href={game.play}
                              target="_blank"
                              onClick={trackLinkClick}
                            >
                              <span className="inline-flex w-8 h-8 relative">
                                <IconPlay
                                  width={32}
                                  height={32}
                                  color="#25A3ED"
                                  className="absolute"
                                />
                                <IconPlay
                                  width={32}
                                  height={32}
                                  color="white"
                                  className="absolute group-hover/link:opacity-0 transition-opacity"
                                />
                              </span>
                              <span className="text-white group-hover/link:text-[#25A3ED] text-xl font-semibold font-orbitron transition-colors">
                                Play
                              </span>
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  ) : null}
                </AspectRatio>
              </div>
            ))}
        </div>
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

      {/* shadow */}
      {isOpenDetail && (
        <div
          className={cn(
            "flex bg-black/80 fixed z-20 top-0 bottom-0 right-0 left-0 transition-opacity duration-300"
          )}
          onClick={handleCloseGameDetail}
        ></div>
      )}

      {/* mobile game details */}
      <div
        className={cn(
          "flex md:hidden z-30 flex-col fixed bottom-0 right-0 left-0 m-auto bg-[#111] pt-0 pb-5 px-5 transition-transform duration-300 rounded-xl",
          isOpenDetail || !isMobileViewport()
            ? "translate-y-0"
            : "translate-y-full"
        )}
      >
        <p className="flex justify-between items-center py-4">
          <span className="text-white/50 text-sm font-orbitron font-semibold">
            {currentGameDetail?.name}
          </span>
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={handleCloseGameDetail}
          >
            <Close color="rgba(255, 255, 255, .5)" className="w-6 h-6" />
          </span>
        </p>

        <div className="flex flex-row gap-3 py-6">
          {currentGameDetail?.available ? (
            <>
              <a
                className="inline-flex flex-row justify-center items-center gap-1 rounded w-1/2 h-12 border border-solid border-white/40 bg-transparent"
                href={currentGameDetail.guide}
                target="_blank"
              >
                <IconLink width={24} height={24} color="white" />
                <span className="text-white text-base font-bold font-orbitron">
                  Guide
                </span>
              </a>
              <a
                className="inline-flex flex-row justify-center items-center gap-1 rounded w-1/2 h-12 text-white text-base font-semibold font-orbitron transition-colors duration-300 
              bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                href={currentGameDetail.play}
                target="_blank"
              >
                <IconPlay width={24} height={24} color="white" />
                <span className="text-white text-base font-bold font-orbitron">
                  Play
                </span>
              </a>
            </>
          ) : (
            <Button
              className="inline-flex flex-row justify-center items-center gap-1 rounded w-full h-12 text-white text-base font-semibold font-orbitron transition-colors duration-300 
              bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
              disabled
            >
              <IconHour width={24} height={24} color="white" />
              <span className="text-white text-base font-bold font-orbitron">
                Coming Soon...
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
