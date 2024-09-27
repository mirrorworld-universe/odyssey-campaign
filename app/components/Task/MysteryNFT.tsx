"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Go as IconGo } from "@/app/icons/Go";
import { Infinity as IconInfinity } from "@/app/icons/Infinity";
import { Card, CardSize } from "@/app/components/Basic/Card";
import { Rules } from "@/app/components/Task/Rules";
import { useAccountInfo, useNetworkInfo } from "@/app/store/account";
import {
  fetchCollectionInfo,
  fetchLimitedCollectionTx,
  fetchUnlimitedCollectionTx,
} from "@/app/data/nft";
import { trackClick } from "@/lib/track";
import { cn, prettyNumber } from "@/lib/utils";
import { confirmTransaction, sendLegacyTransaction } from "@/lib/transactions";
import { Close } from "@/app/icons/Close";

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
  const [showNFTDetail, setShowNFTDetail] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const [showRules, setShowRules] = useState(false);

  const [NFTcollections, setNFTCollections] = useState<any>([
    {
      id: "3",
      image:
        "https://2qdyvazekpxbfz4exewelpidbev44ooyvulymuftequ5yaor3csq.akrd.net/1AeKgyRT7hLnhLksRb0DCSvOOditF4ZQsyQp3AHR2KU",
      name: "LLF SuperSonic Badge",
      isLimited: true,
      isSmallImage: true,
      isExpanded: false,
      introduction:
        "Lowlife Forms SuperSonic Badge. For the LLF pioneers and the Sonic OGs. For the web3 gamers that want the best of all worlds. This testnet NFT will give access to the mainnet Badge which will unlock unique in-game and out-of-game benefits.",
      totalAmount: 6000,
      mintedAmount: 0,
      available: true,
      limit: 0,
      enable: false,
      minted: true,
      handleMint: () => {
        const currentCollection = NFTcollections.find(
          (item: any) => !item.isLimited
        );
        setSelectedCollection(currentCollection);
        if (
          currentCollection.enable &&
          !currentCollection.minted &&
          !isMinting
        ) {
          isMintingStatus = true;
          setIsMinting(isMintingStatus);
          getUnlimitedCollectionTXHash.mutate();
        }
      },
      handleTrade: () => {
        window.open(
          "https://www.okx.com/web3/marketplace/nft/collection/sonic-devnet/sonic-odyssey-pass",
          "_blank"
        );
      },
    },
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
        const currentCollection = NFTcollections.find(
          (item: any) => item.isLimited
        );
        setSelectedCollection(currentCollection);
        if (
          currentCollection.enable &&
          !currentCollection.minted &&
          !isMinting
        ) {
          isMintingStatus = true;
          setIsMinting(isMintingStatus);
          getLimitedCollectionTXHash.mutate();
        }
      },
      handleTrade: () => {
        window.open(
          "https://www.okx.com/web3/marketplace/nft/collection/sonic-devnet/sonic-cartridge-collection",
          "_blank"
        );
      },
    },
    {
      id: "2",
      image: "/images/nft/2.png",
      name: "Sonic Odyssey Pass",
      isLimited: false,
      isExpanded: false,
      introduction:
        "The Sonic Odyssey Pass is an unlimited NFT series commemorating user participation in Sonic Odyssey. It represents user adventures and achievements within the community and holds significant value.",
      totalAmount: -1,
      mintedAmount: 0,
      available: true,
      limit: 0,
      enable: false,
      minted: true,
      handleMint: () => {
        const currentCollection = NFTcollections.find(
          (item: any) => !item.isLimited
        );
        setSelectedCollection(currentCollection);
        if (
          currentCollection.enable &&
          !currentCollection.minted &&
          !isMinting
        ) {
          isMintingStatus = true;
          setIsMinting(isMintingStatus);
          getUnlimitedCollectionTXHash.mutate();
        }
      },
      handleTrade: () => {
        window.open(
          "https://www.okx.com/web3/marketplace/nft/collection/sonic-devnet/sonic-odyssey-pass",
          "_blank"
        );
      },
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
            setNFTCollections(collections);

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
        description: (
          <div role="success">
            Your mint was successful. Check your{" "}
            <a
              className="text-[#25A3ED]"
              href={`https://explorer.sonic.game/tx/${transactionHash}${
                networkId === "testnet" ? "?cluster=testnet" : ""
              }`}
              target="_blank"
            >
              transaction link
            </a>{" "}
            for details.
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Sorry",
        // type:'fail',
        description: (
          <div role="fail">
            Unfortunately, your mint was unsuccessful. Please try again later.
          </div>
        ),
      });
      console.error("Transaction failed:", error);
    }

    onFinish && onFinish();
  };

  useEffect(() => {
    let isLimitedSoldOut = false;
    const collectionInfo = dataLimitedCollectionInfo?.data;
    if (collectionInfo) {
      const collections = [...NFTcollections];
      collections.forEach((item: any) => {
        if (item.isLimited) {
          const { total, minted, mint_limit, enable_mint } =
            collectionInfo.limited_coll_info;
          item.totalAmount = total;
          item.mintedAmount = minted;
          // limit amount to mint
          item.limit = mint_limit;
          // is collection enable to mint
          item.enable = enable_mint && minted < total;
          // is collection minted
          item.minted = !enable_mint;
          isLimitedSoldOut = minted >= total;
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
      if (isLimitedSoldOut) {
        setNFTCollections(collections.reverse());
      } else {
        setNFTCollections(collections);
      }
    }
  }, [dataLimitedCollectionInfo]);

  useEffect(() => {
    if (token && token !== currentToken) {
      currentToken = token;
      refetchCollectionInfo();
    }
  }, [token]);

  const handleOpenNFTDetail = async () => {
    setShowNFTDetail(true);
  };

  const LimitedTag = () => (
    <span className="inline-flex leading-4 text-[#FBB042] text-[10px] bg-[#2C251D] px-2 py-[2px]">
      Limited
    </span>
  );

  const SoldoutTag = ({ className }: any) => (
    <span
      className={cn(
        "inline-flex leading-4 font-orbitron text-[#FFFFFF] text-[10px] bg-[#333333] px-2 py-[2px]",
        className
      )}
    >
      Sold Out
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

  const handleSelectCollection = (collection: any) => {
    if (
      collection?.id === selectedCollection?.id ||
      (collection.isLimited &&
        collection.mintedAmount >= collection.totalAmount)
    ) {
      setSelectedCollection(null);
    } else {
      setSelectedCollection(collection);
    }
  };

  const handleClosePanel = () => {
    setShowNFTDetail(false);
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
              Request test SOL first.{" "}
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
              Each NFT belongs to a different series, with varying rarity and
              quantities.
            </li>
            <li className="">
              Click "Mint" to get started! After minting, check your wallet for
              a random NFT from the current collection.
            </li>
            <li className="">
              You can also click "Trade" to participate in secondary market
              trading and earn more rings! For more details, please check this{" "}
              <a
                className="text-[#25A3ED] hover:text-[#00F]"
                href="https://blog.sonic.game/sonic-okx-web3-campaign-guide"
                target="_blank"
              >
                blog
              </a>
              .
            </li>
          </ul>
        </Rules>

        {/* nft list */}
        <div className="hidden md:flex flex-col gap-6 mt-20">
          {NFTcollections.map((nft: any, index: number) => (
            <Card
              key={index}
              size={CardSize.Medium}
              className={cn(
                "max-w-[1024px] w-full relative p-6 md:p-10 rounded-none border-[#27282D] transition-opacity duration-300"
                // nft.isLimited && nft.mintedAmount >= nft.totalAmount
                //   ? "opacity-30"
                //   : ""
              )}
            >
              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-10">
                {/* nft part */}
                <div className="nft flex flex-row items-center gap-10">
                  {/* cover */}
                  <div
                    className={cn(
                      "flex justify-center w-[200px] h-[112px] rounded overflow-hidden relative"
                      // nft.isSmallImage ? "w-[200px]" : ""
                    )}
                  >
                    <img
                      src={nft.image}
                      alt=""
                      className={cn(
                        "max-w-none",
                        nft.isSmallImage ? "h-full w-auto" : "h-auto",
                        nft.isLimited && nft.mintedAmount >= nft.totalAmount
                          ? "opacity-30"
                          : "opacity-100"
                      )}
                    />
                    {nft.isLimited && nft.mintedAmount >= nft.totalAmount ? (
                      <SoldoutTag className="rounded-bl rounded-tr absolute top-0 right-0" />
                    ) : null}
                  </div>
                  {/* intro */}
                  <div className="flex flex-col gap-2 max-w-auto xl:max-w-[450px]">
                    <div className="flex flex-row items-center gap-2 font-orbitron text-xl font-semibold text-white">
                      <span className="inline-flex">{nft.name}</span>{" "}
                      {nft.isLimited ? <LimitedTag /> : null}
                    </div>
                    <p className="text-[#666] text-base font-manrope">
                      {nft.introduction.substr(0, 95)}...
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="text-[#25A3ED] hover:text-[#00F] cursor-pointer"
                              onClick={() => handleExpandIntroduction(nft)}
                            >
                              more
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[380px] bg-[#151519] border border-[#27282D] rounded p-4">
                            <p className="text-[#999] text-xs">
                              {nft.introduction}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                                <IconInfinity
                                  className="w-4 h-4"
                                  color="#999999"
                                />
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
                            !nft.enable || nft.minted || isMinting
                              ? "bg-[#0000FF]/80 hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                              : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
                          )}
                          disabled={isMinting}
                          onClick={nft.handleMint}
                        >
                          <span>{nft.minted ? "Minted" : "Mint"}</span>
                          {isMinting && selectedCollection?.id === nft.id ? (
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
                    onClick={nft.handleTrade}
                  >
                    Trade
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* nft list (mobile version) */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex md:hidden w-full max-w-full"
        >
          <CarouselContent className="">
            {NFTcollections.map((nft: any, index: number) => (
              <CarouselItem
                key={index}
                className="basis-[85%]"
                onClick={() => handleSelectCollection(nft)}
              >
                <div className="">
                  <Card
                    className={cn(
                      "w-full border-[#27282D] bg-[#000] rounded-none p-0",
                      nft.enable ? "cursor-pointer" : "",
                      nft.isLimited && nft.mintedAmount >= nft.totalAmount
                        ? "opacity-30"
                        : "",
                      nft.id === selectedCollection?.id
                        ? "border-[#FBB042]"
                        : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex flex-col"
                        // "w-screen h-screen top-0 left-0 right-0 bottom-0 z-50"
                      )}
                    >
                      {/* cover */}
                      <div className="flex items-center justify-center w-full h-[175px] overflow-hidden relative">
                        <img
                          src={nft.image}
                          alt=""
                          className={cn(
                            nft.isSmallImage ? "h-full w-auto" : "h-auto w-full"
                          )}
                        />
                        {nft.isLimited &&
                        nft.mintedAmount >= nft.totalAmount ? (
                          <SoldoutTag className="absolute top-0 right-0" />
                        ) : null}
                      </div>
                      {/* content */}
                      <div className="flex flex-col p-4 pt-2">
                        {/* name */}
                        <div className="inline-flex gap-2 items-center text-white font-orbitron text-sm font-semibold">
                          <span className="inline-flex">{nft.name}</span>{" "}
                          {nft.isLimited ? <LimitedTag /> : null}
                        </div>
                        {/* intro */}
                        <div className="text-xs text-[#666] line-clamp-3 mt-2">
                          {nft.introduction}
                        </div>
                        {/* price */}
                        <div className="flex flex-row items-center justify-between text-xs text-[#999] mt-4">
                          <span className="font-orbitron font-semibold">
                            Mint Price:
                          </span>
                          <span className="font-manrope">Free</span>
                        </div>
                        {/* amount */}
                        <div className="flex flex-row items-center justify-between text-xs text-[#999] mt-2">
                          <span className="font-orbitron font-semibold">
                            Minted Amount:
                          </span>
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
                                  <IconInfinity
                                    className="w-4 h-4"
                                    color="#999999"
                                  />
                                )
                              ) : (
                                "-"
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
          className="inline-flex gap-2 w-4/6 h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300"
          onClick={handleOpenNFTDetail}
          disabled={!selectedCollection}
        >
          <span>Continue</span>
          <IconGo width={24} height={24} color="white" />
        </Button>
      </div>

      {/* nft detail */}
      <div
        className={cn(
          "flex flex-col bg-[#000] w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-30 transition-transform duration-300",
          showNFTDetail ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {/* tool */}
        <div className="flex justify-end items-center w-full h-14 p-4">
          <span
            className="cursor-pointer hover:opacity-80"
            onClick={handleClosePanel}
          >
            <Close color="rgba(255, 255, 255, .3)" width={24} height={24} />
          </span>
        </div>
        {/* cover */}
        <div className="flex items-center w-full h-[175px] overflow-hidden">
          <img
            src={selectedCollection?.image}
            alt=""
            className="h-auto w-full"
          />
        </div>
        {/* content */}
        <div className="flex flex-col p-4">
          {/* name */}
          <div className="inline-flex gap-2 items-center text-white font-orbitron text-base font-semibold">
            <span className="inline-flex">{selectedCollection?.name}</span>{" "}
            {selectedCollection?.isLimited ? <LimitedTag /> : null}
          </div>
          {/* intro */}
          <div className="text-sm text-[#666] line-clamp-3 mt-4">
            {selectedCollection?.introduction}
          </div>
          {/* price */}
          <div className="flex flex-row items-center justify-between text-sm text-[#999] mt-4">
            <span className="font-orbitron font-semibold">Mint Price:</span>
            <span className="font-manrope">Free</span>
          </div>
          {/* amount */}
          <div className="flex flex-row items-center justify-between text-sm text-[#999] mt-2">
            <span className="font-orbitron font-semibold">Minted Amount:</span>
            <p className="inline-flex flex-row items-center gap-[2px] font-manrope">
              <span>
                {loaded ? prettyNumber(selectedCollection?.mintedAmount) : "-"}
              </span>
              <span>/</span>
              <span>
                {loaded ? (
                  selectedCollection?.totalAmount > -1 ? (
                    prettyNumber(selectedCollection?.totalAmount)
                  ) : (
                    <IconInfinity className="w-4 h-4" color="#999999" />
                  )
                ) : (
                  "-"
                )}
              </span>
            </p>
          </div>
          {selectedCollection?.isLimited ? (
            <p className="text-[#FBB042] text-xs mt-2">
              Each wallet address can only mint once.
            </p>
          ) : null}
        </div>
        {/* tools */}
        <div className="flex md:hidden flex-row gap-4 fixed bottom-0 right-0 left-0 m-auto bg-[#000] p-5">
          <Button
            className="w-1/2 h-12 border border-solid border-white/40 bg-transparent"
            onClick={selectedCollection?.handleTrade}
          >
            <span className="text-white text-base font-bold font-orbitron">
              Trade
            </span>
          </Button>
          <Button
            className={cn(
              "inline-flex gap-1 w-1/2 h-12 bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60 text-white text-base font-orbitron font-semibold transition-colors duration-300",
              !selectedCollection?.enable ||
                selectedCollection?.minted ||
                isMinting
                ? "bg-[#0000FF]/80 hover:bg-[#0000FF] opacity-30 cursor-not-allowed"
                : "bg-[#0000FF] hover:bg-[#0000FF]/80 active:bg-[#0000FF]/60"
            )}
            disabled={isMinting}
            onClick={selectedCollection?.handleMint}
          >
            <span>Mint</span>
            {isMinting ? (
              <Loader2 size={16} color="white" className={cn("animate-spin")} />
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  );
}
