const hre = require("hardhat")

async function main() {
  console.log("Deploying CrowdFunding contract...")

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding")
  const crowdFunding = await CrowdFunding.deploy()

  await crowdFunding.deployed()

  console.log(`CrowdFunding deployed to: ${crowdFunding.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

