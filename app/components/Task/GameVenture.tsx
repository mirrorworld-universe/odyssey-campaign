"use client";
import Link from "next/link";
import { Link as IconLink } from "@/app/icons/Link";
import { Play as IconPlay } from "@/app/icons/Play";
import { Card, CardSize } from "../Card";

export function GameVenture() {
  const games = [
    {
      name: "",
      cover: "/images/games/a.jpg",
      guide: "",
      play: "",
    },
    {
      name: "",
      cover: "/images/games/b.jpg",
      guide: "",
      play: "",
    },
    {
      name: "",
      cover: "/images/games/c.jpg",
      guide: "",
      play: "",
    },
    {
      name: "",
      cover: "/images/games/d.jpg",
      guide: "",
      play: "",
    },
  ];

  return (
    <>
      {/* rules */}
      <Card name="Rules" size={CardSize.Medium} className="">
        <ul className="list-decimal text-[20px] font-normal leading-relaxed pl-6">
          <li className="">lick any game below to download or try it out.</li>
          <li className="">
            Learn the game rules and reward distribution guidelines.
          </li>
          <li className="">Play these games to earn rewards.</li>
        </ul>
      </Card>

      {/* main */}
      <div className="w-full flex flex-row flex-wrap justify-between gap-10 mt-20">
        {games.map((game) => (
          <div className="w-[492px] h-[263px] flex relative">
            <img
              className="w-full h-full rounded-[8px] overflow-hidden"
              src={game.cover}
              alt=""
            />
            <p className="w-full flex flex-row justify-center gap-6 absolute top-[140px] left-0 right-0 bottom-0">
              <a
                className="group h-8 inline-flex flex-row items-center gap-1"
                href={game.guide}
                target="_blank"
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
                    className="absolute group-hover:opacity-0 transition-opacity"
                  />
                </span>
                <span className="text-white group-hover:text-[#25A3ED] text-[20px] font-semibold font-orbitron transition-colors">
                  Guide
                </span>
              </a>
              <a
                className="group h-8 inline-flex flex-row items-center gap-1"
                href={game.play}
                target="_blank"
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
                    className="absolute group-hover:opacity-0 transition-opacity"
                  />
                </span>
                <span className="text-white group-hover:text-[#25A3ED] text-[20px] font-semibold font-orbitron transition-colors">
                  Play
                </span>
              </a>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
