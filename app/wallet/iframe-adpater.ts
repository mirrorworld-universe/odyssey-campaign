import type { WalletName } from "@solana/wallet-adapter-base";
import {
  BaseMessageSignerWalletAdapter,
  WalletConnectionError,
  WalletDisconnectionError,
  WalletNotConnectedError,
  WalletReadyState,
  WalletSignMessageError,
  WalletSignTransactionError,
} from "@solana/wallet-adapter-base";
import type { TransactionVersion, VersionedTransaction } from "@solana/web3.js";
import { PublicKey, Transaction } from "@solana/web3.js";

export const IframeWalletName = "Iframe Wallet" as WalletName<"Iframe Wallet">;

type MessageType = "connect" | "disconnect" | "signMessage" | "signTransaction";

interface WalletMessage {
  target: "iframe-wallet-adapter";
  id: string;
  type: MessageType;
  payload?: any;
}

export class IframeWalletAdapter extends BaseMessageSignerWalletAdapter {
  name = IframeWalletName;
  url = "https://github.com/anza-xyz/wallet-adapter";
  icon = "";
  readonly supportedTransactionVersions: ReadonlySet<TransactionVersion> =
    new Set<TransactionVersion>(["legacy", 0]);

  private _connecting: boolean;
  private _publicKey: PublicKey | null;
  private _readyState: WalletReadyState;
  private _messageHandlers: Map<string, (response: any) => void>;

  constructor({
    name,
    icon,
    url,
  }: {
    name: string;
    icon?: string;
    url?: string;
  }) {
    super();
    this.name = name as WalletName<"Iframe Wallet">;
    this.icon = icon || "";
    this.url = url || "";
    this._connecting = false;
    this._publicKey = null;
    this._readyState = WalletReadyState.Loadable;
    this._messageHandlers = new Map();
  }

  get publicKey() {
    return this._publicKey;
  }

  get connecting() {
    return this._connecting;
  }

  get readyState() {
    return this._readyState;
  }

  async connect(): Promise<void> {
    try {
      if (this.connected || this.connecting) return;
      this._connecting = true;
      window.addEventListener("message", this._handleMessage);
      const response = await this._sendMessage("connect");
      if (response.error) {
        throw new WalletConnectionError(response.error);
      }

      this._publicKey = new PublicKey(response.publicKey);
      this.emit("connect", this._publicKey);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    const wasConnected = this.connected;
    this._publicKey = null;
    try {
      await this._sendMessage("disconnect");
    } catch (error: any) {
      this.emit("error", new WalletDisconnectionError(error?.message, error));
    }
    if (wasConnected) {
      this.emit("disconnect");
    }
  }

  async signMessage(message: Uint8Array): Promise<Uint8Array> {
    try {
      if (!this.connected) throw new WalletNotConnectedError();

      const response = await this._sendMessage("signMessage", {
        message: Array.from(message),
      });

      if (response.error) {
        throw new WalletSignMessageError(response.error);
      }

      return new Uint8Array(response.signature);
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  async signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T> {
    try {
      if (!this.connected) {
        throw new WalletNotConnectedError();
      }

      const response = await this._sendMessage("signTransaction", {
        transaction: transaction.serialize(),
      });

      if (response.error) {
        throw new WalletSignTransactionError(response.error);
      }

      return Transaction.from(response.signedTransaction) as T;
    } catch (error: any) {
      this.emit("error", error);
      throw error;
    }
  }

  private _handleMessage = (event: MessageEvent) => {
    console.info("_handleMessage", event.data);
    const message = event.data as WalletMessage;
    if (!message.id) {
      return;
    }
    const handler = this._messageHandlers.get(message.id);
    if (handler) {
      handler(message.payload);
      this._messageHandlers.delete(message.id);
    }
  };

  private async _sendMessage(type: MessageType, payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      const message: WalletMessage = {
        target: "iframe-wallet-adapter",
        type,
        payload,
        id,
      };

      this._messageHandlers.set(id, resolve);
      window.parent.postMessage(message, "*");

      setTimeout(() => {
        this._messageHandlers.delete(id);
        reject(new Error("Request timeout"));
      }, 5_000);
    });
  }
}
