import { getNetworkUrl } from "@/lib/utils";

// get limited collection info
export const fetchLimitedCollectionInfo = async ({ networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/collection/info`,
    {
      method: "GET",
    }
  );
  return response.json();
};

// get user limited collection mint status
export const fetchLimitedCollectionUserMintStatus = async ({
  token,
  hash,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/mint/status`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

// limited collection build mint tx
export const fetchLimitedCollectionTx = async ({
  token,
  hash,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/mint/limited/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

// unlimited collection build mint tx
export const fetchUnlimitedCollectionTx = async ({
  token,
  hash,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/mint/unlimited/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
