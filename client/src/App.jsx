import { WalletProvider } from "./context/WalletContext";
import AppRoutes from "./routes/AppRoutes";

function App() {

    return (
        <WalletProvider>
            <AppRoutes />
        </WalletProvider>
    );

}

export default App;