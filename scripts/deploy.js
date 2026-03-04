const hre = require("hardhat");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

    console.log("Deploying contracts to Sepolia...\n");

    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with account:", deployer.address);

    /*
    ==========================
    Deploy NFT
    ==========================
    */

    console.log("\nDeploying NFT contract...");

    const NFT = await hre.ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    await nft.waitForDeployment();

    const nftAddress = await nft.getAddress();

    console.log("NFT deployed:", nftAddress);

    /*
    ==========================
    Deploy Marketplace
    ==========================
    */

    console.log("\nDeploying Marketplace contract...");

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");

    const marketplace = await Marketplace.deploy();

    await marketplace.waitForDeployment();

    const marketplaceAddress = await marketplace.getAddress();

    console.log("Marketplace deployed:", marketplaceAddress);

    console.log("\nWaiting for block confirmations...");

    await nft.deploymentTransaction().wait(6);
    await marketplace.deploymentTransaction().wait(6);

    /*
    ==========================
    WAIT BEFORE VERIFY
    ==========================
    */

    console.log("\nWaiting 30 seconds before verification...");
    await sleep(30000);

    /*
    ==========================
    Verify NFT
    ==========================
    */

    try {
        await hre.run("verify:verify", {
            address: nftAddress,
            constructorArguments: [],
        });

        console.log("NFT verified successfully");
    } catch (error) {
        console.log("NFT verification failed:", error.message);
    }

    /*
    ==========================
    Verify Marketplace
    ==========================
    */

    try {
        await hre.run("verify:verify", {
            address: marketplaceAddress,
            constructorArguments: [],
        });

        console.log("Marketplace verified successfully");
    } catch (error) {
        console.log("Marketplace verification failed:", error.message);
    }

    console.log("\n==========================");
    console.log("DEPLOYMENT COMPLETE");
    console.log("==========================\n");

    console.log("NFT:", nftAddress);
    console.log("Marketplace:", marketplaceAddress);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});