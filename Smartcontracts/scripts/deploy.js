async function main() {
    const [deployer] = await ethers.getSigners(); // отримуємо підписувача (ваш гаманець)

    console.log("Deploying contracts with the account:", await deployer.getAddress());

    // Отримуємо контракт
    const MyNFT = await ethers.getContractFactory("MyNFT");
    
    // Розгортаємо контракт
    const myNft = await MyNFT.deploy();
    console.log("MyNFT contract deployed to:", myNft.getAddress());
}

// Запускаємо основну функцію
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
