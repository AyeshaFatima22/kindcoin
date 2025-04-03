const CountBox = ({ title = "", value = "" }) => {
  return (
    <div className="flex flex-col items-center w-[150px] shadow-soft">
      <h4 className="font-quicksand font-bold text-[30px] text-slate-800 dark:text-white p-3 bg-white dark:bg-slate-800 rounded-t-xl w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-slate-600 dark:text-slate-300 bg-pink-50 dark:bg-purple-900 px-3 py-2 w-full rounded-b-xl text-center">
        {title}
      </p>
    </div>
  )
}

export default CountBox

