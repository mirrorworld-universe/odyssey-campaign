"use client";
import Link from "next/link";
import { Link as IconLink } from "@/app/icons/Link";
import { Play as IconPlay } from "@/app/icons/Play";
import { Card, CardSize } from "../Basic/Card";
import { trackLinkClick } from "@/lib/track";
import { UTCDate } from "@date-fns/utc";

export function GameVenture() {
  const games = [
    {
      name: "SnakeLite",
      cover: "/images/games/snakelite.jpg",
      guide:
        "https://mirrorworldfun.notion.site/SnakeLite-Odyssey-Game-and-Task-Guide-585d67b5d76348ba868d58a5d1acfa72?pvs=4",
      play: "https://t.me/Snakelite_official_bot",
      time: "2024-07-04T21:00:00+08:00",
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
    },
    // {
    //   name: "Biu",
    //   cover: "/images/games/c.jpg",
    //   guide: "",
    //   play: "",
    // },
    {
      name: "JOGO JOGO",
      cover: "/images/games/d.jpg",
      guide:
        "https://www.notion.so/mirrorworldfun/JOGOJOGO-Odyssey-Game-and-Task-Guide-f8b1e4d54bee4d318926964c9f87a4be",
      play: "https://app.jogojogo.game/register?code=SOSONIC",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="text-white font-orbitron font-semibold text-[64px]">
        Game Adventure
      </h1>

      {/* line */}
      <div className="w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Card name="Rules" size={CardSize.Medium} nameClassName="bg-[#000]">
          <ul className="list-decimal text-xl font-normal leading-relaxed pl-6">
            <li className="">
              Click any game below to download or try it out.
            </li>
            <li className="">
              Learn the game rules and reward distribution guidelines.
            </li>
            <li className="">Play these games to earn rewards.</li>
          </ul>
        </Card>

        {/* main */}
        <div className="w-full flex flex-row flex-wrap justify-between gap-10 mt-20">
          {games
            .filter(
              (game: any) => !game.time || new UTCDate() > new Date(game.time)
            )
            .map((game: any, gameIndex: number) => (
              <div
                key={gameIndex}
                className="group/game w-[492px] h-[263px] flex rounded-lg overflow-hidden relative"
              >
                <img
                  className="w-full h-full group-hover/game:scale-110 transition-transform duration-300"
                  src={game.cover}
                  alt=""
                />

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
                  <p className="flex flex-row justify-center gap-6 mt-5 translate-y-2 group-hover/game:translate-y-0 transition-transform duration-300">
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
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
