import { useState } from "react"

const Icon = ({ styles, name, imgUrl, isActive }) => {
  const [hovered, setHovered] = useState(false)
  const [fadeOutTimer, setFadeOutTimer] = useState(null)

  const handleMouseEnter = () => {
    setHovered(true)

    const timer = setTimeout(() => {
      setHovered(false)
    }, 1500)
    setFadeOutTimer(timer)
  }
  const handleMouseLeave = () => {
    setHovered(false)
    clearTimeout(fadeOutTimer)
  }

  return (
    <div
      className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center transition-all duration-300 ${
        isActive ? "bg-pink-100 dark:bg-purple-900" : ""
      } hover:bg-pink-50 dark:hover:bg-purple-800 ${styles}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovered && (
        <div className="absolute top-1 left-[4.5rem] bg-white dark:bg-purple-800 text-pink-600 dark:text-white py-2 px-3 rounded-xl font-quicksand shadow-soft">
          {name}
        </div>
      )}

      {!isActive ? (
        <img
          src={imgUrl || "/placeholder.svg"}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${name === "KindCoin" && "w-full h-full"}`}
        />
      ) : (
        <img
          src={imgUrl || "/placeholder.svg"}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${!isActive && "grayscale opacity-60"}`}
        />
      )}
    </div>
  )
}

export default Icon

