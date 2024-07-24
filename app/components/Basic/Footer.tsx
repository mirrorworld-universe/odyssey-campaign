"use client";
import Link from "next/link";
import { menu } from "./Header";
import { Twitter } from "../../icons/Twitter";
import { Discord } from "../../icons/Discord";
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
    <footer className="flex flex-col items-center justify-center gap-4 sm:gap-8 bg-sonic-nav w-full sm:!py-14 lg:!py-24 px-4 sm:p-0 relative overflow-hidden pb-[88px] md:pb-0">
      <img
        src="/images/fingerprint.png"
        alt=""
        className="w-[1610px] h-[1638px] absolute -bottom-80 -right-80"
      />

      <div className="w-full flex flex-col max-w-[1464px] mx-auto relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-14 w-full">
          <div className="flex space-x-3 justify-start items-center">
            <Link href="/" className="inline-flex flex-row items-center gap-2">
              <img
                alt="Sonic Logo"
                className="w-6 md:w-10 h-auto"
                src="/sonic.png"
              />
              <span className="hidden md:inline text-white text-[22px] font-bold font-orbitron tracking-widest">
                SONIC
              </span>
            </Link>
            <a
              className="text-white text-sm font-semibold font-orbitron border-l border-solid border-[#8F8F8F] h-[21px] ml-4 pl-4 hover:underline"
              href="https://www.sonic.game/"
              target="_blank"
            >
              www.sonic.game
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:ml-auto sm:w-fit">
            <div className="text-sonic-disabled text-[10px] font-sub block sm:hidden">
              Links
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-6 font-sans">
              {menu.map((menuItem, menuIndex) => (
                <Link
                  className="text-base gap-12 text-white/60 hover:text-white font-semibold font-orbitron transition-colors"
                  href={menuItem.link[networkId || "devnet"]}
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
                  className="flex justify-center items-center opacity-100 hover:opacity-80 outline-none focus:outline-none text-white bg-white/20 rounded-md p-2 transition-opacity"
                >
                  {media.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            className="w-full flex flex-col gap-2 sm:gap-2 items-center sm:hidden"
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

            <p className="font-sub text-sonic-disabled text-xs">
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
              <a
                className="text-white/60 font-semibold h-[11px] ml-4 pl-4 hover:underline"
                href="/terms-of-use"
                target="_blank"
              >
                Terms of Use
              </a>
              <a
                className="text-white/60 font-semibold h-[11px] ml-4 pl-4 hover:underline"
                href="/private-policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Desktop Copyright */}
        <div
          data-desktop-copyright
          className="w-full flex flex-col items-center hidden sm:flex"
        >
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
