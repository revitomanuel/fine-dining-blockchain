import { ethers } from "ethers";

export async function connectWallet() {

    if (!window.ethereum) {
        throw new Error("MetaMask belum terpasang.");
    }

    await window.ethereum.request({
        method: "eth_requestAccounts"
    });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return {
        address: await signer.getAddress()
    };
}