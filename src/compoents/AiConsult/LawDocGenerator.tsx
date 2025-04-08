import type React from "react"
import { useState } from "react"
import DisplayMessage from "./DisplayMessage"
import type { AdviceData, ComplaintData, Content, Parties } from "./types"
import ContraryInput from "./ContraryInput"
import ComplaintInput from "./ComplaintInput"
import AdviceInput from "./AdviceInput"
import { toast } from "react-toastify"

const LawDocGenerator = () => {
  const [model, setModel] = useState<string>("moonshot")
  const [documentType, setDocumentType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resultMessage, setResultMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const [contraryData, setContraryData] = useState<{
    title: string
    parties: Parties[]
    content: Content
    additional: string
  }>({
    title: "",
    parties: [{ type: "", name: "", details: "" }],
    content: {
      subject: "",
      purpose: "",
      location: "",
      sign_date: "",
      rights: "",
      obligations: "",
      start_date: "",
      end_date: "",
      performance: "",
      price: "",
      payment: "",
      breach: "",
      dispute: "",
      confidential: "",
      force: "",
      termination: "",
      additional: "",
    },
    additional: "",
  })

  const [complaintData, setComplaintData] = useState<ComplaintData>({
    court: "",
    plaintiff: { type: "原告", name: "", details: "" },
    defendant: { type: "被告", name: "", details: "" },
    claims: [],
    facts: "",
    evidence: [],
    law_basis: [],
    attachments: [],
  })

  const [adviceData, setAdviceData] = useState<AdviceData>({
    background: "",
    issues: [],
    analysis: "",
    risks: [],
    suggestions: [],
    references: [],
  })

  const SelectBar = () => {
    const buttonClass = (type: string) =>
      `px-3 py-1 text-sm rounded-lg transition-colors ${
        documentType === type ? "bg-[#5d76c5] text-white" : "bg-white hover:bg-gray-100 text-gray-800"
      }`

    return (
      <div className="flex flex-wrap gap-2 mb-3">
        <button type="button" className={buttonClass("contrary")} onClick={() => setDocumentType("contrary")}>
          生成法律合同
        </button>
        <button type="button" className={buttonClass("complaint")} onClick={() => setDocumentType("complaint")}>
          生成投诉状
        </button>
        <button type="button" className={buttonClass("advice")} onClick={() => setDocumentType("advice")}>
          生成法律意见
        </button>
      </div>
    )
  }

  const ToggleAiModel = () => {
    return (
      <div className="mb-3">
        <label htmlFor="ai-model-select" className="block text-sm font-medium text-gray-700 mb-1">
          选择AI模型:
        </label>
        <select
          id="ai-model-select"
          style={{ height: "30px" }}
          className="w-full md:w-60 px-3 py-0 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] text-gray-800 text-sm"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        >
          <option value="moonshot">Moonshot</option>
          <option value="deepseek-reasoner">Deepseek-R1</option>
          <option value="deepseek-chat">Deepseek-V3</option>
        </select>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!documentType) {
      toast.error("请选择文档类型")
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)

    try {
      let response

      // 获取token
      const token = localStorage.getItem("token")
      if (!token) {
        toast.error("请先登录")
        return
      }

      if (documentType === "contrary") {
        response = await fetch("/api/ai/contract", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            doc_type: "contrary",
            title: contraryData.title,
            parties: contraryData.parties,
            content: contraryData.content,
            additional: contraryData.additional,
          }),
        })
      } else if (documentType === "complaint") {
        response = await fetch("/api/ai/complain", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            content: complaintData,
          }),
        })
      } else if (documentType === "advice") {
        response = await fetch("/api/ai/opinion", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            content: adviceData,
          }),
        })
      }

      if (response && response.status === 200) {
        const data = await response.json()
        setResultMessage(data.data || data)

        toast.success("请求成功，正在处理...")
      } else {
        const errorData = await response?.json()
        console.error("请求失败:", errorData)
        toast.error("请求失败，请稍后再试")
      }
    } catch (error) {
      console.error("请求出错:", error)
      toast.error("请求出错，请稍后再试")
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-[#e3ebff]">
        <DisplayMessage messages={resultMessage} isLoading={isLoading} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between bg-white text-gray-800 rounded-lg p-2 mt-2 mx-4">
        <SelectBar />
        <ToggleAiModel />
      </div>

      <div className="p-4 bg-white text-gray-800 shadow-inner mx-4 mb-4 rounded-b-lg">
        {documentType === "contrary" && (
          <div className="overflow-y-auto max-h-64">
            <ContraryInput
              title={contraryData.title}
              parties={contraryData.parties}
              content={contraryData.content}
              additional={contraryData.additional}
              onChange={(data) => setContraryData(data)}
            />
          </div>
        )}

        {documentType === "complaint" && (
          <div className="overflow-y-auto max-h-64">
            <ComplaintInput complaintData={complaintData} onChange={(data) => setComplaintData(data)} />
          </div>
        )}

        {documentType === "advice" && (
          <div className="overflow-y-auto max-h-64">
            <AdviceInput adviceData={adviceData} onChange={(data) => setAdviceData(data)} />
          </div>
        )}

        {documentType && (
          <form onSubmit={handleSubmit} className="mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg transition-colors ${
                isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#5d76c5] hover:bg-[#3a5199] text-white"
              }`}
            >
              {isSubmitting ? "处理中..." : "提交请求"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default LawDocGenerator
