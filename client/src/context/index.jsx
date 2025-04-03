"use client"

import { useContext, createContext, useState, useEffect } from "react"
import { ethers } from "ethers"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { contractABI } from "../constants"

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  // Replace Thirdweb with direct ethers.js connection to local Hardhat node
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState("")
  const [campaigns, setCampaigns] = useState([])
  const [userCampaigns, setUserCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "System")

  // Initialize connection to local Hardhat node
  useEffect(() => {
    const initializeEthers = async () => {
      try {
        // Connect to local Hardhat node
        const hardhatProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
        setProvider(hardhatProvider)

        // Get the contract instance
        // Note: You'll need to deploy your contract to Hardhat and update this address
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Default Hardhat first deployment address
        const contractInstance = new ethers.Contract(contractAddress, contractABI, hardhatProvider)
        setContract(contractInstance)
      } catch (error) {
        console.error("Failed to initialize ethers:", error)
        toast.error("Failed to connect to local blockchain", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    }

    initializeEthers()
  }, [])

  // Connect to MetaMask
  const connectMetamask = async () => {
    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask to use this application", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return
      }

      setIsLoading(true)

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const account = accounts[0]
      setAddress(account)

      // Create Web3Provider using window.ethereum
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)

      // Set the network to match Hardhat's chainId
      try {
        // Request network change to localhost (chainId 1337)
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x539" }], // 0x539 is hex for 1337
        })
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x539", // 1337 in hex
                  chainName: "Localhost 8545",
                  nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["http://127.0.0.1:8545"],
                },
              ],
            })
          } catch (addError) {
            console.error("Error adding Ethereum chain:", addError)
            toast.error("Failed to add Hardhat network to MetaMask", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
            setIsLoading(false)
            return
          }
        } else {
          console.error("Error switching network:", switchError)
          toast.error("Failed to switch to Hardhat network", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          setIsLoading(false)
          return
        }
      }

      // Get the signer after ensuring we're on the right network
      const signerInstance = web3Provider.getSigner()
      setSigner(signerInstance)

      // Create contract instance with signer
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" // Default Hardhat first deployment address
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signerInstance)
      setContract(contractInstance)

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        } else {
          setAddress("")
          setSigner(null)
        }
      })

      setIsLoading(false)

      toast.success("Connected to MetaMask successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      setIsLoading(false)
      toast.error("Failed to connect to MetaMask", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  // Disconnect from MetaMask
  const disconnect = () => {
    setAddress("")
    setSigner(null)
    toast.info("Disconnected from MetaMask", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  // Theme handling
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
    const onWindowMatch = () => {
      if (localStorage.getItem("themeMode") === "Dark" || (!localStorage.getItem("themeMode") && systemTheme.matches)) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    onWindowMatch()

    systemTheme.addEventListener("change", onWindowMatch)

    return () => {
      systemTheme.removeEventListener("change", onWindowMatch)
    }
  }, [])

  const toggleTheme = (mode) => {
    setThemeMode(mode)
  }

  useEffect(() => {
    switch (themeMode) {
      case "Dark":
        document.documentElement.classList.add("dark")
        localStorage.setItem("themeMode", "Dark")
        break
      case "Light":
        document.documentElement.classList.remove("dark")
        localStorage.setItem("themeMode", "Light")
        break
      default:
        localStorage.removeItem("themeMode")
        break
    }
  }, [themeMode])

  // Load campaigns when contract is available
  useEffect(() => {
    if (contract) {
      getCampaigns()
    }
  }, [contract, address])

  // Create campaign
  const publishCampaign = async (form) => {
    try {
      if (!contract || !signer) {
        toast.error("Please connect to MetaMask first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return
      }

      setIsLoading(true)

      // Log the values for debugging
      console.log("Creating campaign with values:", {
        name: form.name,
        title: form.title,
        category: form.category,
        description: form.description,
        target: form.target,
        deadline: new Date(form.deadline).getTime(),
        image: form.image,
      })

      // Fix the deadline calculation - Solidity expects milliseconds
      const deadlineTimestamp = new Date(form.deadline).getTime()

      // Make sure target is properly formatted as a string before parsing
      const targetAmount = ethers.utils.parseEther(form.target.toString())

      const tx = await contract.createCampaign(
        form.name,
        form.title,
        form.category,
        form.description,
        targetAmount,
        deadlineTimestamp,
        form.image,
        { gasLimit: 3000000 }, // Add explicit gas limit
      )

      await tx.wait()

      toast.success("Campaign created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      console.log("Campaign created successfully", tx)
      await getCampaigns()
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast.error(`Error while creating Campaign: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update campaign
  const updateCampaign = async (form) => {
    if (isLoading) {
      console.log("Campaign update is already in progress. Skipping.")
      return
    }

    setIsLoading(true)

    try {
      if (!contract || !signer) {
        toast.error("Please connect to MetaMask first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setIsLoading(false)
        return
      }

      const tx = await contract.updateCampaign(
        form.id,
        form.name,
        form.title,
        form.category,
        form.description,
        ethers.utils.parseEther(form.target.toString()),
        new Date(form.deadline).getTime(),
        form.image,
        { gasLimit: 3000000 }, // Add explicit gas limit
      )

      await tx.wait()

      toast.success("Campaign updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      console.log("Contract update success", tx)
      await getCampaigns()
    } catch (error) {
      console.error("Error updating campaign:", error)
      toast.error(`Error while updating Campaign: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete campaign
  const deleteCampaign = async (id) => {
    try {
      if (!contract || !signer) {
        toast.error("Please connect to MetaMask first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return
      }

      setIsLoading(true)
      const tx = await contract.deleteCampaign(id, { gasLimit: 3000000 })
      await tx.wait()

      toast.success("Campaign deleted 🚮 successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      console.log("Campaign delete success", tx)
      await getCampaigns()
      return tx
    } catch (error) {
      console.error("Error deleting campaign:", error)
      toast.error(`Error while deleting Campaign: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Donate to campaign
  const donate = async (id, amount) => {
    try {
      if (!contract || !signer) {
        toast.error("Please connect to MetaMask first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return
      }

      setIsLoading(true)
      const tx = await contract.donateToCampaign(id, {
        value: ethers.utils.parseEther(amount),
        gasLimit: 3000000,
      })
      await tx.wait()

      toast.success("Campaign funded successfully. Thanks for collaboration😊", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      await getCampaigns()
      return tx
    } catch (error) {
      console.error("Error donating to campaign:", error)
      toast.error(`Error while Donating Campaign: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Withdraw donations
  const withdraw = async (id) => {
    try {
      if (!contract || !signer) {
        toast.error("Please connect to MetaMask first", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return
      }

      setIsLoading(true)
      const tx = await contract.withdrawDonations(id, { gasLimit: 3000000 })
      await tx.wait()

      toast.success("🤑 Campaign funds successfully withdrawn", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      await getCampaigns()
      return tx
    } catch (error) {
      console.error("Error withdrawing funds:", error)
      toast.error(`Error occurred while withdrawing funds: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Get all campaigns
  const getCampaigns = async () => {
    try {
      if (!contract) return

      setIsLoading(true)
      const campaigns = await contract.getCampaigns()

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        name: campaign.name,
        title: campaign.title,
        category: campaign.category,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        id: i,
      }))

      setCampaigns(parsedCampaigns)
      console.log("Campaigns loaded:", parsedCampaigns)
      return parsedCampaigns
    } catch (error) {
      console.error("Error getting campaigns:", error)
      toast.error(`Error loading campaigns: ${error.message || "Please try again"}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Get donations for a campaign
  const getDonations = async (id) => {
    try {
      if (!contract) return []

      const donations = await contract.getDonators(id)
      const numberOfDonations = donations[0].length
      const parsedDonations = []

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        })
      }

      return parsedDonations
    } catch (error) {
      console.error("Error getting donations:", error)
      return []
    }
  }

  // Get user campaigns
  const getUserCampaigns = async () => {
    try {
      setIsLoading(true)
      if (!address || !campaigns) {
        setUserCampaigns([])
        return
      }

      const filteredCampaigns = campaigns.filter((campaign) => campaign.owner.toLowerCase() === address.toLowerCase())

      setUserCampaigns(filteredCampaigns)
    } catch (error) {
      console.error("Error getting user campaigns:", error)
      setUserCampaigns([])
    } finally {
      setIsLoading(false)
    }
  }

  // Check connection status
  const connectionStatus = () => {
    if (!window.ethereum) return "unavailable"
    if (!address) return "disconnected"
    return "connected"
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connectMetamask,
        disconnect,
        connectionStatus: connectionStatus(),
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        withdraw,
        getDonations,
        deleteCampaign,
        updateCampaign,
        toggleTheme,
        themeMode,
        campaigns,
        isLoading,
        setIsLoading,
        userCampaigns,
      }}
    >
      <ToastContainer />
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)

