import { ethers } from "ethers";
import CustomerStorage from "../../abi/CustomerStorage.json";
import { CONTRACT_CONFIG } from "../../config/contract";

export async function getProvider() {
    if (!window.ethereum) {
        throw new Error("MetaMask tidak ditemukan.");
    }

    return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
    const provider = await getProvider();
    return await provider.getSigner();
}

export async function getContract() {
    const signer = await getSigner();

    return new ethers.Contract(
        CONTRACT_CONFIG.address,
        CustomerStorage.abi,
        signer
    );
}