import { ChakraProvider } from "@chakra-ui/react";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import CartridgeConnector from "@cartridge/connector";
import { RpcProvider } from "starknet";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
  // new CartridgeConnector(),
  new CartridgeConnector([], {
    // url: "http://localhost:3000",
    url: "https://x.cartridge.gg",
  }),
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StarknetConfig
        autoConnect
        connectors={connectors}
        defaultProvider={
          new RpcProvider({
            nodeUrl: "https://starknet-goerli.cartridge.gg/rpc/v0.2",
          })
        }
      >
        <Component {...pageProps} />
      </StarknetConfig>
    </ChakraProvider>
  );
}
