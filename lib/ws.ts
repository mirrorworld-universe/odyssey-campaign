import { type Connection } from "@solana/web3.js";

export function socketConnected(connection: Connection) {
  // @ts-expect-error This property is not exposed in the public API
  return connection._rpcWebSocketConnected;
}
