const Button = ({ type, title, handleClick, styles, className = "", children, isDisabled = false }) => {
  return (
    <button
      type={type}
      className={`font-quicksand font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-xl shadow-button transition-all duration-300 hover:scale-[0.98] focus:scale-[1.02] ${styles} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children || title}
    </button>
  )
}

export default Button

