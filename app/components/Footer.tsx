import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  const copyright = `©Copyright ${year} Sonic`;

  return (
    <footer className="flex flex-col items-center justify-center gap-4 sm:gap-8 bg-sonic-nav w-full sm:!py-14 !py-20 px-4 sm:p-0">
      <div className="w-full flex flex-col sm:gap-5 max-w-[1464px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-14 w-full">
          <div className="flex space-x-3 justify-start items-center">
            {/* <MoleculesLogo /> */}
            <div className="w-[1px] h-5 bg-sonic-disabled"></div>
            <p className="sm">www.sonic.org</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:ml-auto sm:w-fit">
            <div className="text-sonic-disabled text-[10px] font-sub block sm:hidden">
              Links
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 sm:space-y-0 space-y-6 font-sans">
              <Link
                href="/"
                className="outline-none focus:outline-none text-white hover:text-white/50 flex justify-between sm:justify-start uppercase font-semibold text-sm"
              >
                {/* Buy Sonic Nodes */}
                {/* <IconsArrowRight className="block text-sonic-disabled sm:hidden w-6 h-6" /> */}
              </Link>
              <Link
                href="/"
                className="outline-none focus:outline-none text-white hover:text-white/50 flex justify-between sm:justify-start uppercase font-semibold text-sm"
              >
                {/* About Sonic Nodes */}
                {/* <IconsArrowRight className="block text-sonic-disabled sm:hidden w-6 h-6" /> */}
              </Link>
            </div>
          </div>

          {/* Commnuity */}
          <div className="flex flex-col sm:hidden gap-3 w-full">
            <div className="text-sonic-disabled text-[10px] font-sub block sm:hidden">
              Community
            </div>
            <div className="flex gap-4 items-center justify-start">
              {/* X */}
              <a
                href="https://x.com/SonicSVM"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsX className="w-6 h-6" /> */}
              </a>
              {/* Discord */}
              <a
                href="https://discord.com/invite/joinmirrorworld"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsDiscord className="w-6 h-6" /> */}
              </a>
              {/* Medium */}
              <a
                href="https://mirrorworld.medium.com/"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsMedium className="w-6 h-6" /> */}
              </a>
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
              {/* X */}
              <a
                href="https://x.com/SonicSVM"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsX className="w-6 h-6" /> */}
              </a>
              {/* Discord */}
              <a
                href="https://discord.com/invite/joinmirrorworld"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsDiscord className="w-6 h-6" /> */}
              </a>
              {/* Medium */}
              <a
                href="https://mirrorworld.medium.com/"
                className="flex justify-center items-center outline-none focus:outline-none text-white bg-white/20 rounded-[6px] p-2"
              >
                {/* <IconsMedium className="w-6 h-6" /> */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
