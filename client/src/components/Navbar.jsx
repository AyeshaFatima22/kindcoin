"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../context"
import { CustomConnectWallet, ThemeModes } from "./"
import { logo, menu, search } from "../assets"
import { navlinks } from "../constants"

const Navbar = () => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState("Dashboard")
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const { address } = useStateContext()

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-white dark:bg-slate-800 rounded-full shadow-soft">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-slate-400 text-slate-800 dark:text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-full bg-pink-500 dark:bg-purple-500 flex justify-center items-center cursor-pointer hover:bg-pink-600 dark:hover:bg-purple-600 transition-colors">
          <img src={search || "/placeholder.svg"} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomConnectWallet />
        <ThemeModes />
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-xl bg-white dark:bg-slate-800 flex justify-center items-center cursor-pointer shadow-soft">
          <img src={logo || "/placeholder.svg"} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu || "/placeholder.svg"}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-white dark:bg-slate-800 z-10 shadow-soft py-4 rounded-2xl ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && "bg-pink-50 dark:bg-purple-900"}`}
                onClick={() => {
                  setIsActive(link.name)
                  setToggleDrawer(false)
                  navigate(link.route)
                }}
              >
                <img
                  src={link.imgUrl || "/placeholder.svg"}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p
                  className={`ml-[20px] font-quicksand font-semibold text-[14px] ${
                    isActive === link.name ? "text-pink-600 dark:text-pink-400" : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomConnectWallet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

