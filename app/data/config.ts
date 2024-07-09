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

export const networks = {
  // mainnet: "https://mainnet.sonic.game",
  testnet: "https://devnet.sonic.game",
  devnet: "https://devnet.sonic.game",
};
