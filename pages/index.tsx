import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import ConnectStarkNetButton from "@/app/starknet/ConnectStarkNetButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>StarkNet React Cartridge</title>
        <meta name="description" content="StarkNet React Cartridge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex align="center" justify="center" minH="100vh">
        <ConnectStarkNetButton />
      </Flex>
    </>
  );
}
