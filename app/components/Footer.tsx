"use client";
import Link from "next/link";
import { menu } from "./Header";
import { Twitter } from "../icons/Twitter";
import { Discord } from "../icons/Discord";

export function Footer() {
  const year = new Date().getFullYear();

  const copyright = `©Copyright ${year} Sonic`;

  const socialMedias = [
    {
      name: "twitter",
      link: "https://x.com/SonicSVM",
      icon: <Twitter width={24} height={24} color="white" />,
    },
    {
      name: "discord",
      link: "https://discord.com/invite/joinmirrorworld",
      icon: <Discord width={24} height={24} color="white" />,
    },
  ];

  return (
    <footer className="flex flex-col items-center justify-center gap-4 sm:gap-8 bg-sonic-nav w-full sm:!py-14 !py-20 px-4 sm:p-0">
      <div className="w-full flex flex-col sm:gap-5 max-w-[1464px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-14 w-full">
          <div className="flex space-x-3 justify-start items-center">
            <Link href="/">
              <img
                alt="Sonic Logo"
                className="w-[168px] h-auto"
                src="/sonic.png"
                style={{
                  aspectRatio: "100/40",
                  objectFit: "contain",
                }}
                width="100"
              />
            </Link>
            <p className="text-white text-[14px] font-semibold font-orbitron border-l border-solid border-[#8F8F8F] h-[21px] ml-4 pl-4">
              www.sonic.org
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:ml-auto sm:w-fit">
            <div className="text-sonic-disabled text-[10px] font-sub block sm:hidden">
              Links
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-6 font-sans">
              {menu.map((menuItem, menuIndex) => (
                <Link
                  className="text-[16px] gap-12 text-white/60 hover:text-white font-semibold font-orbitron transition-colors"
                  href={menuItem.link}
                  key={menuIndex}
                  target={menuItem.target}
                >
                  {menuItem.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Commnuity */}
          <div className="flex flex-col sm:hidden gap-3 w-full">
            <div className="text-sonic-disabled text-[10px] font-sub block sm:hidden">
              Community
            </div>
            <div className="flex gap-4 items-center justify-start">
              {socialMedias.map((media: any, mediaIndex: number) => (
                <a
                  key={mediaIndex}
                  href={media.link}
                  target="_blank"
                  className="flex justify-center items-center opacity-100 hover:opacity-80 outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2 transition-opacity"
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            className="w-full flex flex-col gap-4 sm:gap-4 items-center sm:hidden"
            data-mobile-copyright
          >
            <div className="relative w-full">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-white/20" />
              </div>
            </div>

            <p className="font-sub text-sonic-disabled text-xs">{copyright}</p>
          </div>
        </div>

        {/* Desktop Copyright */}
        <div
          data-desktop-copyright
          className="w-full flex flex-col gap-4 sm:gap-4 items-center hidden sm:flex"
        >
          <div className="relative w-full pb-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-white/20" />
            </div>
          </div>

          <div className="font-sub text-sonic-disabled text-xs flex justify-between items-center w-full">
            <p className="text-[#8F8F8F] opacity-60">{copyright}</p>

            {/* Desktop Socials */}
            <div className="flex gap-4 items-center justify-start">
              {socialMedias.map((media: any, mediaIndex: number) => (
                <a
                  key={mediaIndex}
                  href={media.link}
                  target="_blank"
                  className="flex justify-center items-center opacity-100 hover:opacity-80 outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2 transition-opacity"
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
