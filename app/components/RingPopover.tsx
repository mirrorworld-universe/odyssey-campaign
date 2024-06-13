import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Ring } from "../icons/Ring";
import { Arrow } from "../icons/Arrow";
import { Gift } from "../icons/Gift";
import { Card, CardSize } from "./Card";
import { cn, prettyNumber } from "@/lib/utils";
import { useAccountInfo } from "../store/account";
import {
  getMysteryboxHistory,
  getMysteryboxTx,
  openMysterybox,
} from "../data/reward";
import { Transaction } from "@solana/web3.js";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";

let txHash = "";

export default function RingPopover({ ring = 0, ringMonitor = 0 }: any) {
  const { address, token } = useAccountInfo();
  const { publicKey, wallet, signTransaction } = useWallet();
  const { connection } = useConnection();

  const [isOpeningMysterybox, setIsOpeningMysterybox] = useState(false);
  const [ringAmount, setRingAmount] = useState(ring);
  const [ringMonitorAmount, setRingMonitorAmount] = useState(ringMonitor);
  const [canOpenMysteryBox, setCanOpenMysteryBox] = useState(true);
  const [historyList, setHistoryList] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const triggerTransaction = async (transactionString: string) => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    const tx = Transaction.from(Buffer.from(transactionString, "base64"));
    const { txid, slot } = await sendLegacyTransaction(
      connection,
      // @ts-ignore
      wallet?.adapter,
      tx,
      "confirmed"
    );

    if (!txid) {
      throw new Error("Could not retrieve transaction hash");
    }

    txHash = txid;

    const result = await confirmTransaction(connection, txHash, "finalized");

    if (result.value.err) {
      throw new Error(result.value.err.toString());
    }

    mutationOpenMysteryBox.mutate();
  };

  const { data: dataMysteryBoxHistory, isLoading: loadingMysteryBoxHistory } =
    useQuery({
      queryKey: ["queryMysteryBoxHistory", address],
      queryFn: () => getMysteryboxHistory({ token }),
      enabled: !!address && !!token,
    });

  const mutationOpenMysteryBox = useMutation({
    mutationKey: ["openMysteryBox", address],
    mutationFn: () =>
      openMysterybox({
        token,
        hash: txHash,
      }),
  });

  const mutationBuildTx = useMutation({
    mutationKey: ["buildMysteryboxTx", address],
    mutationFn: () => getMysteryboxTx({ token }),
    onSuccess: async ({ data }) => {
      const transactionString = data.hash;
      triggerTransaction(transactionString);
    },
  });

  const handleOpenMysterybox = () => {
    if (isOpeningMysterybox) {
      return;
    }
    setIsOpeningMysterybox(true);
    mutationBuildTx.mutate();
  };

  useEffect(() => {
    setRingAmount(ring);
  }, [ring]);

  useEffect(() => {
    setRingMonitorAmount(ringMonitor);
  }, [ringMonitor]);

  useEffect(() => {
    const data = dataMysteryBoxHistory?.data;
    if (data) {
      setHistoryList(data);
    }
  }, [dataMysteryBoxHistory]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <Ring width={24} height={24} color="#FBB042" />
          <span className="text-white text-[16px] font-orbitron font-semibold">
            {prettyNumber(ringAmount)}
          </span>
          <Arrow
            width={24}
            height={24}
            color="white"
            className={cn(
              "transition-transform duration-300",
              popoverOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] bg-[#1B1B1B] border-none rounded-[8px] px-0 py-0">
        {/* balance */}
        <div className="flex flex-col gap-5 px-[16px] py-[24px]">
          <Card
            name="Current Balance"
            nameClassName="bg-[#1B1B1B]"
            size={CardSize.Small}
          >
            <div className="flex flex-row justify-between">
              <div className="flex items-center">
                <Gift width={16} height={16} color="#FBB042" className="mr-1" />{" "}
                <span className="text-white text-[16px] font-orbitron font-semibold">
                  {ringMonitorAmount}
                </span>
              </div>
              <div className="flex items-center">
                <Ring width={16} height={16} color="#FBB042" className="mr-1" />{" "}
                <span className="text-white text-[16px] font-orbitron font-semibold">
                  {ringAmount}
                </span>
              </div>
            </div>
          </Card>

          {/* open mystery box button */}
          <Button
            disabled={!canOpenMysteryBox || isOpeningMysterybox}
            className={cn(
              "transition-all duration-300",
              !canOpenMysteryBox
                ? "bg-[#888888] hover:bg-[#888888]"
                : isOpeningMysterybox
                ? "bg-[#0000FF] hover:bg-[#0000FF]/80 opacity-60"
                : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
            )}
            onClick={handleOpenMysterybox}
          >
            {isOpeningMysterybox && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="text-white text-[14px] font-orbitron">
              Open Mystery Box
            </span>
            <Gift width={16} height={16} color="white" className="mx-[2px]" />
          </Button>
        </div>

        {/* claim history */}
        {historyList.length ? (
          <div className="flex flex-col px-[16px] py-[8px] font-orbitron border-t border-solid border-white/10">
            <div className="text-white text-[14px] py-[8px]">Claim History</div>
            {historyList.map((history: any) => (
              <div className="flex flex-row justify-between text-white/50 text-[12px] py-[8px]">
                <div className="flex items-center">
                  Claimed x 1{" "}
                  <Gift
                    width={12}
                    height={12}
                    color="rgba(255,255,255,.5)"
                    className="mx-[2px]"
                  />
                </div>
                <div className="flex items-center">
                  + {history.quantity}{" "}
                  <Ring
                    width={12}
                    height={12}
                    color="rgba(255,255,255,.5)"
                    className="mx-[2px]"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
