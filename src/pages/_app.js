import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";

import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig, configureChains } from "wagmi";
import { rainbowWeb3AuthConnector } from "../web3auth/RainbowWeb3authConnector";

// import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from "wagmi/providers/public";
import AquaHeader from "../components/header";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.metaMask({ chains }),
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
      rainbowWeb3AuthConnector({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  connectors,
  provider,
});

const Body = ({ Component, pageProps, apollo }) => {
  return (
    <>
      <Head>
        <title>Aqua Sin Gas</title>
        {/* Safari favicon */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>{" "}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

const App = (props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AquaHeader></AquaHeader>
        <Body {...props} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
