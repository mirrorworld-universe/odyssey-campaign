"use client";
import Link from "next/link";
import { menu } from "./Header";

import { Twitter } from "@/app/icons/Twitter";
import { Discord } from "@/app/icons/Discord";

import { trackClick } from "@/lib/track";
import { useNetworkInfo } from "@/app/store/account";
import SonicLogo from "./SonicLogo";
import { cn } from "@/lib/utils";

const socialMedias = [
  {
    name: "twitter",
    link: "https://x.com/SonicSVM",
    icon: <Twitter width={24} height={24} color="white" />,
    handler: () => {
      trackClick({ text: "Follow on X" });
    }
  },
  {
    name: "discord",
    link: "https://discord.com/invite/joinmirrorworld",
    icon: <Discord width={24} height={24} color="white" />,
    handler: () => {
      trackClick({ text: "Join DC" });
    }
  }
];

export function Footer() {
  return (
    <div className="max-w-view w-full mx-auto pt-20 px-4 md:pt-12 pb-20 lg:pb-6 text-primary">
      <PcFooter />
      <MobileFooter />
    </div>
  );
}

function MobileFooter() {
  const year = new Date().getFullYear();
  const { networkId } = useNetworkInfo();
  return (
    <div className="flex flex-col gap-14 md:hidden">
      <div className="flex items-center gap-3">
        <SonicLogo />
        <div className="w-px h-5 bg-line"></div>
        <a
          className="sonic-title3 font-orbitron"
          href="https://www.sonic.game"
          target="_blank"
        >
          WWW.SONIC.GAME
        </a>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-ten font-medium text-[#717171]">Links</div>
        <div className="flex flex-col gap-4">
          {menu.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <Link
                className="sonic-title3/[1.2] font-orbitron text-primary"
                href={item.getLink(networkId)}
                key={index}
                target={item.target}
              >
                {item.name}
              </Link>
              <ArrowLogo />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-ten font-medium text-[#717171]">Socials</div>
        <div className="flex items-center gap-3">
          {socialMedias.map((item, index) => (
            <Link
              className="size-10 rounded-md bg-white/20 flex justify-center items-center"
              href={item.link}
              key={index}
              onClick={item.handler}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20 pt-8 flex items-center gap-2 sonic-body4 text-tertary">
        <p>© Copyright {year} Sonic</p>
        <div className="w-px h-2.5 bg-line" />
        <Link href={"/terms-of-use"}>Term of Use</Link>
        <div className="w-px h-2.5 bg-line" />
        <Link href={"/private-policy"}>Privacy Policy</Link>
      </div>
    </div>
  );
}

function PcFooter() {
  const year = new Date().getFullYear();
  const { networkId } = useNetworkInfo();
  return (
    <div className="hidden md:flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <SonicLogo />
          <div className="w-px h-5 bg-line"></div>
          <a
            className="sonic-title3 font-orbitron"
            href="https://www.sonic.game"
            target="_blank"
          >
            WWW.SONIC.GAME
          </a>
        </div>
        <div className="flex items-center gap-10">
          {menu.map((item, index) => (
            <Link
              className="sonic-title3 font-orbitron text-tertary hover:text-primary transition-colors"
              href={item.getLink(networkId)}
              key={index}
              target={item.target}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-line" />

      <div className="flex justify-between items-center">
        <div className={cn("flex items-center gap-4 sonic-body2 text-tertary")}>
          <p>© Copyright {year} Sonic</p>
          <div className="w-px h-2.5 bg-line" />
          <Link
            href={"/terms-of-use"}
            className="hover:text-primary transition-colors"
          >
            Term of Use
          </Link>
          <div className="w-px h-2.5 bg-line" />
          <Link
            href={"/private-policy"}
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {socialMedias.map((item, index) => (
            <Link
              className="size-10 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/40 transition-colors"
              href={item.link}
              key={index}
              onClick={item.handler}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArrowLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <mask
        id="mask0_569_29568"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_569_29568)">
        <path
          d="M14.501 18L13.101 16.55L16.651 13H4.50098V11H16.651L13.101 7.45L14.501 6L20.501 12L14.501 18Z"
          fill="#717171"
        />
      </g>
    </svg>
  );
}
