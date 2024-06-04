import { API_BASE_URL } from "./config";

export const taskGroupList = [
  {
    name: "One - time",
    list: [
      {
        id: "meet-sonic",
        name: "Meet Sonic",
        description:
          "Follow Sonic on social media to get the latest updates and your rewards.",
        period: "24-hour period",
        reward: "",
        icon: "/images/icons/twitter.svg",
      },
    ],
  },
  {
    name: "Everyday",
    list: [
      {
        id: "check-in",
        name: "Check-in",
        description:
          "Check in on Sonic every day. The longer your streak, the greater your rewards.",
        period: "24-hour period",
        reward: "1 token / each",
        icon: "/images/icons/twitter.svg",
      },
      {
        id: "ring-lottery",
        name: "Ring Lottery",
        description:
          "Participate in the lottery for a chance to win a ring; there's only one lucky winner in every block.",
        period: "8:00 - 21:00",
        reward: "1 token / each",
        icon: "/images/icons/twitter.svg",
      },
      {
        id: "milestone",
        name: "Milestone",
        description:
          "Interact with Sonic through any form of transaction to earn increasing rewards based on your level of engagement!",
        period: "24-hour period",
        reward: "",
        icon: "/images/icons/twitter.svg",
      },
      {
        id: "referral",
        name: "Referral",
        description:
          "Invite friends to Sonic Odyssey! When they complete Task - Meet Sonic, you'll get rewards!",
        period: "24-hour period",
        reward: "",
        icon: "/images/icons/twitter.svg",
      },
    ],
  },
  {
    name: "Third Party",
    list: [
      {
        id: "game-venture",
        name: "Game Venture",
        description:
          "Follow the Sonic X account and join the Discord group to receive x 1 Ring monitor.",
        period: "24-hour period",
        reward: "",
        icon: "/images/icons/twitter.svg",
      },
    ],
  },
];

export const fetchFollowingStatus = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/social/status`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const fetchFollowTwitter = async (state: string, code: string) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/social/follow/twitter`,
    {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        state,
        code,
      }),
    }
  );
  return response.json();
};

export const fetchFollowDiscord = async (state: string, code: string) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/social/follow/discord`,
    {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        state,
        code,
      }),
    }
  );
  return response.json();
};

export const fetchCheckinStatus = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/check-in/status`, {
    headers: {
      Authorization: token,
    },
    method: "GET",
  });
  return response.json();
};

export const fetchCheckinTransaction = async ({ token }: any) => {
  const response = await fetch(
    `${API_BASE_URL.staging}/user/check-in/transaction`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const fetchFinishCheckin = async ({ token }: any) => {
  const response = await fetch(`${API_BASE_URL.staging}/user/check-in`, {
    headers: {
      Authorization: token,
      "content-type": "application/json",
    },
    method: "POST",
  });
  return response.json();
};
