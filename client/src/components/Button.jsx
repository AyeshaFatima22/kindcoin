const Button = ({ type, title, handleClick, styles, className = "", children, isDisabled = false }) => {
  return (
    <button
      type={type}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children || title}
    </button>
  )
}

export default Button

