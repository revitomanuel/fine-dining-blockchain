import { createContext, useContext, useState } from "react";
import { connectWallet } from "../services/wallet/walletService";

const WalletContext = createContext();

export function WalletProvider({ children }) {

    const [wallet, setWallet] = useState(null);

    async function connect() {

        const result = await connectWallet();

        setWallet(result);

    }

    return (
        <WalletContext.Provider
            value={{
                wallet,
                connect
            }}
        >
            {children}
        </WalletContext.Provider>
    );

}

export function useWalletContext() {
    return useContext(WalletContext);
}