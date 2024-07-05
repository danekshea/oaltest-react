import logo from "./logo.svg";
import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { immutableZkEvmTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { SendTransaction } from "./send-transaction.tsx";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [immutableZkEvmTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ConnectButton />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </header>
      <div className="App-content">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <SendTransaction />
          </QueryClientProvider>
        </WagmiProvider>
      </div>
    </div>
  );
}

export default App;
