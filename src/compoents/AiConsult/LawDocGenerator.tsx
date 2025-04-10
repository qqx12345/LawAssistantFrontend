import type React from "react"
import { useState } from "react"
import DisplayMessage from "./DisplayMessage"
import type { AdviceData, ComplaintData, Content, Parties } from "./types"
import ContraryInput from "./ContraryInput"
import ComplaintInput from "./ComplaintInput"
import AdviceInput from "./AdviceInput"
import { showToast } from "../../utils/toast"
import { fetchWithAuth } from "../../utils/api"
import { AIModelSelector, SubmitButton } from "../../utils/ui"

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!documentType) {
      showToast("请选择文档类型", "error")
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)

    try {
      // 确定要使用的API端点和请求数据
      let endpoint = "";
      let requestData = {};

      if (documentType === "contrary") {
        endpoint = "/api/ai/contract";
        requestData = {
          model,
          doc_type: "contrary",
          title: contraryData.title,
          parties: contraryData.parties,
          content: contraryData.content,
          additional: contraryData.additional,
        };
      } else if (documentType === "complaint") {
        endpoint = "/api/ai/complain";
        requestData = {
          model,
          content: complaintData,
        };
      } else if (documentType === "advice") {
        endpoint = "/api/ai/opinion";
        requestData = {
          model,
          content: adviceData,
        };
      }

      // 使用fetchWithAuth发送请求
      const result = await fetchWithAuth(endpoint, "POST", requestData);
      
      setResultMessage(result.data || result);
      showToast("请求成功，正在处理...", "success");
    } catch (error) {
      console.error("请求出错:", error);
      showToast("请求出错，请稍后再试", "error");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-[#e3ebff]">
        <DisplayMessage messages={resultMessage} isLoading={isLoading} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between bg-white text-gray-800 rounded-lg p-2 mt-2 mx-4">
        <SelectBar />
        <AIModelSelector 
          model={model} 
          setModel={setModel}
        />
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
            <SubmitButton
              isSubmitting={isSubmitting}
              isDisabled={!documentType}
              text="提交请求"
              loadingText="处理中..."
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default LawDocGenerator
