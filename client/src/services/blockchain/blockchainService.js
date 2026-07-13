import { ethers } from "ethers";
import CustomerStorage from "../../abi/CustomerStorage.json";
import { CONTRACT_CONFIG } from "../../config/contract";

export async function getContract() {

    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return new ethers.Contract(
        CONTRACT_CONFIG.address,
        CustomerStorage.abi,
        signer
    );

}