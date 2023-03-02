import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useConnectors } from "@starknet-react/core";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";

// import argentXLogo from "#/public/argentx.png"
// import braavosLogo from "#/public/braavos.png"

// const LOGOS_BY_ID: Record<string, StaticImageData> = {
//   braavos: braavosLogo,
//   argentX: argentXLogo,
// }

// const LABELS_BY_ID: Record<string, string> = {
//   braavos: "Braavos",
//   argentX: "Argent X",
// }

type ConnectStarkNetModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function ConnectStarkNetModal({
  isOpen = false,
  closeModal,
}: ConnectStarkNetModalProps) {
  const { connect, connectors, refresh, disconnect } = useConnectors();
  const { account, address, status } = useAccount();
  const isDisconnected = status === "disconnected";
  const shortAddress = address?.slice(0, 6) + "••••" + address?.slice(-4);

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isDisconnected ? "Connect Wallet" : "Connected"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isDisconnected ? (
              <VStack className="flex flex-col space-y-4">
                {connectors.map((connector) => (
                  <Button
                    key={connector.id()}
                    onClick={() => connect(connector)}
                    w="full"
                  >
                    <Text className="text-lg font-medium">
                      {connector.id()}
                    </Text>
                    {/* <div className="text-lg font-medium">{LABELS_BY_ID[connector.id()]}</div> */}
                    {/* <Image
                      src={LOGOS_BY_ID[connector.id()]}
                      alt={connector.id()}
                      className=""
                      width={32}
                      height={32}
                      priority
                    /> */}
                  </Button>
                ))}
              </VStack>
            ) : (
              <Box className="text-center">
                <Text className="mb-4 text-lg font-medium">{shortAddress}</Text>
                <Button
                  className="flex h-[48px] w-full items-center justify-center space-x-2 rounded-xl bg-gray-100"
                  onClick={() => disconnect()}
                >
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H6C6.55228 14 7 13.5523 7 13C7 12.4477 6.55228 12 6 12H4C2.89543 12 2 11.1046 2 10V4C2 2.89543 2.89543 2 4 2H6C6.55228 2 7 1.55228 7 1C7 0.447715 6.55228 0 6 0H4ZM11.7071 3.29289C11.3166 2.90237 10.6834 2.90237 10.2929 3.29289C9.90237 3.68342 9.90237 4.31658 10.2929 4.70711L11.5858 6H9.5H6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8H9.5H11.5858L10.2929 9.29289C9.90237 9.68342 9.90237 10.3166 10.2929 10.7071C10.6834 11.0976 11.3166 11.0976 11.7071 10.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289L11.7071 3.29289Z"
                      fill="currentColor"
                      fillOpacity="0.4"
                    />
                  </svg>
                  <Text>Disconnect</Text>
                </Button>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
