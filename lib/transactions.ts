import {
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  AddressLookupTableAccount,
  type Commitment,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  type SignatureStatus,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  type TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import { socketConnected } from "./ws";

const DEFAULT_TIMEOUT = 180000;
const isDevMode = process.env.NODE_ENV === "development";

export type WalletAdapter =
  | PhantomWalletAdapter
  | SolflareWalletAdapter
  | MathWalletAdapter
  | TorusWalletAdapter
  | CoinbaseWalletAdapter
  | CloverWalletAdapter
  | Coin98WalletAdapter;

export const wait = (milliseconds: number) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  timeout: number,
  connection: Connection,
  commitment: Commitment = "recent",
  queryStatus = false
) {
  let done = false;
  let status: SignatureStatus | null = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId: number | null;
  await new Promise((resolve, reject) => {
    async function transactionHandler() {
      setTimeout(() => {
        if (done) {
          return;
        }
        done = true;
        reject(new Error("timeout"));
      }, timeout);

      try {
        subId = connection.onSignature(
          txid,
          (result, context) => {
            subId = null;
            done = true;
            status = {
              err: result.err,
              slot: context.slot,
              confirmations: 0,
            };
            if (result.err) {
              if (isDevMode) {
                // eslint-disable-next-line no-console
                console.log("Rejected via websocket", result.err);
              }
              if (result.err === null) {
                resolve(result.err);
              } else {
                reject(result.err);
              }
            } else {
              if (isDevMode) {
                // eslint-disable-next-line no-console
                console.log("Resolved via websocket", result);
              }
              resolve(result);
            }
          },
          commitment
        );
      } catch (e) {
        done = true;
        if (isDevMode) {
          // eslint-disable-next-line no-console
          console.error("WS error in setup", txid, e);
        }
      }

      while (!done && queryStatus) {
        /* eslint-disable */
        (async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatuses([
              txid,
            ]);
            status = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!status) {
                if (isDevMode) {
                  console.log("REST null result for", txid, status);
                }
              } else if (status.err) {
                if (isDevMode) {
                  console.log("REST error for", txid, status);
                }
                done = true;
                reject(status.err);
              } else if (!status.confirmations) {
                if (isDevMode) {
                  console.log("REST no confirmations for", txid, status);
                }
              } else {
                if (isDevMode) {
                  console.log("REST confirmation for", txid, status);
                }
                done = true;
                resolve(status);
              }
            }
          } catch (e) {
            if (!done) {
              if (isDevMode) {
                console.log("REST connection error: txid", txid, e);
              }
            }
          }
        })();
        // eslint-disable-next-line no-await-in-loop
        await wait(2000);
      }
    }

    transactionHandler();
  })
    .catch((err) => {
      if ((err as Error).message === "timeout" && status) {
        status = null;
      }
      if (subId !== null) {
        connection.removeSignatureListener(subId);
        subId = null;
      }
    })
    .then((_) => {
      if (subId !== null) {
        connection.removeSignatureListener(subId);
        subId = null;
      }
    });
  done = true;
  return status;
}

export const sendTransactionWithRetry = async (
  connection: Connection,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  signers?: Keypair[],
  computeUnits = 0,
  priorityRate = 0,
  commitment: Commitment = "confirmed",
  includesFeePayer: boolean = false,
  beforeSend?: () => void
) => {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  let transaction = new Transaction();
  let _instructions: TransactionInstruction[] = [];
  if (computeUnits > 0) {
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: computeUnits,
    });
    _instructions.push(modifyComputeUnits);
  }

  if (priorityRate > 0) {
    _instructions.push(getPriorityFeeIx(priorityRate));
  }

  _instructions = _instructions.concat(instructions);
  const latestBlockhash = await connection.getLatestBlockhash(commitment);

  const message = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions: _instructions,
  });

  const addressLookupTables = message.compileToV0Message().addressTableLookups;

  const addressLookupTableAccounts = await Promise.all(
    addressLookupTables.map(async (lookup) => {
      return new AddressLookupTableAccount({
        key: lookup.accountKey,
        state: AddressLookupTableAccount.deserialize(
          await connection
            .getAccountInfo(lookup.accountKey)
            .then((res) => res!.data)
        ),
      });
    })
  );

  const tx = new VersionedTransaction(
    message.compileToV0Message(addressLookupTableAccounts)
  );
  await wait(1000);

  // @ts-expect-error signtx type not yet available on all adapters
  const signedTransaction = await wallet.signTransaction!(tx);

  if (beforeSend) {
    beforeSend();
  }

  const { txid, slot } = await sendSignedTransaction({
    connection,
    signedTransaction,
    commitment,
  });

  return { txid, slot };
};

export const sendLegacyTransaction = async (
  connection: Connection,
  wallet: WalletAdapter,
  transaction: Transaction,
  commitment: Commitment = "confirmed",
  beforeSend?: () => void
) => {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  // @ts-expect-error signtx type not yet available on all adapters
  const signedTransaction = await wallet.signTransaction!(transaction);

  if (beforeSend) {
    beforeSend();
  }

  const { txid, slot } = await sendSignedTransaction({
    connection,
    signedTransaction,
    commitment,
  });

  return { txid, slot };
};
export const sendTransaction = async (
  connection: Connection,
  wallet: WalletAdapter,
  transaction: VersionedTransaction,
  commitment: Commitment = "confirmed",
  beforeSend?: () => void
) => {
  if (!wallet.publicKey) throw new Error("Wallet not connected");

  // @ts-expect-error signtx type not yet available on all adapters
  const signedTransaction = await wallet.signTransaction!(transaction);

  if (beforeSend) {
    beforeSend();
  }

  const { txid, slot } = await sendSignedTransaction({
    connection,
    signedTransaction,
    commitment,
  });

  return { txid, slot };
};

export interface Txn {
  txid: string | null;
  slot: number | null;
}

export async function sendSignedTransaction({
  signedTransaction,
  connection,
  commitment,
  timeout = DEFAULT_TIMEOUT,
}: {
  signedTransaction: VersionedTransaction | Transaction;
  connection: Connection;
  commitment: Commitment;
  timeout?: number;
}): Promise<Txn> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  let slot = 0;
  const txid: TransactionSignature = await connection.sendRawTransaction(
    rawTransaction,
    {
      skipPreflight: true,
    }
  );

  if (isDevMode) {
    console.log("Started awaiting confirmation for", txid);
  }

  // let done = false;
  // (async () => {
  //   while (!done && getUnixTs() - startTime < timeout) {
  //     connection.sendRawTransaction(rawTransaction, {
  //       skipPreflight: true,
  //     });
  //     // eslint-disable-next-line no-await-in-loop
  //     await wait(500);
  //   }
  // })();

  // try {
  //   const confirmation = await awaitTransactionSignatureConfirmation(
  //     txid,
  //     timeout,
  //     connection
  //   );
  //   if (!confirmation)
  //     throw new Error("Timed out awaiting confirmation on transaction");

  //   if (confirmation.err) {
  //     throw confirmation.err;
  //   }

  //   slot = confirmation?.slot || 0;
  // } catch (err: any) {
  //   if (isDevMode) {
  //     console.error(err);
  //   }
  //   throw new Error("Transaction failed");
  // } finally {
  //   done = true;
  // }

  // if (isDevMode) {
  //   console.log("Latency", txid, getUnixTs() - startTime);
  // }
  return { txid, slot };
}

export const getUnixTs = () => new Date().getTime() / 1000;

export const reduceSettledPromise = <T>(
  settledPromise: PromiseSettledResult<T>[]
) => {
  return settledPromise.reduce(
    (
      acc: {
        rejected: string[];
        fulfilled: T[];
      },
      cur
    ) => {
      if (cur.status === "fulfilled") acc.fulfilled.push(cur.value);
      if (cur.status === "rejected") acc.rejected.push(cur.reason);
      return acc;
    },
    { rejected: [], fulfilled: [] }
  );
};

interface QueueVersionedTransactionSignProps {
  transactions: VersionedTransaction[];
  signTransaction: <T extends VersionedTransaction>(
    transaction: T
  ) => Promise<T>;
  signAllTransactions:
    | (<T extends VersionedTransaction>(transactions: T[]) => Promise<T[]>)
    | undefined;
  txInterval: number; // How long to wait between signing in milliseconds
  connection: Connection;
}

export async function queueVersionedTransactionSign({
  transactions,
  signAllTransactions,
  signTransaction,
  txInterval,
  connection,
}: QueueVersionedTransactionSignProps) {
  let signedTxs: VersionedTransaction[] = [];

  if (signAllTransactions) {
    signedTxs = await signAllTransactions(transactions);
  } else {
    //fallback to sign tx batches individually (if wallet doesn't support signAll)
    const settledTxs = await Promise.allSettled(
      transactions.map(async (tx) => {
        const signedTx = await signTransaction(tx);
        return signedTx;
      })
    );
    const { fulfilled } = reduceSettledPromise(settledTxs);

    signedTxs = fulfilled;
  }

  const pendingSigned = await Promise.allSettled(
    signedTxs.map((tx, i, allTx) => {
      // send all tx in intervals to avoid overloading the network
      return new Promise<{ tx: string; id: number }>((resolve, reject) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(`Requesting Transaction ${i + 1}/${allTx.length}`);
          connection
            .sendRawTransaction(tx.serialize(), { skipPreflight: true })
            .then(async (txHash) => {
              // eslint-disable-next-line no-console
              console.log("Started awaiting confirmation for", txHash);

              const confirmation = await awaitTransactionSignatureConfirmation(
                txHash,
                DEFAULT_TIMEOUT,
                connection
              );

              if (!confirmation)
                throw new Error(
                  "Timed out awaiting confirmation on transaction"
                );

              if (confirmation.err) {
                if (isDevMode) {
                  // eslint-disable-next-line no-console
                  console.error(confirmation.err);
                }
                throw new Error("Transaction failed: Custom instruction error");
              }

              resolve({ tx: txHash, id: i });
            })
            .catch((e) => {
              reject(e);
            });
        }, i * txInterval);
      });
    })
  );

  return pendingSigned;
}

export const getPriorityFeeIx = (priorityRate = 100) =>
  ComputeBudgetProgram.setComputeUnitPrice({ microLamports: priorityRate });

export const getTxFee = async (
  connection: Connection,
  txId: string
): Promise<number> => {
  const txResult = await connection.getTransaction(txId);
  return txResult?.meta?.fee ?? 0;
};

export async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  commitment: Commitment = "confirmed"
) {
  if (socketConnected(connection)) {
    const latestBlockHash = await connection.getLatestBlockhash();
    return await connection.confirmTransaction(
      {
        signature,
        ...latestBlockHash,
      },
      commitment
    );
  } else {
    let callCount = 0;
    while (callCount < 10) {
      try {
        const response = await connection.getSignatureStatus(signature);
        console.log("Signature status:", response);
        callCount++;
        if (response?.value?.confirmationStatus === commitment) {
          return response;
        } else {
          await wait(2000);
        }
      } catch (error) {
        console.error("Error getting signature status:", error);
        callCount++;
        await wait(2000);
      }
    }
    throw new Error("Timed out awaiting confirmation on transaction");
  }
}
