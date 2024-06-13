import { API_BASE_URL } from "./config";

export const getMilestoneDailyInfo = async ({ token }: any) => {
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

export const claimMilestoneRewards = async ({ token, stage }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/transactions/rewards/claim`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        stage,
      }),
    }
  );
  return response.json();
};

export const getMysteryboxTx = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/rewards/mystery-box/build-tx`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const openMysterybox = async ({ token, hash }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/rewards/mystery-box/open`,
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

export const getMysteryboxHistory = async ({
  token,
  page = 1,
  size = 20,
}: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/rewards/mystery-box/history`,
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
