import { API_BASE_URL } from "./config";

export const getLotteryTx = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/lottery/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const drawLottery = async ({ token, hash }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/lottery/draw`, {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      hash,
    }),
  });
  return response.json();
};

export const getBlockNumberWinner = async ({ token, blockNumber }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/lottery/draw/winner?${new URLSearchParams({
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

export const getLotteryDrawPrice = async ({ token, blockNumber }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/lottery/draw/price`,
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
  size = 20,
}: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/lottery/board`, {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      page,
      size,
    }),
  });
  return response.json();
};

export const getLotteryMintedAmount = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/lottery/minted/amount`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getLotteryBanner = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/lottery/message/banner`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
