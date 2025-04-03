import { tagType } from "../assets"
import { daysLeft } from "../utils"
import CustomButton from "./CustomButton"

const WithdrawCard = ({ id, title, category, target, deadline, amountCollected, image, handleClick }) => {
  const remainingDays = daysLeft(deadline)

  return (
    <div className="sm:w-[288px] w-full rounded-2xl bg-white dark:bg-slate-800 cursor-pointer shadow-soft hover:shadow-lg hover:scale-[0.98] focus:scale-[1.02] transition-all duration-300">
      <img src={image || "/placeholder.svg"} alt="fund" className="w-full h-[158px] object-cover rounded-t-2xl" />

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between mb-[18px]">
          <div className="flex items-center justify-center">
            <div className="bg-pink-100 dark:bg-purple-900 p-1 rounded-lg">
              <img src={tagType || "/placeholder.svg"} alt="tag" className="w-[17px] h-[17px] object-contain" />
            </div>
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-pink-600 dark:text-pink-400">
              {category}
            </p>
          </div>

          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] h-[17px] text-slate-500 dark:text-slate-400">
            Campaign Id: {id}
          </p>
        </div>

        <div className="block">
          <h3 className="font-quicksand font-semibold text-slate-800 dark:text-white text-left leading-[26px] truncate">
            {title}
          </h3>
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
              Days left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <CustomButton
            btnType="button"
            title="Withdraw from Campaign"
            styles="w-full bg-pink-500 dark:bg-purple-500 hover:bg-pink-600 dark:hover:bg-purple-600 !text-white cursor-pointer"
            handleClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default WithdrawCard

