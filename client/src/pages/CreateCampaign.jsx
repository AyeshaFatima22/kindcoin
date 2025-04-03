import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../context"
import { money } from "../assets"
import { CustomButton, FormField, Loader } from "../components"
import { checkIfImage } from "../utils"

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { createCampaign } = useStateContext()
  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({
          ...form,
          target: form.target,
        })
        setIsLoading(false)
        navigate("/")
      } else {
        alert("Provide valid image URL")
        setForm({ ...form, image: "" })
      }
    })
  }
  return (
    <div className="bg-white dark:bg-slate-800 flex justify-center items-center flex-col rounded-2xl sm:p-10 p-4 shadow-soft">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-pink-50 dark:bg-purple-900 rounded-xl">
        <h1 className="font-quicksand font-bold sm:text-[25px] text-lg leading-[38px] text-pink-600 dark:text-white">
          Start a Campaign
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="e.g. Kiran Mahajan"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />

          <FormField
            labelName="Campaign Title *"
            placeholder="e.g. Funds for Tamilnadu floods"
            compai
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />

          <FormField
            labelName="Select Category *"
            isCategory
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story here"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full flex justify-center items-center p-4 bg-pink-100 dark:bg-purple-900 h-[120px] rounded-xl">
          <img src={money || "/placeholder.svg"} alt="money" className="w-10 h-10 object-contain" />
          <h4 className="font-quicksand font-bold text-[25px] text-pink-600 dark:text-white ml-5">
            You'll get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="e.g. ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />

          <FormField
            labelName="End Date *"
            placeholder="e.g. Till Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit New Campaign"
            styles="bg-pink-500 dark:bg-purple-500 hover:bg-pink-600 dark:hover:bg-purple-600"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign

