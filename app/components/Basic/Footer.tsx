"use client";
import Link from "next/link";
import { menu } from "./Header";

import { Twitter } from "@/app/icons/Twitter";
import { Discord } from "@/app/icons/Discord";
import { Go as IconGo } from "@/app/icons/Go";

import { trackClick } from "@/lib/track";
import { useNetworkInfo } from "@/app/store/account";

export function Footer() {
  const year = new Date().getFullYear();
  const { networkId } = useNetworkInfo();

  const socialMedias = [
    {
      name: "twitter",
      link: "https://x.com/SonicSVM",
      icon: <Twitter width={24} height={24} color="white" />,
      handler: () => {
        trackClick({ text: "Follow on X" });
      },
    },
    {
      name: "discord",
      link: "https://discord.com/invite/joinmirrorworld",
      icon: <Discord width={24} height={24} color="white" />,
      handler: () => {
        trackClick({ text: "Join DC" });
      },
    },
  ];

  return (
    <footer className="flex flex-col items-center justify-center gap-4 md:gap-8 bg-sonic-nav w-full md:!py-14 lg:!py-24 px-4 md:p-0 relative overflow-hidden pb-[88px] md:pb-0 mt-[72px] md:mt-0">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -bottom-80 -right-80"
      />

      <div className="w-full flex flex-col max-w-[1464px] mx-auto relative">
        {/* Mobile version Copyright */}
        <div className="flex md:hidden flex-col md:flex-row md:justify-between md:items-center gap-14 w-full">
          <div className="flex space-x-3 justify-start items-center">
            <Link href="/" className="inline-flex flex-row items-center gap-2">
              <img
                alt="Sonic Logo"
                className="w-6 md:w-10 h-auto"
                src="/sonic.png"
              />
              <span className="text-white text-base font-bold font-orbitron tracking-widest">
                SONIC
              </span>
            </Link>
            <a
              className="text-white text-sm font-semibold font-orbitron border-l border-solid border-white/30 h-[21px] ml-4 pl-4 hover:underline"
              href="https://www.sonic.game/"
              target="_blank"
            >
              www.sonic.game
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:ml-auto md:w-fit">
            <div className="text-[10px] text-[#717171]">Links</div>
            <div className="flex flex-col gap-6">
              {menu.map((menuItem, menuIndex) => (
                <Link
                  className="flex justify-between"
                  href={menuItem.link[networkId || "devnet"]}
                  target={menuItem.target}
                  key={menuIndex}
                >
                  <span className="text-base gap-12 text-white font-semibold font-orbitron transition-colors">
                    {menuItem.name}
                  </span>
                  <IconGo
                    width={24}
                    height={24}
                    color="#717171"
                    className="inline-block"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Commnuity */}
          <div className="flex flex-col gap-3 w-full">
            <div className="text-[10px] text-[#717171]">Community</div>
            <div className="flex gap-4 items-center justify-start">
              {socialMedias.map((media: any, mediaIndex: number) => (
                <a
                  key={mediaIndex}
                  href={media.link}
                  target="_blank"
                  className="flex justify-center items-center opacity-100 hover:opacity-80 outline-none focus:outline-none text-white bg-white/20 rounded-md p-2 transition-opacity"
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            className="w-full flex flex-col gap-8 items-center md:hidden pb-6"
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

            <p className="w-full flex flex-row items-center justify-start gap-2 font-sub text-xs opacity-60">
              <span className="text-white/60">
                <a
                  className="hover:underline"
                  href="/copyright-policy"
                  target="_blank"
                >
                  © Copyright
                </a>{" "}
                {year} Sonic
              </span>
              <i className="w-[1px] h-[9px] border-l border-white/20"></i>
              <a
                className="text-white/60 font-semibold hover:underline"
                href="/terms-of-use"
                target="_blank"
              >
                Terms of Use
              </a>
              <i className="w-[1px] h-[9px] border-l border-white/20"></i>
              <a
                className="text-white/60 font-semibold hover:underline"
                href="/private-policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Desktop version Copyright */}
        <div
          data-desktop-copyright
          className="w-full hidden md:flex flex-col items-center"
        >
          <div className="w-full flex justify-between items-center">
            {/* logo */}
            <div className="flex space-x-3 justify-start items-center">
              <Link href="/" className="inline-flex flex-row items-center gap-">
                <img
                  alt="Sonic Logo"
                  className="w-6 md:w-10 h-auto"
                  src="/sonic.png"
                />
                <span className="text-white text-[28px] font-bold font-orbitron tracking-widest">
                  SONIC
                </span>
              </Link>
              <a
                className="text-white text-sm font-semibold font-orbitron border-l border-solid border-[#27282D] h-[21px] ml-4 pl-4 hover:underline"
                href="https://www.sonic.game/"
                target="_blank"
              >
                www.sonic.game
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:ml-auto md:w-fit">
              <div className="flex flex-row gap-10">
                {menu.map((menuItem, menuIndex) => (
                  <Link
                    className="flex justify-between"
                    href={menuItem.link[networkId || "devnet"]}
                    target={menuItem.target}
                    key={menuIndex}
                  >
                    <span className="text-base gap-12 text-[#666666] font-semibold font-orbitron transition-colors">
                      {menuItem.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full py-10">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-white/20" />
            </div>
          </div>

          <div className="font-sub text-sonic-disabled text-xs flex justify-between items-center w-full">
            <p className="flex flex-row items-center gap-4 text-[#8F8F8F] opacity-60">
              <span className="text-white/60 text-sm">
                <a
                  className="hover:underline"
                  href="/copyright-policy"
                  target="_blank"
                >
                  © Copyright
                </a>{" "}
                {year} Sonic
              </span>
              <i className="inline-block w-[1px] h-[11px] bg-white/20"></i>
              <a
                className="text-white/60 text-sm font-semibold hover:underline"
                href="/terms-of-use"
                target="_blank"
              >
                Terms of Use
              </a>
              <i className="inline-block w-[1px] h-[11px] bg-white/20"></i>
              <a
                className="text-white/60 text-sm font-semibold hover:underline"
                href="/private-policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </p>

            {/* Desktop Socials */}
            <div className="flex gap-4 items-center justify-start">
              {socialMedias.map((media: any, mediaIndex: number) => (
                <a
                  onClick={media.handler}
                  key={mediaIndex}
                  href={media.link}
                  target="_blank"
                  className="flex justify-center items-center opacity-100 hover:opacity-80 outline-none focus:outline-none text-white bg-white/20 rounded-md p-2 transition-opacity"
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
