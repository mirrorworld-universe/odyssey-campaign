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

// export const API_BASE_URL = {
//   product: "https://odyssey-api.sonic.game",
//   staging: "https://odyssey-api-staging.sonic.game",
//   local: "https://odyssey-api-staging.sonic.game",
//   // local: 'http://localhost:3000'
// }[ENV];

export const API_BASE_URL = {
  product: "https://odyssey-api.sonic.game",
  staging: "https://odyssey-api-staging.sonic.game",
  local: "https://odyssey-api-staging.sonic.game",
  // local: 'http://localhost:3000'
};
