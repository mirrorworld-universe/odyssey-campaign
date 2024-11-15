import { TaskGroup } from "@/app/types/task";
import { getNetworkUrl, walletCampaignStartTime } from "@/lib/utils";
import { BybitLogo } from "../logos/BybitLogo";
import { CheckInLogo } from "../logos/CheckInLogo";
import { GameAdventureLogo } from "../logos/GameAdventure";
import { MeetSonicLogo } from "../logos/MeetSonicLogo";
import { MileStoneLogo } from "../logos/MileStoneLogo";
import { MysteryNftLogo } from "../logos/MysteryNftLogo";
import { PlayOnSonicxLogo } from "../logos/PlayOnSonicxLogo";
import { ReferralLogo } from "../logos/ReferralLogo";
import { NetworkId } from "./config";
import { RingLotteryLogo } from "../logos/RingLotteryLogo";
import { BridgeChallengeLogo } from "../logos/BridgeChallenge";

export const taskGroupList: TaskGroup[] = [
  {
    name: "Basic Tasks",
    list: [
      {
        id: "check-in",
        name: "Check-in",
        description:
          "Check in on Sonic every day. The longer your streak, the greater your rewards.",
        period: "Daily Task",
        reward: "Test SOL Needed",
        iconName: "calendar",
        icon: <CheckInLogo />,
        bonus: true,
        visibleInNetworks: [
          NetworkId.Origin,
          NetworkId.FrontierV0,
          NetworkId.FrontierV1
        ],
        extraBonus: [
          {
            walletId: "Bybit",
            icon: <BybitLogo />
          }
        ],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      },
      {
        id: "milestone",
        name: "TX Milestone",
        description:
          "Earn bigger rewards by engaging with Sonic through any transaction!",
        period: "Daily Task",
        reward: "",
        iconName: "recommand",
        visibleInNetworks: [
          NetworkId.FrontierV0,
          NetworkId.FrontierV1,
          NetworkId.Origin
        ],
        icon: <MileStoneLogo />,
        bonus: true,
        extraBonus: [
          {
            walletId: "Bybit",
            icon: <BybitLogo />
          }
        ],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
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
        period: "Daily Task",
        reward: "",
        visibleInNetworks: [
          NetworkId.FrontierV0,
          NetworkId.FrontierV1,
          NetworkId.Origin
        ],
        iconName: "game",
        icon: <GameAdventureLogo />,
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      },
      {
        id: "mystery-nft",
        name: "Mystery NFT",
        description:
          "Invite friends to Sonic Odyssey! Share the thrill and explore together!",
        period: "Daily Task",
        reward: "Test SOL Needed",
        iconName: "cube",
        icon: <MysteryNftLogo />,
        visibleInNetworks: [NetworkId.Origin, NetworkId.FrontierV1],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      },
      {
        id: "play-on-sonicx",
        name: "Play on Sonic X",
        description:
          "Sign up for your first Sonic X wallet and play on Sonic X to earn more rewards!",
        period: "One-Time",
        reward: "",
        iconName: "sonicX",
        icon: <PlayOnSonicxLogo />,
        visibleInNetworks: [
          NetworkId.FrontierV0,
          NetworkId.FrontierV1,
          NetworkId.Origin
        ],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      },
      {
        id: "ring-lottery",
        name: "Ring Lottery",
        description:
          "Participate in the lottery for a chance to win a ring; there's only one lucky winner in every block.",
        period: "24-Hour Period",
        reward: "Test SOL Needed",
        icon: <RingLotteryLogo />,
        iconName: "chip",
        visibleInNetworks: [NetworkId.Origin, NetworkId.FrontierV0],
        available: {
          devnet: false,
          testnet: false
        },
        showPeriod: true
      }
    ]
  },
  {
    name: "Defi & Liquidity",
    list: [
      {
        id: "bridge-challenge",
        name: "Bridge Challenge",
        description:
          "Use the HyperGrid Bridge to bridge assets to Sonic and earn rewards!",
        period: "Daily Task",
        reward: "Test SOL Needed",
        icon: <BridgeChallengeLogo />,
        visibleInNetworks: [NetworkId.FrontierV1]
      }
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
        period: "One-Time",
        reward: "",
        iconName: "twitter",
        icon: <MeetSonicLogo />,
        visibleInNetworks: [
          NetworkId.FrontierV0,
          NetworkId.FrontierV1,
          NetworkId.Origin
        ],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      },
      {
        id: "referral",
        name: "Referral",
        description:
          "Invite friends to Sonic Odyssey and explore the adventure together!",
        period: "Daily Task",
        reward: "",
        iconName: "diversity",
        icon: <ReferralLogo />,
        visibleInNetworks: [
          NetworkId.FrontierV0,
          NetworkId.FrontierV1,
          NetworkId.Origin
        ],
        available: {
          devnet: false,
          testnet: false,
          testnetv1: true
        }
      }
    ]
  }
];

export const tasks = taskGroupList.flatMap((group) => group.list);

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
