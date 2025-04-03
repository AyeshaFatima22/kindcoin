"use client"

const FormField = ({ labelName, placeholder, inputType, isTextArea, isCategory, value, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span
          className="font-quicksand font-medium text-sm
             leading-[22px] text-slate-600 dark:text-slate-300 mb-[10px]"
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-pink-200 dark:border-purple-800 bg-transparent font-epilogue dark:text-white text-sm placeholder:text-slate-400 text-slate-700 rounded-xl sm:min-w-[300px] focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-600 transition-all"
        />
      ) : isCategory ? (
        <select
          required
          value={value}
          onChange={handleChange}
          className="py-[17px] sm:px-[25px] px-[20px] outline-none border-[1px] border-pink-200 dark:border-purple-800 font-epilogue text-slate-800 dark:text-white text-sm rounded-xl sm:min-w-[300px] bg-white dark:bg-slate-800 focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-600 transition-all"
        >
          <option value="">Select any Category</option>
          <option value="Fundraiser">Fundraiser</option>
          <option value="Crisis Relief">Crisis Relief</option>
          <option value="Emergency">Emergency</option>
          <option value="Education">Education</option>
          <option value="Medical">Medical</option>
          <option value="Non-Profit">Non-Profit</option>
          <option value="Personal">Personal</option>
          <option value="Environment">Environment</option>
          <option value="Animals">Animals</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          min={0}
          step="0.01"
          onFocus={(e) =>
            e.target.addEventListener(
              "wheel",
              (e) => {
                e.preventDefault()
              },
              { passive: false },
            )
          }
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-pink-200 dark:border-purple-800 bg-transparent font-epilogue dark:text-white text-sm placeholder:text-slate-400 text-slate-700 rounded-xl sm:min-w-[300px] focus:ring-2 focus:ring-pink-300 dark:focus:ring-purple-600 transition-all"
        />
      )}
    </label>
  )
}

export default FormField

