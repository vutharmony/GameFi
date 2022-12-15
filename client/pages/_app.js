import {EthereumClient, modalConnectors, walletConnectProvider} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react"; 

import Navbar from '../components/Navbar/Navbar';
import "../styles/globals.css";

const chains = [arbitrum, mainnet, polygon, polygonMumbai];

const provider = configureChains(chains, [
  walletConnectProvider({projectId: "b08c4d212ce5bfdb690669143407dfd1"})
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({appName: "GameFi", chains}),
  provider
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <Component {...pageProps} />
      </WagmiConfig>
      <Web3Modal
        themeColor="green"
        themeMode="light"
        projectId="b08c4d212ce5bfdb690669143407dfd1"
        ethereumClient={ethereumClient}
      />
    </div>
    )
}

export default MyApp
