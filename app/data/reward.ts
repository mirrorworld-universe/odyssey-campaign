import { getNetworkUrl } from "@/lib/utils";
import { NetworkId } from "./config";

export const getMilestoneDailyInfo = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/transactions/state/daily`,
    {
      headers: {
        Authorization: token
      },
      method: "GET"
    }
  );
  return response.json();
};

export const claimMilestoneRewards = async ({
  token,
  stage,
  networkId
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/transactions/rewards/claim`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        stage
      })
    }
  );
  return response.json();
};

export const getMysteryboxTx = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/rewards/mystery-box/build-tx`,
    {
      headers: {
        Authorization: token
      },
      method: "GET"
    }
  );
  return response.json();
};

export const openMysterybox = async ({ token, hash, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/rewards/mystery-box/open`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        hash
      })
    }
  );
  return response.json();
};

export const getMysteryboxHistory = async ({
  token,
  page = 1,
  size = 50,
  networkId = NetworkId.FrontierV1
}: any) => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
  //     networkId
  //   )}/user/rewards/mystery-box/history`,
  //   {
  //     headers: {
  //       Authorization: token,
  //       "content-type": "application/json"
  //     },
  //     method: "POST",
  //     body: JSON.stringify({
  //       page,
  //       size
  //     })
  //   }
  // );
  // return response.json();
  return {} as any;
};
