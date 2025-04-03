"use client"
import { useNavigate } from "react-router-dom"
import { tagType } from "../assets"
import { daysLeft } from "../utils"
import Jazzicon, { jsNumberForAddress } from "react-jazzicon"

const FundCard = ({
  id,
  owner,
  name,
  title,
  category,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline)
  const navigate = useNavigate()
  const handleNavigateDetails = () => {
    navigate(`/campaign-details/${id}`)
  }
  return (
    <div
      className="sm:w-[288px] w-full rounded-2xl bg-white dark:bg-slate-800 cursor-pointer shadow-soft hover:shadow-lg hover:scale-[0.98] focus:scale-[1.02] transition-all duration-300"
      onClick={handleClick || handleNavigateDetails}
    >
      <img src={image || "/placeholder.svg"} alt="fund" className="w-full h-[158px] object-cover rounded-t-2xl" />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <div className="bg-pink-100 dark:bg-purple-900 p-1 rounded-lg">
            <img src={tagType || "/placeholder.svg"} alt="tag" className="w-[17px] h-[17px] object-contain" />
          </div>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-pink-600 dark:text-pink-400">
            {category}
          </p>
        </div>
        <div className="block">
          <h3 className="font-quicksand font-semibold text-slate-800 dark:text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-left leading-[18px] truncate text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-quicksand font-semibold text-sm text-pink-600 dark:text-pink-400 leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-slate-500 dark:text-slate-400 sm:max-w-[120px] truncate">
              Raised out of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-quicksand font-semibold text-sm text-pink-600 dark:text-pink-400 leading-[22px] text-center">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-slate-500 dark:text-slate-400 sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-pink-100 dark:bg-purple-900 overflow-hidden">
            <Jazzicon className="w-1/2 h-1/2 object-contain" diameter={30} seed={jsNumberForAddress(`${owner}`)} />
          </div>
          <div className="flex-1 font-epilogue font-normal text-[12px] text-slate-500 dark:text-slate-400 truncate">
            by <span className="font-epilogue leading-[22px] text-pink-600 dark:text-pink-400">{name}</span>
            <div className="flex flex-col">
              <span className="font-epilogue font-normal text-[12px] text-slate-500 dark:text-slate-400 leading-[18px] sm:max-w-[120px] truncate">
                {owner}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundCard

