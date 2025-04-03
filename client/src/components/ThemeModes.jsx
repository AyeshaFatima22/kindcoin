import { useState } from "react"
import { themeModes } from "../constants"
import { useStateContext } from "../context"

const ThemeModes = () => {
  const { toggleTheme, themeMode } = useStateContext()
  const [isThemeActive, setIsThemeActive] = useState(themeMode)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [hoveredTimeout, setHoveredTimeout] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredIndex(index)

    clearTimeout(hoveredTimeout)

    const timeout = setTimeout(() => {
      setHoveredIndex(null)
    }, 1000)

    setHoveredTimeout(timeout)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoveredTimeout)
    setHoveredIndex(null)
  }

  return (
    <>
      {themeModes.map((mode, index) => (
        <div
          key={mode.name}
          className={`relative w-12 h-12 rounded-xl cursor-pointer flex justify-center items-center transition-all duration-300 ${
            isThemeActive === mode.name ? "bg-pink-100 dark:bg-purple-900" : ""
          } hover:bg-pink-50 dark:hover:bg-purple-800`}
          onClick={() => {
            toggleTheme(mode.name)
            setIsThemeActive(mode.name)
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredIndex === index && (
            <div className="z-30 absolute sm:top-1 sm:left-[4.5rem] top-16 bg-white dark:bg-purple-800 text-pink-600 dark:text-white py-2 px-3 rounded-xl font-quicksand shadow-soft">
              {mode.name}
            </div>
          )}

          <img
            src={mode.imgUrl || "/placeholder.svg"}
            alt="Theme Mode"
            className={`w-1/2 h-1/2 ${isThemeActive !== mode.name && "grayscale opacity-60"}`}
          />
        </div>
      ))}
    </>
  )
}

export default ThemeModes

