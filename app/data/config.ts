const isProduct =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_BRANCH_NAME !== "staging";

const isStaging =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_BRANCH_NAME === "staging";

function getENV() {
  if (isProduct) return "product";
  if (isStaging) return "staging";
  return "local";
}

const ENV = getENV();

export const networks: any[] = [
  {
    id: "devnet",
    name: "Origin",
    url: "",
    rpc: "https://devnet.sonic.game",
  },
  {
    id: "testnet",
    name: "Frontier",
    url: "/testnet",
    rpc: "https://api.testnet.sonic.game",
  },
  // {
  //   id: "mainnet",
  //   url: "/mainnet",
  //   name: "Mainnet",
  //   rpc: "https://mainnet.sonic.game",
  // },
];
