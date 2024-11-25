"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Footer } from "../components/Basic/Footer";
import { useAccountInfo } from "../store/account";
import H5Data from "./components/H5Data";
import NotLogin from "./components/NotLogin";
import PcData from "./components/PcData";

export default function Reward() {
  const { publicKey } = useWallet();
  const { token } = useAccountInfo();

  return (
    <>
      <div className="max-w-view w-full px-4 mx-auto text-primary flex-v mt-4 md:mt-10 grow">
        <h1 className="sonic-title1 font-orbitron">Reward Center</h1>
        <div className="hidden mt-8 mb-4 md:grid grid-cols-[140px_180px_140px_140px_200px_160px] gap-x-12 sonic-body3 text-tertary">
          <p>Season</p>
          <p>Network</p>
          <p>Start Date (UTC)</p>
          <p>End Date (UTC)</p>
          <p>Snapshot Date (UTC)</p>
          <p>Reward Rings</p>
        </div>
        {publicKey && token ? (
          <>
            <PcData />
            <H5Data />
          </>
        ) : (
          <NotLogin />
        )}
      </div>

      <Footer />
    </>
  );
}
