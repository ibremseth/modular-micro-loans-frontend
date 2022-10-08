import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";

import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig, configureChains } from "wagmi";
import { rainbowWeb3AuthConnector } from "../web3auth/RainbowWeb3authConnector";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import AquaHeader from "../components/header";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI }),
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

const Body = ({ Component, pageProps }) => {
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
      <AquaHeader></AquaHeader>
      <Component {...pageProps} />
    </>
  );
};

const App = (props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Body {...props} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
