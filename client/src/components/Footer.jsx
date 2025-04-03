const Footer = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full flex items-center justify-center theme-text-primary gap-2 font-epilogue p-4 mt-10 text-center shadow-soft">
      Copyright &copy; {1900 + new Date().getYear()}
      <a target="_blank" href="https://github.com/AyeshaFatima22/kindcoin" rel="noreferrer">
        <span className="inline-block text-center px-4 py-2 rounded-xl bg-pink-50 dark:bg-purple-900 text-pink-600 dark:text-pink-300 font-semibold transition-all hover:bg-pink-100 dark:hover:bg-purple-800">
          KindCoin
        </span>
      </a>
      All Rights Reserved.
    </div>
  )
}

export default Footer

