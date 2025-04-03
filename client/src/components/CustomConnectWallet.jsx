import { useStateContext } from "../context"
import CustomButton from "./CustomButton" // Using your existing CustomButton component

const CustomConnectWallet = () => {
  const { address, connectMetamask, disconnect } = useStateContext()

  const handleWalletAction = () => {
    if (!address) {
      connectMetamask()
    } else {
      const confirmDisconnect = window.confirm("Do you really want to Disconnect from MetaMask?")
      if (confirmDisconnect) {
        disconnect()
      }
    }
  }

  return (
    <CustomButton
      btnType="button"
      title={address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}
      styles={address ? "bg-[#ff3333]" : "bg-[#03dac5]"}
      handleClick={handleWalletAction}
    />
  )
}

export default CustomConnectWallet

