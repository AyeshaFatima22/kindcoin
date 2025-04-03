"use client"

import { useState } from "react"

const Expandable = ({ children, maxChars = 300 }) => {
  const [expanded, setExpanded] = useState(true)

  if (children?.length <= maxChars) return <p>{children}</p>

  const text = expanded ? children?.substring(0, maxChars) : children

  return (
    <div>
      <p className="font-epilogue font-normal theme-text-secondary leading-[26px] text-justify">{text}...</p>
      <span
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer font-epilogue font-medium text-pink-500 dark:text-pink-400 leading-[26px] text-justify hover:underline"
      >
        {expanded ? "Read More »" : "« Read Less"}
      </span>
    </div>
  )
}

export default Expandable

