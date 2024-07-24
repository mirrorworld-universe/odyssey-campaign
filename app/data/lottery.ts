import { getNetworkUrl } from "@/lib/utils";

export const getLotteryTx = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const drawLottery = async ({ token, hash, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/draw`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        hash,
      }),
    }
  );
  return response.json();
};

export const getBlockNumberWinner = async ({
  token,
  blockNumber,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/draw/winner?${new URLSearchParams({
      block_number: blockNumber,
    })}`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getLotteryDrawPrice = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/draw/price`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getLotteryWinnerBoard = async ({
  token,
  page = 1,
  size = 50,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/board`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        page,
        size,
      }),
    }
  );
  return response.json();
};

export const getLotteryMintedAmount = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/minted/amount`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getLotteryBanner = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/lottery/message/banner`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
