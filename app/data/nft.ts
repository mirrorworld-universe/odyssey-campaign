import { getNetworkUrl } from "@/lib/utils";

// get limited collection info
export const fetchCollectionInfo = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/collection/info`,
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
export const fetchLimitedCollectionTx = async ({ token, networkId }: any) => {
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
export const fetchUnlimitedCollectionTx = async ({ token, networkId }: any) => {
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

// get third-party collection info
export const fetchThirdPartyCollectionInfo = async ({
  name = "lowlife",
  wallet,
  token,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/collection/third-part/info?${new URLSearchParams({
      name,
      wallet,
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

// third-party collection build mint tx
export const fetchThirdPartyCollectionTx = async ({
  token,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/nft-campaign/mint/third-part/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
