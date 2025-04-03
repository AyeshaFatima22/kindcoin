import { useStateContext } from "../context"
import CustomButton from "./CustomButton"

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
      styles={
        address
          ? "bg-red-400 hover:bg-red-500"
          : "bg-pink-500 hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600"
      }
      handleClick={handleWalletAction}
    />
  )
}

export default CustomConnectWallet

