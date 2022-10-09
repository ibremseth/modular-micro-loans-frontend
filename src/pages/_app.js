import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  createClient,
  WagmiConfig,
  configureChains,
  chainId,
} from "wagmi";
import { rainbowWeb3AuthConnector } from "src/web3auth/RainbowWeb3authConnector";
import { publicProvider } from "wagmi/providers/public";
import AquaHeader from "src/components/header";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BACKEND_LINKS } from "src/constants";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const mumbaiChainId = 80001;
const goerliChainId = 5;

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === mumbaiChainId) {
          return { http: "https://polygon-mumbai-rpc.gateway.pokt.network" };
        } else if (chainId === goerliChainId) {
          return { http: "https://goerli-rpc.gateway.pokt.network" };
        } else {
          return null;
        }
      },
    }),
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
      wallet.coinbase({ chains }),
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

// Construct dynamic httpLinks from available networks
const constructGraphLinks = () => {
  const links = {};
  Object.entries(BACKEND_LINKS).map(([networkId, link]) => {
    links[networkId] = new HttpLink({
      uri: link.theGraph,
    });
  });

  return links;
};

const httpsLinks = Object.freeze(constructGraphLinks());

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().chainId === 5,
    httpsLinks[5],
    httpsLinks[5001]
  ),
  cache: new InMemoryCache(),
});

const App = (props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Body {...props} />
          </ThemeProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
