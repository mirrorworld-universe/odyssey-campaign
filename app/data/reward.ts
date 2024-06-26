export const getMilestoneDailyInfo = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/transactions/state/daily`,
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
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/transactions/rewards/claim`,
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
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/rewards/mystery-box/build-tx`,
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
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/rewards/mystery-box/open`,
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
  size = 50,
}: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/rewards/mystery-box/history`,
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
