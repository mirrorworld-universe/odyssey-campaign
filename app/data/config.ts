export interface Network {
  id: string;
  type: "Devnet" | "Testnet"; // Using literal types since these seem to be the only options
  name: string;
  url: string;
  rpc: string;
}

export const networks: Network[] = [
  {
    id: "devnet",
    type: "Devnet",
    name: "Origin",
    url: "",
    rpc: "https://devnet.sonic.game"
  },
  {
    id: "testnet",
    type: "Testnet",
    name: "Frontier V0",
    url: "/testnet",
    rpc: "https://api.testnet.sonic.game"
  },
  {
    id: "testnetv1",
    type: "Testnet",
    name: "Frontier V1",
    url: "/testnet-v1",
    rpc: "https://api.testnet.v1.sonic.game"
  }
];

export const networkMap = networks.reduce((acc, network) => {
  acc[network.id] = network;
  return acc;
}, {} as Record<string, Network>);

export enum NetworkId {
  Origin = "devnet",
  FrontierV0 = "testnet",
  FrontierV1 = "testnetv1"
}

export const DEFAULT_RPC = "https://devnet.sonic.game";

export const EXPLORER_CLUSTER = {
  [NetworkId.Origin]: "",
  [NetworkId.FrontierV0]: "?cluster=testnet",
  [NetworkId.FrontierV1]: "?cluster=testnet.v1"
};

export const FAUCET_URL = {
  [NetworkId.Origin]: "https://faucet.sonic.game/#/?network=devnet",
  [NetworkId.FrontierV0]: "https://faucet.sonic.game/#/?network=testnet.v0",
  [NetworkId.FrontierV1]: "https://faucet.sonic.game/#/?network=testnet.v1"
};

export const GUIDE_URL = {
  [NetworkId.Origin]: "https://blog.sonic.game/sonic-testnet-odyssey-guide",
  [NetworkId.FrontierV0]:
    "https://blog.sonic.game/sonic-testnet---frontier-odyssey-guide",
  [NetworkId.FrontierV1]: "https://blog.sonic.game/sonic-testnet-odyssey-guide"
};
