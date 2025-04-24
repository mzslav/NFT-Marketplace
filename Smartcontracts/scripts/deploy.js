const hardhat = require("hardhat");

async function main() {
    const NFTMarketplace = await hardhat.ethers.getContractFactory("NFTMarketplace");
    const nftMarketPlace = await NFTMarketplace.deploy();
    await nftMarketPlace.waitForDeployment();

    console.log('NFTMarketplace contract deployed at:', nftMarketPlace.target);
}

main()
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
