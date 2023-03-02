import { ChakraProvider } from "@chakra-ui/react";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector";

import "@/styles/globals.css";

import type { AppProps } from "next/app";

const connectors = [
  new InjectedConnector({ options: { id: "braavos" } }),
  new InjectedConnector({ options: { id: "argentX" } }),
  new ControllerConnector(),
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StarknetConfig connectors={connectors} autoConnect>
        <Component {...pageProps} />
      </StarknetConfig>
    </ChakraProvider>
  );
}
