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
        iconName: "twitter",
        available: true,
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
        reward: "Test SOL Needed",
        iconName: "calendar",
        available: true,
      },
      {
        id: "milestone",
        name: "TX Milestone",
        description:
          "Interact with Sonic through any form of transaction to earn increasing rewards based on your level of engagement!",
        period: "24-hour period",
        reward: "",
        iconName: "recommand",
        available: true,
      },
      {
        id: "referral",
        name: "Referral",
        description:
          "Invite friends to Sonic Odyssey! Share the adventure and explore together in this thrilling journey.",
        period: "24-hour period",
        reward: "",
        iconName: "diversity",
        available: true,
      },
      {
        id: "ring-lottery",
        name: "Ring Lottery",
        description:
          "Participate in the lottery for a chance to win a ring; there's only one lucky winner in every block.",
        // period: "8:00 - 21:00",
        // reward: "Test SOL Needed",
        period: "Coming Soon",
        reward: "",
        iconName: "chip",
        available: false,
      },
    ],
  },
  {
    name: "Sonic Ecosystem",
    list: [
      {
        id: "game-venture",
        name: "Game Adventure",
        description:
          "Play different games to enjoy a variety of fun experiences and earn exciting rewards along the way!",
        period: "24-hour period",
        reward: "",
        iconName: "game",
        available: true,
      },
    ],
  },
];

export const fetchFollowingStatus = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/social/status`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const fetchFollowTwitter = async (state: string, code: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/social/follow/twitter`,
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
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/social/follow/discord`,
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/check-in/status`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const fetchCheckinTransaction = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/check-in/transaction`,
    {
      headers: {
        Authorization: token,
      },
      method: "GET",
    }
  );
  return response.json();
};

export const fetchFinishCheckin = async ({ token, hash }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/check-in`,
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
