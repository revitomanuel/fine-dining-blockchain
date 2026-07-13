import { network } from "hardhat";

async function main() {
    const { ethers } = await network.connect();

    console.log("Deploying CustomerStorage...");

    const CustomerStorage = await ethers.getContractFactory("CustomerStorage");

    const customerStorage = await CustomerStorage.deploy();

    await customerStorage.waitForDeployment();

    console.log("Deployment Success");
    console.log("Contract Address:", await customerStorage.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});