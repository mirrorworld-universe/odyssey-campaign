import { API_BASE_URL } from "./config";

export const fetchDailyTransactionQuantity = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/transactions/state/daily`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const fetchClaimReward = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/transactions/rewards/claim`,
    {
      headers: {
        Authorization: token,
      },
      method: "POST",
    }
  );
  return response.json();
};

export const fetchRewardInfo = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/rewards/info`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const fetchRewardsHistory = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/rewards/history`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};
