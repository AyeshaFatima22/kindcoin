# Blockchain-based Crowdfunding Platform: `KindCoin`

**KindCoin** is a blockchain-based decentralized platform that allows users to raise funds without intermediaries. Built on the **Ethereum blockchain**, it operates as a **Decentralized Application (DApp)**, ensuring transparency and security in crowdfunding.

## Why Blockchain-Based Crowdfunding?

- **Decentralization** – Eliminates the need for a central authority, reducing fees and increasing trust.
- **Transparency** – All transactions are recorded on the blockchain, allowing contributors to verify campaign legitimacy.
- **No Minimum Contribution** – Contributors can donate any amount.
- **Security & Immutability** – Blockchain ensures that campaign data cannot be tampered with.
- **Real-Time Monitoring** – Contributions and withdrawals can be tracked in real time.

## Technologies Utilized

- **Backend** ( **web3/** folder): Solidity, Hardhat
- **Frontend** ( **client/** folder): JavaScript, React.js, Tailwind CSS, Vite
- **Development Tools**: Hardhat for smart contract development and deployment

## Challenges Faced While Building

- Setting up and managing the **local Hardhat blockchain** for development
- Debugging **smart contracts** and optimizing Solidity code
- Ensuring **secure transactions** between users and campaign creators

## Installation & Setup

To install and run KindCoin locally, follow these steps:

### **1️⃣ Clone the Repository**
```bash
https://github.com/AyeshaFatima22/kindcoin
```

### **2️⃣ Navigate to the Web3 Directory & Install Dependencies**
```bash
cd web3
npm install
```

### **3️⃣ Start the Hardhat Local Blockchain**
```bash
npx hardhat node
```

### **4️⃣ Deploy the Smart Contract**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### **5️⃣ Connect MetaMask to Hardhat Network**
1. Open **MetaMask**
2. Add a **custom RPC network**:
   - **Network Name**: Hardhat
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `1337`
3. Import a test account from the Hardhat terminal output

### **6️⃣ Navigate to the Client Directory & Install Dependencies**
```bash
cd ../client
npm install
```

### **7️⃣ Start the Frontend**
```bash
npm run dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173) to use the KindCoin platform.

## How to Use KindCoin?

To interact with KindCoin, you need the **MetaMask** extension installed on your browser. You can download it from [here](https://metamask.io/download/).

- **Create a Campaign** – Set a goal and duration for your fundraising.
- **Donate ETH** – Support campaigns using MetaMask.
- **Withdraw Funds** – Campaign creators can withdraw funds if their target is met.

## Directory Structure

```
📂 kindcoin/
 ├── 📄 README.md             # Documentation
 ├── 📂 client/               # Frontend application
 │   ├── 📄 README.md
 │   ├── 📄 index.html
 │   ├── 📄 LICENSE.md
 │   ├── 📄 package.json
 │   ├── 📄 tailwind.config.js
 │   ├── 📄 vite.config.js
 │   ├── 📄 .gitignore
 │   ├── 📄 .env
 │   ├── 📂 src/
 │   │   ├── App.jsx
 │   │   ├── index.css
 │   │   ├── main.jsx
 │   │   ├── 📂 assets/
 │   │   ├── 📂 components/
 │   │   ├── 📂 constants/
 │   │   ├── 📂 context/
 │   │   ├── 📂 pages/
 │   │   └── 📂 utils/
 ├── 📂 web3/                 # Smart contract code
 │   ├── 📄 README.md
 │   ├── 📄 hardhat.config.js  # Hardhat configuration
 │   ├── 📄 package.json
 │   ├── 📂 contracts/
 │   │   ├── CrowdFunding.sol  # Smart contract
 │   ├── 📂 scripts/
 │   │   ├── deploy.js         # Deployment script
 │   ├── 📂 artifacts/
 │   ├── 📂 cache/
 │   ├── 📂 test/              # Smart contract tests (if added)
```

## Future Enhancements

- **UI Improvements** – Enhance campaign creation and contribution experience.
- **IPFS Integration** – Store campaign data in a decentralized manner.
- **Multi-Chain Deployment** – Expand to Polygon, Binance Smart Chain, etc.
- **NFT-based Rewards** – Incentivize contributors with digital assets.

## Contributors

1. [Ayesha Fatima](https://github.com/AyeshaFatima22)

## License

This project is licensed under the **MIT License**.

