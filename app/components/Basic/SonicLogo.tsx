import Link from "next/link";

export default function SonicLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src={"/sonic.png"} alt="sonic-logo" className="size-6 md:size-8" />
      <p className="font-bold md:font-extrabold leading-tight text-base md:text-[22px] font-orbitron">
        SONIC
      </p>
    </Link>
  );
}
