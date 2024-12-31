"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Footer } from "../components/Basic/Footer";
import { useAccountInfo } from "../store/account";
import H5Data from "./components/H5Data";
import NotLogin from "./components/NotLogin";
import PcData from "./components/PcData";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";
import { useMemo } from "react";
import { Tag } from "../components/Basic/Tag";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { InfoLogo } from "../logos/InfoLogo";

export default function Reward() {
  const { publicKey } = useWallet();
  const { token } = useAccountInfo();

  const { data: seasonInfo } = useQuery({
    queryKey: ["/dashboard/season", token],
    queryFn: () => http.get("/dashboard/season"),
    enabled: !!token
  });

  const seasons = useMemo(() => {
    if (!seasonInfo) return [];

    const networkMap: Record<number, string> = {
      1: "Origin + Frontier V0",
      2: "Frontier V1",
      3: "Frontier V1"
    };

    const data = seasonInfo?.data.sort((a: any, b: any) => b.season - a.season);
    return data.map((item: any) => ({
      season: (
        <>
          Season {item.season} {item.season === 3 && <Tag text="Current" />}
        </>
      ),
      network: networkMap[item.season] || "Frontier V1",
      startDate: format(new UTCDate(item.start_date), "MMM do, yyyy"),
      endDate: item.end_date
        ? format(new UTCDate(item.end_date), "MMM do, yyyy")
        : "--",
      snapshotDate: item.update_time
        ? format(
            new UTCDate(item.update_time),
            "MMM do, yyyy hh:mm aaa"
          ).replace(/am|pm/, (match) => match.toUpperCase())
        : "--",
      rings: item.rings.toLocaleString()
    }));
  }, [seasonInfo]);

  return (
    <>
      <div className="max-w-view w-full px-4 mx-auto text-primary flex-v mt-4 md:mt-10 grow">
        <h1 className="sonic-title1 font-orbitron">Reward Center</h1>
        <div className="hidden mt-8 mb-4 md:grid grid-cols-[140px_180px_140px_140px_200px_160px] gap-x-12 sonic-body3 text-tertary">
          <p>Season</p>
          <p>Network</p>
          <p>Start Date (UTC)</p>
          <p>End Date (UTC)</p>
          <p className="flex items-center gap-1">
            Snapshot Date (UTC){" "}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hover:text-white transition-colors">
                    <InfoLogo />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[240px] bg-bg-popup border border-line p-3">
                  <p className="sonic-body4 text-secondary">
                    This timestamp marks the exact start of the snapshot.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
          <p>Reward Rings</p>
        </div>
        {publicKey && token ? (
          <>
            <PcData seasons={seasons} />
            <H5Data seasons={seasons} />
          </>
        ) : (
          <NotLogin />
        )}
      </div>

      <Footer />
    </>
  );
}
