import crypto from "crypto";
import { getNetworkUrl } from "@/lib/utils";

export const fetchBasicInfo = async ({ address, source, networkId }: any) => {
  const message = `${address}-${source}`;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/auth/sonic/challenge?${new URLSearchParams({
      wallet: address,
      wallet_source: source,
    })}`,
    {
      headers: {
        "x-sign": crypto.createHash("sha256").update(message).digest("base64"),
      },
    }
  );
  return response.json();
};

export const fetchAuthorize = async ({
  address,
  address_encoded,
  signature,
  networkId,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/auth/sonic/authorize`,
    {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        address,
        address_encoded,
        signature,
      }),
    }
  );
  return response.json();
};

export const fetchLogout = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/auth/logout`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getUserRewardInfo = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/rewards/info`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getNotificationRecords = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/rewards/history`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const inviteUser = async ({ token, code, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/referral`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        invitation_code: code,
      }),
    }
  );
  return response.json();
};

export const getReferralInfo = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/referral/info`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
