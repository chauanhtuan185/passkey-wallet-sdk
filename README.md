[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Status: In Development](https://img.shields.io/badge/Status-In%20Development-yellow)
# SDK for Passkey-Based Solana Interaction

Welcome to the SDK for Passkey-Based Solana Interaction! This SDK enables developers to integrate Passkey-based authentication and transaction signing into their Solana decentralized applications (dApps). With this SDK, users can create Solana accounts directly using a Passkey, interact with on-chain programs, and enjoy a seamless login experience without the need for external wallets.

## Key Features

### Passkey-Based Wallet Creation
- **No External Wallets Needed**: Users can generate Solana accounts directly using a Passkey, eliminating the need for external wallet installations.
- **Secure Authentication**: Leveraging the FIDO2/WebAuthn standards, the SDK ensures secure and user-friendly authentication.

### On-Chain Program Interaction
- **Passkey-Based Signatures**: dApps can interact with Solana smart contracts using Passkey-based signatures.
- **Re-layer Integration**: The Re-layer acts as an intermediary layer to prepare custom instructions for the program, ensuring compatibility with Solana's PDA structure.

### User-Friendly Login with Passkey
- **Intuitive UI Component**: A user-friendly UI component allows users to authenticate with Passkey and manage their Solana accounts seamlessly.
- **One-Click Authentication**: Enable one-click authentication for a seamless user experience.

### Technical Approach
- **FIDO2/WebAuthn Standards**: Implement FIDO2/WebAuthn standards to support Passkey authentication.
- **secp256r1 Elliptic Curve**: Utilize the secp256r1 elliptic curve to generate and sign Solana transactions, ensuring compatibility with modern authentication standards.
- **SDK Modules**: Develop SDK modules for easy integration with Solana dApps.
- **Frontend UI Library**: Build a frontend UI library for Passkey login integration.

## Getting Started

To get started with the SDK, follow these steps:

1. **Install the SDK**:
   ```bash
   npm install @solana/passkey-sdk
   ```

2. **Initialize the SDK**:
   Configure the SDK with your desired network and relayer URL.

3. **Create a Solana Account with Passkey**:
   Use the SDK to generate a Solana account directly using a Passkey.

4. **Authenticate with Passkey**:
   Authenticate users seamlessly with the Passkey login UI component.

5. **Interact with Solana Smart Contracts**:
   Sign and send transactions to Solana smart contracts using Passkey-based signatures.

## 🤝 Contributing

We welcome contributions from the community! Please:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a Pull Request with a detailed description of your changes.

---

## 📜 License

This project is licensed under the **[MIT License](LICENSE)**.

---

## 📬 Contact

- **GitHub Issues**: [Report Bugs/Suggestions](https://github.com/chauanhtuan185/Passkey-Wallet-SDK/issues)
- **Telegram**: [Kay](https://t.me/kayx64) or [Chau Khac](https://t.me/chaukhac)
