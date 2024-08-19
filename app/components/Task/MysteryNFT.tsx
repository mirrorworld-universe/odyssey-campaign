"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Card, CardSize } from "@/app/components/Basic/Card";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import {
  fetchCollectionInfo,
  fetchLimitedCollectionTx,
  fetchUnlimitedCollectionTx,
} from "@/app/data/nft";
import { trackClick } from "@/lib/track";
import { Rules } from "./Rules";
import { cn, prettyNumber } from "@/lib/utils";
import { Infinity } from "@/app/icons/Infinity";
import { Transaction } from "@solana/web3.js";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";

let transactionHash = "";
let isMintingStatus = false;
let currentToken = "";

export function MysteryNFT() {
  const { address, token } = useAccountInfo();
  const { toast } = useToast();
  const { networkId } = useNetworkInfo();
  const { connection } = useConnection();
  const { publicKey, wallet, signTransaction } = useWallet();

  const [loaded, setLoaded] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");

  const [showRules, setShowRules] = useState(false);

  const [NFTcollections, setNFTCollections] = useState<any>([
    {
      id: "1",
      image: "/images/nft/1.png",
      name: "Sonic Cartridge Collection",
      isLimited: true,
      isExpanded: false,
      introduction:
        "The Sonic Cartridge is a limited-edition NFT collection that offers special bonus effects during the Odyssey. The NFTs in this series come in four different rarities: Common, Rare, Epic, and Legendary. Each rarity provides different reward effects.",
      totalAmount: 1,
      mintedAmount: 0,
      available: true,
      limit: 1,
      enable: false,
      minted: true,
      handleMint: () => {
        if (!isMinting) {
          isMintingStatus = true;
          setIsMinting(isMintingStatus);
          getLimitedCollectionTXHash.mutate();
        }
      },
      handleTrade: () => {},
    },
    {
      id: "2",
      image: "/images/nft/2.png",
      name: "Sonic Adventure Pass",
      isLimited: false,
      isExpanded: false,
      introduction:
        "The Sonic Adventure Pass is an unlimited NFT series commemorating user participation in Sonic Odyssey. It represents user adventures and achievements within the community and holds significant value.",
      totalAmount: -1,
      mintedAmount: 0,
      available: true,
      limit: 0,
      enable: false,
      minted: true,
      handleMint: () => {
        if (!isMintingStatus) {
          isMintingStatus = true;
          setIsMinting(isMintingStatus);
          getUnlimitedCollectionTXHash.mutate();
        }
      },
      handleTrade: () => {},
    },
  ]);

  const {
    data: dataLimitedCollectionInfo,
    isLoading: loadingLimitedCollectionInfo,
    refetch: refetchCollectionInfo,
  } = useQuery({
    queryKey: ["queryLimitedCollectionInfo", address],
    queryFn: () => fetchCollectionInfo({ token, networkId }),
    enabled: !!token,
  });

  const getLimitedCollectionTXHash = useMutation({
    mutationKey: ["buildLimitedCollectionTx", address],
    mutationFn: () => fetchLimitedCollectionTx({ token, networkId }),
    onSuccess({ data }) {
      if (data?.hash) {
        triggerTransaction({
          transactionString: data.hash,
          onFinish: () => {
            const collections = [...NFTcollections];
            collections.forEach((item: any) => {
              if (item.isLimited) {
                item.minted = true;
              }
            });
            setNFTCollections(collections.reverse());

            isMintingStatus = false;
            setIsMinting(isMintingStatus);
          },
        });
      } else {
        isMintingStatus = false;
        setIsMinting(isMintingStatus);
      }
    },
  });

  const getUnlimitedCollectionTXHash = useMutation({
    mutationKey: ["buildUnlimitedCollectionTx", address],
    mutationFn: () => fetchUnlimitedCollectionTx({ token, networkId }),
    onSuccess({ data }) {
      if (data?.hash) {
        triggerTransaction({
          transactionString: data.hash,
          onFinish: () => {
            isMintingStatus = false;
            setIsMinting(isMintingStatus);
          },
        });
      } else {
        isMintingStatus = false;
        setIsMinting(isMintingStatus);
      }
    },
  });

  const triggerTransaction = async ({ transactionString, onFinish }: any) => {
    if (!publicKey || !signTransaction) {
      console.error("Wallet not connected");
      return;
    }

    try {
      const tx = Transaction.from(Buffer.from(transactionString, "base64"));
      const { txid, slot } = await sendLegacyTransaction(
        connection,
        // @ts-ignore
        wallet?.adapter,
        tx,
        "processed"
      );

      if (!txid) {
        throw new Error("Could not retrieve transaction hash");
      }

      transactionHash = txid;
      await confirmTransaction(connection, transactionHash, "confirmed");

      toast({
        title: "Congratulations",
        // type:'success',
        description: `<div aria="success">Your mint was successful. Check your <a style="color:#25A3ED;" href="https://explorer.sonic.game/tx/${transactionHash}${
          networkId === "testnet" ? "?cluster=testnet" : ""
        }" target="_blank">transaction link</a> for details.</div>`,
      });
    } catch (error) {
      toast({
        title: "Sorry",
        // type:'fail',
        description: `<div aria="fail">Unfortunately, your mint was unsuccessful. Please try again later.</div>`,
      });
      console.error("Transaction failed:", error);
    }

    onFinish && onFinish();
  };

  useEffect(() => {
    const collectionInfo = dataLimitedCollectionInfo?.data;
    if (collectionInfo) {
      const collections = [...NFTcollections];
      collections.forEach((item: any) => {
        if (item.isLimited) {
          const { total, minted, mint_limit, enable_mint } =
            collectionInfo.limited_coll_info;
          item.totalAmount = total;
          item.mintedAmount = minted;
          item.limit = mint_limit;
          item.enable = enable_mint;
          item.minted = mint_limit < 1;
        } else {
          const { total, minted, mint_limit, enable_mint } =
            collectionInfo.unlimited_coll_info;
          item.totalAmount = total > 1 ? total : -1;
          item.mintedAmount = minted;
          item.limit = mint_limit;
          item.enable = enable_mint;
          item.minted = false;
        }
      });
      setLoaded(true);
      setNFTCollections(collections);
    }
  }, [dataLimitedCollectionInfo]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchCollectionInfo();
    }
  }, [token]);

  const handleOpenNFTDetail = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast({
        title: "Copy Successful",
        description: "The invitation link has been copied successfully.",
      });
      trackClick({ text: "Referral" });
    } catch (err) {
      console.error("Failed to copy invitation url: ", err);
    }
  };

  const LimitedTag = () => (
    <span className="inline-flex leading-4 text-[#FBB042] text-[10px] bg-[#2C251D] px-2 py-[2px]">
      Limited
    </span>
  );

  const handleExpandIntroduction = (nft: any) => {
    const collections = [...NFTcollections];
    collections.forEach((item: any) => {
      if (item.id === nft.id) {
        item.isExpanded = !item.isExpanded;
      }
    });
    setNFTCollections(collections);
  };

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <h1 className="hidden md:flex text-white font-orbitron font-semibold text-[64px]">
        Mystery NFT
      </h1>

      {/* line */}
      <div className="hidden md:block w-full max-w-[1024px] h-[2px] bg-white/20 mt-10 mb-20 relative">
        <div className="w-[396px] h-[2px] bg-[#25A3ED] shadow-[0_0_6px_0_#25A3ED] absolute top-0 left-0"></div>
      </div>

      {/* content */}
      <div className="">
        {/* rules */}
        <Rules show={showRules} onClose={(show: boolean) => setShowRules(show)}>
          <ul className="list-disc font-normal pl-6">
            <li className="">
              1. Request test SOL first.{" "}
              <a
                className="text-[#25A3ED] hover:text-[#00F]"
                href={`https://faucet.sonic.game/#/${
                  networkId === "testnet" ? "?network=testnet" : ""
                }`}
                target="_blank"
              >
                Request here.
              </a>
            </li>
            <li className="">
              2. Each NFT belongs to a different series, with varying rarity and
              quantities.
            </li>
            <li className="">
              3. Click "Mint" to get started! After minting, check your wallet
              for a random NFT from the current collection.
            </li>
            <li className="">
              4. You can also click "Trade" to participate in secondary market
              trading and earn more rewards! For more details, please check this{" "}
              <a
                className="text-[#25A3ED] hover:text-[#00F]"
                href="https://blog.sonic.game/"
                target="_blank"
              >
                blog
              </a>
              .
            </li>
          </ul>
        </Rules>

        {/* nft list */}
        <div className="flex flex-col gap-6 mt-20">
          {NFTcollections.map((nft: any, index: number) => (
            <Card
              key={index}
              size={CardSize.Medium}
              className={cn(
                "max-w-[1024px] w-full relative p-6 md:p-10 rounded-none border-[#27282D] transition-opacity duration-300",
                !nft.enable ? "opacity-30" : ""
              )}
            >
              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-10">
                {/* nft */}
                <div className="nft flex flex-row items-center gap-10">
                  <div className="max-w-[200px] h-[112px] rounded overflow-hidden">
                    <img src={nft.image} alt="" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-auto xl:max-w-[452px]">
                    <div className="flex flex-row items-center gap-2 font-orbitron text-xl font-semibold text-white">
                      <span className="inline-flex">{nft.name}</span>{" "}
                      {nft.isLimited ? <LimitedTag /> : null}
                    </div>
                    <p className="text-[#666] text-base font-manrope">
                      {nft.isExpanded
                        ? nft.introduction
                        : `${nft.introduction.substr(0, 90)}...`}{" "}
                      <span
                        className="text-[#25A3ED] hover:text-[#00F] cursor-pointer"
                        onClick={() => handleExpandIntroduction(nft)}
                      >
                        {nft.isExpanded ? "less" : "more"}
                      </span>
                    </p>
                    <div className="flex flex-row gap-12">
                      <div className="flex flex-row gap-2 text-xs text-[#958d8d]">
                        <span className="font-orbitron">Mint Price:</span>
                        <span className="inline-flex flex-row items-center font-manrope">
                          Free
                        </span>
                      </div>
                      <div className="flex flex-row gap-2 text-xs text-[#958d8d]">
                        <span className="font-orbitron">Minted Amount:</span>
                        <p className="inline-flex flex-row items-center gap-[2px] font-manrope">
                          <span>
                            {loaded ? prettyNumber(nft.mintedAmount) : "-"}
                          </span>
                          <span>/</span>
                          <span>
                            {loaded ? (
                              nft.totalAmount > -1 ? (
                                prettyNumber(nft.totalAmount)
                              ) : (
                                <Infinity className="w-4 h-4" color="#999999" />
                              )
                            ) : (
                              "-"
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* tools */}
                <div className="w-full xl:w-auto flex gap-2">
                  {" "}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className={cn(
                            "inline-flex gap-1 w-1/2 xl:w-[102px] h-12 text-base text-white font-semibold font-orbitron rounded bg-[#0000FF] transition-all duration-300",
                            nft.minted || isMinting
                              ? "bg-[#0000FF]/80 hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                              : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                          )}
                          disabled={!nft.enable || isMinting}
                          onClick={nft.handleMint}
                        >
                          <span>{nft.minted ? "Minted" : "Mint"}</span>
                          {isMinting ? (
                            <Loader2
                              size={16}
                              color="white"
                              className={cn("animate-spin")}
                            />
                          ) : null}
                        </Button>
                      </TooltipTrigger>
                      {nft.isLimited ? (
                        <TooltipContent className="bg-[#151519] border border-[#27282D] rounded p-4">
                          <p className="text-[#999] text-xs">
                            Each wallet address can only mint once.
                          </p>
                        </TooltipContent>
                      ) : null}
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    className={cn(
                      "w-1/2 xl:w-[102px] h-12 text-base font-semibold font-orbitron border rounded bg-transparent hover:bg-transparent transition-all duration-300",
                      "border-[#27282D] hover:border-[#27282D]/80 active:border-[#27282D]/60 text-white hover:text-white/80 active:text-white/60"
                    )}
                    disabled={!nft.enable}
                    onClick={nft.handleTrade}
                  >
                    Trade
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* mobile version tools */}
      <div className="flex md:hidden flex-row gap-4 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
        <Button
          className="w-2/6 h-12 border border-solid border-white/40 bg-transparent"
          onClick={() => setShowRules(true)}
        >
          <span className="text-white text-base font-bold font-orbitron">
            Rules
          </span>
        </Button>
        <Button
          className="w-4/6 h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
          onClick={handleOpenNFTDetail}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
