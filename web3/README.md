# KindCoin 

This project is a **decentralized crowdfunding platform** that removes intermediaries, allowing users to create and fund campaigns directly on the blockchain.  

## Features  
✅ **Create Campaigns** – Users can set up fundraising campaigns with a target goal.  
✅ **Donate Funds** – Contributors can donate ETH to campaigns.  
✅ **Withdraw Funds** – Campaign creators can withdraw funds once the goal is met.  
✅ **Blockchain-Powered** – Fully decentralized using **Ethereum & Hardhat**.  

---

## 🛠 Project Setup  

### 1️⃣ Install Dependencies  
Navigate to the `web3/` directory and run:  

```bash
cd web3
npm install
```

### 2️⃣ Start Hardhat Local Blockchain  
Run a local blockchain for development:  

```bash
npx hardhat node
```

### 3️⃣ Deploy Smart Contract  
Deploy the **CrowdFunding.sol** contract to the local Hardhat network:  

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4️⃣ Connect MetaMask to Hardhat Network  
- Open **MetaMask**  
- Add a **custom RPC network**:  
  - **Network Name**: Hardhat  
  - **RPC URL**: `http://127.0.0.1:8545`  
  - **Chain ID**: `31337`  
- Import one of the test accounts displayed in the Hardhat terminal  

### 5️⃣ Test Smart Contract Functions  
Interact with the contract using Hardhat's console:  

```bash
npx hardhat console --network localhost
```

Example commands:  

```javascript
const Contract = await ethers.getContractFactory("CrowdFunding");
const contract = await Contract.deploy();
await contract.deployed();
console.log("Contract deployed at:", contract.address);
```

---

## 📂 Directory Structure  

```
📂 web3/
 ├── 📄 README.md             # Documentation
 ├── 📄 hardhat.config.js      # Hardhat configuration
 ├── 📄 package.json           # Dependencies
 ├── 📄 package-lock.json      # Lock file
 ├── 📄 .gitignore             # Ignore unnecessary files
 ├── 📂 contracts/             # Solidity smart contracts
 │   └── 📄 CrowdFunding.sol   # Main contract
 ├── 📂 scripts/               # Deployment scripts
 │   └── 📄 deploy.js          # Contract deployment script
 └── 📂 test/                  # Add test cases here (if needed)
```

---

## 🚀 Future Enhancements  
🔹 **IPFS Storage** – Store campaign images & data on IPFS  
🔹 **Multi-Chain Support** – Expand to Polygon, Binance Smart Chain, etc.  

## 🤝 Contributing  
Feel free to contribute! Fork the repo, create a new branch, and submit a pull request.  