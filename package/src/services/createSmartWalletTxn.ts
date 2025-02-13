import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Contract } from './contract/types';
import IDL from './contract/idl.json';

export type CreateInitSmartWalletTransactionParam = {
  secp256k1PubkeyBytes: number[];
  connection: Connection;
  payer: PublicKey;
};

export async function createSmartWalletTransaction(
  param: CreateInitSmartWalletTransactionParam
): Promise<String> {
  const { secp256k1PubkeyBytes, connection, payer } = param;

  // check pubkey length
  if (secp256k1PubkeyBytes.length !== 33) {
    throw new Error('Invalid pubkey length');
  }

  const program = new anchor.Program(IDL as Contract, {
    connection: connection,
  });

  const id = new anchor.BN(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));

  const createSmartWalletIns = await program.methods
    .initSmartWallet(secp256k1PubkeyBytes, id)
    .accounts({
      signer: payer,
    })
    .instruction();

  const txn = new Transaction().add(createSmartWalletIns);

  txn.feePayer = payer;
  txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  return txn
    .serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    })
    .toString('base64');
}
