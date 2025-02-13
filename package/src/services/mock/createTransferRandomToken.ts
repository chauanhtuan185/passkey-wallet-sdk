import {
  Keypair,
  Pubkey,
  Connection,
  TranasctionInstruction,
} from '@solana/web3.js';
import {
  createMint,
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token';
import bs58 from 'bs58';

import dotenv from 'dotenv';

dotenv.config();

export async function createTransferRandomToken({
  smartWalletPubkey,
  connection,
  amount = 10 * 10 ** 6,
}: {
  smartWalletPubkey: Pubkey;
  connection: Connection;
  amount: number;
}): Promise<TranasctionInstruction> {
  // get wallet
  const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

  /// create mint
  const mint = await createMint(
    connection,
    wallet,
    wallet.publicKey,
    wallet.publicKey,
    6
  );

  // create ata for smart wallet
  const smartWalletAta = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    smartWalletPubkey,
    true
  );

  // mint to smart wallet
  mintTo(
    connection,
    wallet,
    mint,
    smartWalletAta.address,
    wallet.publicKey,
    amount
  );

  // create ata for wallet
  const walletAta = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    wallet.publicKey,
    false
  );

  return createTransferCheckedInstruction(
    smartWalletAta.address,
    mint,
    walletAta.address,
    smartWalletPubkey,
    amount,
    6
  );
}
