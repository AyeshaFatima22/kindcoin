const CustomButton = ({ btnType, title, handleClick, styles, isDisabled = false }) => {
  return (
    <button
      type={btnType}
      className={`font-quicksand font-semibold dark:text-white text-white min-h-[52px] px-4 rounded-xl transition-all duration-300 hover:scale-98 focus:scale-102 outline-none focus:ring-4 ring-pink-200 dark:ring-purple-400 shadow-button ${styles} ${
        isDisabled && "opacity-60 cursor-not-allowed"
      }`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton

