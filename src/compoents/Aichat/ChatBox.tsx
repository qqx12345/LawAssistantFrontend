import type React from "react"

import { useState, useRef, useEffect } from "react"
import { token } from "../../share/share"
import type { ComplaintData, Content, ContraryInputProps, Parties } from "./props"

// 合同生成表单
const ContraryInput = ({ title, parties, content, additional, onChange }: ContraryInputProps) => {
  // 标签+输入框组件
  const FormField = ({ label, id, value, onChange, placeholder = "", textarea = false, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={4}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}
    </div>
  )

  const partiesSection = (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
      <h3 className="text-lg font-medium text-[#3a5199] dark:text-blue-400 mb-4">当事方信息</h3>
      <div className="space-y-4">
        <FormField
          label="当事人姓名"
          id="party-name"
          value={parties[0].name}
          onChange={(e) => {
            const newParties = [{ ...parties[0], name: e.target.value }]
            onChange({ title, parties: newParties, content, additional })
          }}
          placeholder="输入当事人姓名"
        />
        <FormField
          label="当事人类型"
          id="party-type"
          value={parties[0].type}
          onChange={(e) => {
            const newParties = [{ ...parties[0], type: e.target.value }]
            onChange({ title, parties: newParties, content, additional })
          }}
          placeholder="如：甲方、公司等"
        />
        <FormField
          label="当事人详情"
          id="party-details"
          value={parties[0].details}
          onChange={(e) => {
            const newParties = [{ ...parties[0], details: e.target.value }]
            onChange({ title, parties: newParties, content, additional })
          }}
          placeholder="详细描述，例如：住所地、法定代表人等"
          textarea={true}
        />
      </div>
    </div>
  )

  const contentSection = (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
      <h3 className="text-lg font-medium text-[#3a5199] dark:text-blue-400 mb-4">合同内容</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="合同主题"
          id="content-subject"
          value={content.subject}
          onChange={(e) => {
            const newContent = { ...content, subject: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="例如：房屋租赁"
        />
        <FormField
          label="合同目的"
          id="content-purpose"
          value={content.purpose}
          onChange={(e) => {
            const newContent = { ...content, purpose: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="合同订立的目的"
        />
        <FormField
          label="履行地点"
          id="content-location"
          value={content.location}
          onChange={(e) => {
            const newContent = { ...content, location: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="例如：北京市朝阳区"
        />
        <FormField
          label="签订日期"
          id="content-sign-date"
          value={content.sign_date}
          onChange={(e) => {
            const newContent = { ...content, sign_date: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="YYYY-MM-DD"
        />
        <FormField
          label="权利"
          id="content-rights"
          value={content.rights}
          onChange={(e) => {
            const newContent = { ...content, rights: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="当事人的权利"
        />
        <FormField
          label="义务"
          id="content-obligations"
          value={content.obligations}
          onChange={(e) => {
            const newContent = { ...content, obligations: e.target.value }
            onChange({ title, parties, content: newContent, additional })
          }}
          placeholder="当事人的义务"
        />
      </div>
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#3a5199] dark:text-blue-400 mb-6">生成法律合同</h2>

      <FormField
        label="合同标题"
        id="title"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, parties, content, additional })}
        placeholder="输入合同标题"
        className="mb-6"
      />

      {partiesSection}
      {contentSection}

      <FormField
        label="附加信息"
        id="additional"
        value={additional}
        onChange={(e) => onChange({ title, parties, content, additional: e.target.value })}
        placeholder="其他需要说明的信息"
        textarea={true}
        className="mb-4"
      />
    </div>
  )
}

// 投诉状表单
const ComplaintInput = ({
  complaintData,
  onChange,
}: {
  complaintData: ComplaintData
  onChange: (data: ComplaintData) => void
}) => {
  // 标签+输入框组件
  const FormField = ({ label, id, value, onChange, placeholder = "", textarea = false, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={4}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      )}
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#3a5199] dark:text-blue-400 mb-6">生成投诉状</h2>

      <FormField
        label="受理法院"
        id="court"
        value={complaintData.court}
        onChange={(e) => onChange({ ...complaintData, court: e.target.value })}
        placeholder="例如：北京市朝阳区人民法院"
        className="mb-6"
      />

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] dark:text-blue-400 mb-4">原告信息</h3>
        <div className="space-y-4">
          <FormField
            label="原告姓名"
            id="plaintiff-name"
            value={complaintData.plaintiff.name}
            onChange={(e) =>
              onChange({ ...complaintData, plaintiff: { ...complaintData.plaintiff, name: e.target.value } })
            }
            placeholder="输入原告姓名"
          />
          <FormField
            label="原告详情"
            id="plaintiff-details"
            value={complaintData.plaintiff.details}
            onChange={(e) =>
              onChange({ ...complaintData, plaintiff: { ...complaintData.plaintiff, details: e.target.value } })
            }
            placeholder="详细描述，例如：住所地、联系方式等"
            textarea={true}
          />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] dark:text-blue-400 mb-4">被告信息</h3>
        <div className="space-y-4">
          <FormField
            label="被告姓名"
            id="defendant-name"
            value={complaintData.defendant.name}
            onChange={(e) =>
              onChange({ ...complaintData, defendant: { ...complaintData.defendant, name: e.target.value } })
            }
            placeholder="输入被告姓名"
          />
          <FormField
            label="被告详情"
            id="defendant-details"
            value={complaintData.defendant.details}
            onChange={(e) =>
              onChange({ ...complaintData, defendant: { ...complaintData.defendant, details: e.target.value } })
            }
            placeholder="详细描述，例如：住所地、联系方式等"
            textarea={true}
          />
        </div>
      </div>

      <FormField
        label="诉讼请求 (逗号分隔)"
        id="claims"
        value={complaintData.claims.join(",")}
        onChange={(e) => onChange({ ...complaintData, claims: e.target.value.split(",").map((s) => s.trim()) })}
        placeholder="例如：判令被告赔偿损失10000元,判令被告公开道歉"
        className="mb-4"
      />

      <FormField
        label="事实与理由"
        id="facts"
        value={complaintData.facts}
        onChange={(e) => onChange({ ...complaintData, facts: e.target.value })}
        placeholder="详细描述案件事实经过和理由依据"
        textarea={true}
        className="mb-4"
      />

      <FormField
        label="证据 (逗号分隔)"
        id="evidence"
        value={complaintData.evidence.join(",")}
        onChange={(e) => onChange({ ...complaintData, evidence: e.target.value.split(",").map((s) => s.trim()) })}
        placeholder="例如：合同原件,付款凭证,短信记录"
        className="mb-4"
      />

      <FormField
        label="法律依据 (逗号分隔)"
        id="law_basis"
        value={complaintData.law_basis.join(",")}
        onChange={(e) => onChange({ ...complaintData, law_basis: e.target.value.split(",").map((s) => s.trim()) })}
        placeholder="例如：《合同法》第107条,《民法典》第577条"
        className="mb-4"
      />

      <FormField
        label="附件 (逗号分隔)"
        id="attachments"
        value={complaintData.attachments.join(",")}
        onChange={(e) => onChange({ ...complaintData, attachments: e.target.value.split(",").map((s) => s.trim()) })}
        placeholder="例如：身份证复印件,原告资格证明"
        className="mb-4"
      />
    </div>
  )
}

// 法律意见表单
const AdviceInput = ({ userMessage, setUserMessage }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#3a5199] dark:text-blue-400 mb-6">获取法律意见</h2>

      <div className="space-y-2">
        <label htmlFor="advice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          法律问题描述
        </label>
        <textarea
          id="advice"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="请详细描述您的法律问题，以便我们提供专业的法律意见..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={6}
        />
      </div>
    </div>
  )
}

// 聊天输入组件
const ChatInput = ({ userChat, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动调整高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [userChat])

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={userChat}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入您的问题，按Enter键发送..."
        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none min-h-[50px] max-h-[200px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            const form = e.currentTarget.closest("form")
            if (form) form.requestSubmit()
          }
        }}
      />
    </div>
  )
}

// 主组件
const ChatBox = ({ setMessage, setIsLoading }) => {
  const [userMessage, setUserMessage] = useState<string>("")
  const [model, setModel] = useState<string>("moonshot")
  const [documentType, setDocumentType] = useState<string>("")
  const [userChat, setUserChat] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 合同表单数据
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

  // 投诉表单数据
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

  // 选择文档类型
  const SelectBar = () => {
    const buttonClass = (type: string) =>
      `px-4 py-2 rounded-lg transition-colors ${
        documentType === type
          ? "bg-[#5d76c5] text-white dark:bg-blue-600"
          : "bg-white hover:bg-gray-100 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
      }`

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        <button className={buttonClass("")} onClick={() => setDocumentType("")}>
          聊天
        </button>
        <button className={buttonClass("contrary")} onClick={() => setDocumentType("contrary")}>
          生成法律合同
        </button>
        <button className={buttonClass("complaint")} onClick={() => setDocumentType("complaint")}>
          生成投诉状
        </button>
        <button className={buttonClass("advice")} onClick={() => setDocumentType("advice")}>
          生成法律意见
        </button>
      </div>
    )
  }

  // AI模型选择
  const ToggleAiModel = () => {
    return (
      <div className="mb-4">
        <label htmlFor="ai-model-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          选择AI模型:
        </label>
        <select
          id="ai-model-select"
          className="w-full md:w-60 px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500 text-gray-900 dark:text-white"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        >
          <option value="moonshot">Moonshot</option>
          <option value="deepseek-reasoner">Deepseek Reasoner</option>
          <option value="deepseek-chat">Deepseek Chat</option>
        </select>
      </div>
    )
  }

  // 提交表单
  async function handleUserMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // 判断是否为空
    if (documentType === "") {
      if (!userChat.trim()) {
        const errorToast = document.createElement("div")
        errorToast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        errorToast.textContent = "请输入问题内容"
        document.body.appendChild(errorToast)
        setTimeout(() => document.body.removeChild(errorToast), 2000)
        return
      }
    } else if (documentType === "advice" && !userMessage.trim()) {
      const errorToast = document.createElement("div")
      errorToast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      errorToast.textContent = "请输入法律问题描述"
      document.body.appendChild(errorToast)
      setTimeout(() => document.body.removeChild(errorToast), 2000)
      return
    }

    setIsSubmitting(true)
    setIsLoading(true)

    // 显示请求状态
    const loadingToast = document.createElement("div")
    loadingToast.className = "fixed top-4 right-4 bg-[#5d76c5] text-white px-4 py-2 rounded-lg shadow-lg z-50"
    loadingToast.textContent = "正在处理请求..."
    document.body.appendChild(loadingToast)

    try {
      let response

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
        response = await fetch("/api/ai/option", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMessage: userMessage,
            model: model,
          }),
        })
      } else {
        response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            content: userChat,
            documentType: documentType,
          }),
        })
      }

      // 移除加载提示
      document.body.removeChild(loadingToast)

      if (response.status === 200) {
        const data = await response.json()
        setMessage(data.data || data)

        // 清空输入
        if (documentType === "") {
          setUserChat("")
        } else if (documentType === "advice") {
          setUserMessage("")
        }

        // 显示成功提示
        const successToast = document.createElement("div")
        successToast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        successToast.textContent = "请求处理成功"
        document.body.appendChild(successToast)
        setTimeout(() => document.body.removeChild(successToast), 2000)
      } else {
        const errorData = await response.json()
        console.error("请求失败:", errorData)

        // 显示错误提示
        const errorToast = document.createElement("div")
        errorToast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        errorToast.textContent = errorData.message || "请求处理失败"
        document.body.appendChild(errorToast)
        setTimeout(() => document.body.removeChild(errorToast), 2000)
      }
    } catch (error) {
      console.error("请求出错:", error)

      // 显示错误提示
      const errorToast = document.createElement("div")
      errorToast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      errorToast.textContent = "网络错误，请稍后再试"
      document.body.appendChild(errorToast)
      setTimeout(() => document.body.removeChild(errorToast), 2000)
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  return (
    <div>
      {/* 文档类型选择和AI模型选择 */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <SelectBar />
        <ToggleAiModel />
      </div>

      {/* 根据选择显示不同表单 */}
      {documentType === "contrary" && (
        <ContraryInput
          model={model}
          doc_type="contrary"
          title={contraryData.title}
          parties={contraryData.parties}
          content={contraryData.content}
          additional={contraryData.additional}
          onChange={(data) => setContraryData(data)}
        />
      )}

      {documentType === "complaint" && (
        <ComplaintInput complaintData={complaintData} onChange={(data) => setComplaintData(data)} />
      )}

      {documentType === "advice" && <AdviceInput userMessage={userMessage} setUserMessage={setUserMessage} />}

      {/* 聊天输入框，当选择的是聊天时显示 */}
      {documentType === "" && (
        <form onSubmit={handleUserMessage} className="flex gap-2">
          <div className="flex-1">
            <ChatInput userChat={userChat} onChange={(data) => setUserChat(data)} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !userChat.trim()}
            className={`px-6 py-2 rounded-xl transition-colors ${
              isSubmitting || !userChat.trim()
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-[#5d76c5] hover:bg-[#3a5199] text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "发送中..." : "发送"}
          </button>
        </form>
      )}

      {/* 提交按钮，当选择的不是聊天时显示 */}
      {documentType !== "" && (
        <form onSubmit={handleUserMessage} className="mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl transition-colors ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-[#5d76c5] hover:bg-[#3a5199] text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "处理中..." : "提交请求"}
          </button>
        </form>
      )}
    </div>
  )
}

export default ChatBox

