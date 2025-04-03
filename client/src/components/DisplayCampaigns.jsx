import { useNavigate } from "react-router-dom"
import { loader } from "../assets"
import FundCard from "./FundCard"
import { v4 as uuidv4 } from "uuid"

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate()

  const handleNavigateDetails = (campaign) => {
    console.log("campaigns from DisplayCampaigns", campaign)
    navigate(`/campaign-details/${campaign.id}`)
  }
  return (
    <div>
      <h1 className="font-quicksand font-semibold text-xl theme-text-primary text-left">
        {title} <span className="text-pink-500 dark:text-pink-400">({campaigns?.length})</span>
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className="w-full flex justify-center">
            <img src={loader || "/placeholder.svg"} alt="loader" className="w-24 h-24 object-contain animate-pulse" />
          </div>
        )}
        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-medium text-sm leading-8 text-slate-500 dark:text-slate-400">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns?.length > 0 && (
          <>
            {campaigns?.map((campaign) => (
              <FundCard key={uuidv4()} {...campaign} handleClick={() => handleNavigateDetails(campaign)} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default DisplayCampaigns

