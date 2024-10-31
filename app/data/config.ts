interface Network {
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
    rpc: "https://devnet.sonic.game"
  }
];
