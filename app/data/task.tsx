import { getNetworkUrl, walletCampaignStartTime } from "@/lib/utils";
import { isSupportSonic } from "../wallet/wallet-list";
import { CheckInLogo } from "../logos/CheckInLogo";
import { MileStoneLogo } from "../logos/MileStoneLogo";
import { GameAdventureLogo } from "../logos/GameAdventure";
import { MysteryNftLogo } from "../logos/MysteryNftLogo";
import { ReferralLogo } from "../logos/ReferralLogo";
import { MeetSonicLogo } from "../logos/MeetSonicLogo";
import { PlayOnSonicxLogo } from "../logos/PlayOnSonicxLogo";

export const taskGroupList = [
  {
    name: "Basic Tasks",
    list: [
      {
        id: "check-in",
        name: "Check-in",
        description:
          "Check in on Sonic every day. The longer your streak, the greater your rewards.",
        period: "24-Hour Period",
        reward: "Test SOL Needed",
        iconName: "calendar",
        icon: <CheckInLogo />,
        bonus: true,
        available: {
          devnet: true,
          testnet: true
        }
      },
      {
        id: "milestone",
        name: "TX Milestone",
        description:
          "Earn bigger rewards by engaging with Sonic through any transaction!",
        period: "24-Hour Period",
        reward: "",
        iconName: "recommand",
        icon: <MileStoneLogo />,
        bonus: true,
        available: {
          devnet: true,
          testnet: true
        }
      }

      // {
      //   id: "follow-on-tiktok",
      //   name: "Follow on TikTok",
      //   description:
      //     "Follow @SonicSVM on TikTok for the newest updating from sonic.",
      //   period: "24-Hour Period",
      //   reward: "",
      //   iconName: "tiktok",
      //   available: {
      //     devnet: true,
      //     testnet: false
      //   }
      // }
    ]
  },
  {
    name: "Gaming & NFT Tasks",
    list: [
      {
        id: "game-venture",
        name: "Game Adventure",
        description:
          "Play different games to enjoy a variety of fun experiences and earn exciting rewards along the way!",
        period: "24-Hour Period",
        reward: "",
        iconName: "game",
        icon: <GameAdventureLogo />,
        available: {
          devnet: true,
          testnet: true
        }
      },
      {
        id: "mystery-nft",
        name: "Mystery NFT",
        description:
          "Invite friends to Sonic Odyssey! Share the thrill and explore together!",
        period: "24-Hour Period",
        reward: "Test SOL Needed",
        iconName: "cube",
        icon: <MysteryNftLogo />,
        available: {
          devnet: true,
          testnet: false
        },
        startTime: walletCampaignStartTime
      },
      {
        id: "play-on-sonicx",
        name: "Play on Sonic X",
        description:
          "Sign up for your first Sonic X wallet and play on Sonic X to earn more rewards!",
        period: "24-Hour Period",
        reward: "",
        iconName: "sonicX",
        icon: <PlayOnSonicxLogo />,
        available: {
          devnet: true,
          testnet: false
        }
      }
      // {
      //   id: "ring-lottery",
      //   name: "Ring Lottery",
      //   description:
      //     "Participate in the lottery for a chance to win a ring; there's only one lucky winner in every block.",
      //   period: "24-Hour Period",
      //   reward: "Test SOL Needed",
      //   iconName: "chip",
      //   available: {
      //     devnet: true,
      //     testnet: false
      //   },
      //   showPeriod: true
      // }
    ]
  },
  {
    name: "Social Tasks",
    list: [
      {
        id: "meet-sonic",
        name: "Meet Sonic",
        description:
          "Follow Sonic on social media to get the latest updates and your rewards.",
        period: "24-Hour Period",
        reward: "",
        iconName: "twitter",
        icon: <MeetSonicLogo />,
        available: {
          devnet: true,
          testnet: false
        }
      },
      {
        id: "referral",
        name: "Referral",
        description:
          "Invite friends to Sonic Odyssey and explore the adventure together!",
        period: "24-Hour Period",
        reward: "",
        iconName: "diversity",
        icon: <ReferralLogo />,
        available: {
          devnet: true,
          testnet: false
        }
      }
    ]
  }
];

export function getTaskUrl(task: any, walletName?: string, networkId?: any) {
  const networkInfo = localStorage.getItem("sonic-network-info");
  networkId = networkId || JSON.parse(networkInfo || "{}").state.networkId;
  walletName = walletName || localStorage.getItem("walletName") || "";

  if (task.available[networkId] && isSupportSonic(walletName)) {
    return `/task/${task.id}`;
  }
  return "#";
}

export const fetchFollowingStatus = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/social/status`,
    {
      headers: {
        Authorization: token
      },
      method: "GET"
    }
  );
  return response.json();
};

export const fetchFollowTwitter = async ({ state, code, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/social/follow/twitter`,
    {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        state,
        code
      })
    }
  );
  return response.json();
};

export const fetchFollowDiscord = async ({ state, code, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/social/follow/discord`,
    {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        state,
        code
      })
    }
  );
  return response.json();
};

export const fetchCheckinStatus = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/check-in/status`,
    {
      headers: {
        Authorization: token
      },
      method: "GET"
    }
  );
  return response.json();
};

export const fetchCheckinTransaction = async ({ token, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/check-in/transaction`,
    {
      headers: {
        Authorization: token
      },
      method: "GET"
    }
  );
  return response.json();
};

export const fetchFinishCheckin = async ({ token, hash, networkId }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}${getNetworkUrl(
      networkId
    )}/user/check-in`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        hash
      })
    }
  );
  return response.json();
};
export const fetchSonicXUrl = async ({ token }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/sonicX/status`,
    {
      headers: {
        Authorization: token,
        "content-type": "application/json"
      },
      method: "GET"
    }
  );
  return response.json();
};
