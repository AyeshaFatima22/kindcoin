import { loader } from "../assets"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(255,242,248,0.8)] dark:bg-[rgba(30,20,40,0.8)] flex items-center justify-center flex-col">
      <div className="w-24 h-24 animate-pulse">
        <img className="w-full h-full" src={loader || "/placeholder.svg"} alt="loader" />
      </div>
      <p className="mt-[20px] font-quicksand text-[20px] text-center text-pink-600 dark:text-pink-300 font-bold">
        Transaction is in progress <br />
        Please wait...
      </p>
    </div>
  )
}

export default Loader

