import { API_BASE_URL } from "./config";

export const fetchBasicInfo = async (address: string) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/auth/sonic/challenge?${new URLSearchParams({
      wallet: address,
    })}`
  );
  return response.json();
};

export const fetchAuthorize = async (
  address: string,
  address_encoded: string,
  signature: string
) => {
  const response = await fetch(`${API_BASE_URL.staging}/auth/sonic/authorize`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      address,
      address_encoded,
      signature,
    }),
  });
  return response.json();
};

export const fetchLogout = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/auth/logout`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const getUserRewardInfo = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/rewards/info`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const getUserRewardsHistory = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/rewards/history`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const inviteUser = async ({ token, code }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/referral`, {
    headers: {
      Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({
      invitation_code: code,
    }),
  });
  return response.json();
};

export const getReferralInfo = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/referral/info`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};