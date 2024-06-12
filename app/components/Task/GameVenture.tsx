"use client";
import Link from "next/link";
import { Gift } from "@/app/icons/Gift";
import { Card, CardSize } from "../Card";

export function GameVenture() {
  const games = [
    {
      name: "",
      cover: "/images/games/a.jpg",
    },
    {
      name: "",
      cover: "/images/games/b.jpg",
    },
    {
      name: "",
      cover: "/images/games/c.jpg",
    },
    {
      name: "",
      cover: "/images/games/d.jpg",
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
          <Link href="" className="">
            <img
              className="w-[492px] h-[263px] rounded-[8px] overflow-hidden"
              src={game.cover}
              alt=""
            />
          </Link>
        ))}
      </div>
    </>
  );
}
