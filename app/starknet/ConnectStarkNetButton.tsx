import { Button } from "@chakra-ui/react"
import { useAccount } from "@starknet-react/core"
import { useState } from "react"

import ConnectStarkNetModal from "./ConnectStarkNetModal"

type ConnectStarkNetButtonProps = {
  kind?: "default" | "error"
  label?: string | null
}

export default function ConnectStarkNetButton({
  label = "Connect StarkNet Wallet",
}: ConnectStarkNetButtonProps) {
  const { account, address, status } = useAccount()
  const [isOpen, setIsOpen] = useState(false)

  const shortAddress = address?.slice(0, 6) + "••••" + address?.slice(-4)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleClick() {
    openModal()
  }

  return (
    <>
      <Button onClick={handleClick}>
        {status === "disconnected" ? <>{label}</> : <>{shortAddress}</>}
      </Button>
      <ConnectStarkNetModal isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}
