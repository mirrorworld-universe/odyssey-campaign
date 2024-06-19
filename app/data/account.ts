export const fetchBasicInfo = async (address: string) => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_DOMAIN
    }/auth/sonic/challenge?${new URLSearchParams({
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/sonic/authorize`,
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

export const fetchLogout = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/logout`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getUserRewardInfo = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/rewards/info`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const getNotificationRecords = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/rewards/history`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const inviteUser = async ({ token, code }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/referral`,
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

export const getReferralInfo = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/referral/info`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};
