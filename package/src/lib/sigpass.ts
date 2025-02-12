/**
 * SIGPASS
 * 
 */

/**
 * Adopted https://github.com/hazae41/webauthnstorage
 * by Hazae41
 */

// evm
import { mnemonicToAccount } from 'viem/accounts'
// bip39
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { ec } from "elliptic";


async function genKey() {
  try {
    const curve = new ec("p256");
    const keyPair = curve.genKeyPair();
    const compressedPublicKey = keyPair.getPublic().encodeCompressed("hex");
    const compressedBase64 = Buffer.from(compressedPublicKey, "hex").toString("base64");
    return { privateKey: keyPair.getPrivate("hex"), publicKey: compressedBase64 };
  } catch (error) {
    return null;
  }
}
/**
 * Use WebAuthn to store authentication-protected arbitrary bytes
 *
 * @param name user-friendly name for the data
 * @param data arbitrary data of 64 bytes or less
 * @returns handle to the data
 */
async function createOrThrow(name: string, data: Uint8Array) {
  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
        rp: {
          id: location.hostname,
          name: location.hostname,
        },
        user: {
          id: data,
          name: name,
          displayName: name,
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -8 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          residentKey: "required",
          requireResidentKey: true,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Uint8Array((credential as any).rawId);
  } catch (error) {
    return null;
  }
}


/**
 * Use WebAuthn to retrieve authentication-protected arbitrary bytes
 *
 * @param id handle to the data
 * @returns data
 */
async function getOrThrow(id: Uint8Array) {
  try {
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array([117, 61, 252, 231, 191, 241]),
        allowCredentials: [{ type: "public-key", id }],
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Uint8Array((credential as any).response.userHandle);
  } catch (error) {
    return null;
  }
}


/**
 * Check if WebAuthn is supported
 * 
 * @returns boolean
 */
function checkBrowserWebAuthnSupport(): boolean {

  if (navigator.credentials) {
    return true;
  } else {
    return false;
  }
}


async function createSigpassWallet(name: string) {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  /**
   * Store the private key into authenticated storage
   */
  const handle = await createOrThrow(name, bytes);
  genKey();
  /**
   * Store the handle to the private key into some unauthenticated storage
   */
  if (!handle) {
    return null;
  }
  const cache = await caches.open("gmgn-storage");
  const request = new Request("gmgn-wallet");
  const response = new Response(handle);
  await cache.put(request, response);
  localStorage.setItem("WALLET_STATUS", "TRUE");

  // Return the handle
  if (handle) {
    return handle;
  } else {
    return null;
  }
}

async function checkSigpassWallet() {
  /**
   * Retrieve the handle to the private key from some unauthenticated storage
   */
  const status: string | null = localStorage.getItem("WALLET_STATUS");

  if (status) {
    return true;
  } else {
    return false;
  }
}

async function getSigpassWallet() {
  /**
   * Retrieve the handle to the private key from some unauthenticated storage
   */
  const cache = await caches.open("gmgn-storage");
  const request = new Request("gmgn-wallet");
  const response = await cache.match(request);
  const handle = response
    ? new Uint8Array(await response.arrayBuffer())
    : new Uint8Array();
  /**
   * Retrieve the private key from authenticated storage
   */
  const bytes = await getOrThrow(handle);
  if (!bytes) {
    return null;
  }
  const mnemonicPhrase = bip39.entropyToMnemonic(bytes, wordlist);
  // const privateKey = fromBytes(bytes, "hex");
  if (mnemonicPhrase) {
    // const account = privateKeyToAccount(privateKey as Address);
    // derive the evm account from mnemonic
    const evmAccount = mnemonicToAccount(mnemonicPhrase,
      {
        accountIndex: 0,
        addressIndex: 0,
      }
    );
    return evmAccount;
  } else {
    return null;
  }
}

export { createOrThrow, getOrThrow, checkBrowserWebAuthnSupport, createSigpassWallet, getSigpassWallet, checkSigpassWallet };