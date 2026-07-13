import { createContext, useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import CustomerStorageABI from "../abi/CustomerStorage.json";
import { CONTRACT_CONFIG } from "../config/contract";
import { NETWORK } from "../config/network";

const WalletContext = createContext();

export function WalletProvider({ children }) {

    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

    const checkNetwork = useCallback(async () => {
        if (!window.ethereum) return false;
        try {
            const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
            const chainId = parseInt(chainIdHex, 16);
            const correct = chainId === NETWORK.chainId;
            setIsCorrectNetwork(correct);
            return correct;
        } catch {
            setIsCorrectNetwork(false);
            return false;
        }
    }, []);

    const initContract = useCallback(async (signerInstance) => {
        try {
            const contractInstance = new ethers.Contract(
                CONTRACT_CONFIG.address,
                CustomerStorageABI.abi,
                signerInstance
            );
            setContract(contractInstance);
            return contractInstance;
        } catch (err) {
            console.error("Failed to initialize contract:", err);
            return null;
        }
    }, []);

    const connectWallet = useCallback(async () => {
        if (!window.ethereum) {
            alert("MetaMask belum terpasang. Silakan install MetaMask terlebih dahulu.");
            return;
        }

        try {
            setLoading(true);

            await window.ethereum.request({ method: "eth_requestAccounts" });

            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const signerInstance = await browserProvider.getSigner();
            const address = await signerInstance.getAddress();

            setProvider(browserProvider);
            setSigner(signerInstance);
            setAccount(address);

            await checkNetwork();
            await initContract(signerInstance);
        } catch (err) {
            console.error("Wallet connection failed:", err);
            alert("Gagal terhubung ke MetaMask.");
        } finally {
            setLoading(false);
        }
    }, [checkNetwork, initContract]);

    // Listen for account and chain changes
    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccountsChanged = async (accounts) => {
            if (accounts.length === 0) {
                setAccount(null);
                setContract(null);
                setSigner(null);
                setProvider(null);
            } else {
                const browserProvider = new ethers.BrowserProvider(window.ethereum);
                const signerInstance = await browserProvider.getSigner();
                setProvider(browserProvider);
                setSigner(signerInstance);
                setAccount(accounts[0]);
                await checkNetwork();
                await initContract(signerInstance);
            }
        };

        const handleChainChanged = () => {
            window.location.reload();
        };

        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);

        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, [checkNetwork, initContract]);

    // Auto-connect if already authorized
    useEffect(() => {
        const autoConnect = async () => {
            if (!window.ethereum) return;
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    await connectWallet();
                }
            } catch {
                // Silent fail for auto-connect
            }
        };
        autoConnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WalletContext.Provider
            value={{
                account,
                provider,
                signer,
                contract,
                loading,
                isCorrectNetwork,
                connectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export { WalletContext };
