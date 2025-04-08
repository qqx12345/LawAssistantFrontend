import type React from "react"
import { useState, useRef, memo } from "react"
import { token } from "../../share/share"

const ChatInputComponent = ({
  userChat,
  onChange,
  onKeyDown,
}: {
  userChat: string
  onChange: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={userChat}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入您的问题，按Enter键发送..."
        style={{ height: "30px", minHeight: "30px" }}
        className="w-full px-3 py-1 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] bg-white text-gray-800 placeholder-gray-500 resize-none overflow-auto transition-all duration-200 ease-in-out text-sm"
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

const ChatInput = memo(ChatInputComponent)

interface ChatBoxProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  refreshHistory?: () => void
  selectedHistoryId: string | null
  setSelectedHistoryId: (id: string | null) => void
}

const ChatBox = ({
  setMessage,
  setIsLoading,
  refreshHistory,
  selectedHistoryId,
  setSelectedHistoryId,
}: ChatBoxProps) => {
  const [model, setModel] = useState<string>("moonshot")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chatTheme, setChatTheme] = useState<string>("")
  const [inputMessage, setInputMessage] = useState<string>("")

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.closest("form")
      if (form) form.requestSubmit()
    }
  }

  async function handleUserMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!inputMessage.trim()) {
      showToast("请输入问题内容", "error")
      return
    }

    if (selectedHistoryId) {
      setSelectedHistoryId(null)
    }

    setIsSubmitting(true)
    setIsLoading(true)

    const userMessageContent = inputMessage 
    setInputMessage("") 
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          content: userMessageContent,
          theme: chatTheme,
        }),
      })

      if (response.status === 200) {
        const data = await response.json()

        let aiResponse = ""
        if (typeof data.data === "string") {
          aiResponse = data.data
        } else if (data.data && typeof data.data.message === "string") {
          aiResponse = data.data.message
        } else {
          aiResponse = JSON.stringify(data.data || data)
        }

        setMessage({
          content: userMessageContent,
          response: aiResponse,
        })

        if (refreshHistory) {
          refreshHistory()
        }

        showToast("请求处理成功", "success")
      } else {
        const errorData = await response.json()
        console.error("请求失败:", errorData)
        showToast(errorData.message || "请求处理失败", "error")
      }
    } catch (error) {
      console.error("请求出错:", error)
      showToast("网络错误，请稍后再试", "error")
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setInputMessage("")
    setMessage("")
    setSelectedHistoryId(null)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between bg-white text-gray-800 rounded-lg p-2">
        <div className="flex items-center">
          {selectedHistoryId && (
            <button
              onClick={handleNewChat}
              className="px-3 py-1 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              新对话
            </button>
          )}
        </div>
        <ToggleAiModel />
      </div>
      <div className="p-4 bg-white text-gray-800 shadow-inner">
        <form onSubmit={handleUserMessage} className="flex flex-col gap-2">
          <div className="flex-1">
            <ChatInput userChat={inputMessage} onChange={(data) => setInputMessage(data)} onKeyDown={handleKeyDown} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !inputMessage.trim()}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isSubmitting || !inputMessage.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#5d76c5] hover:bg-[#3a5199] text-white"
            }`}
          >
            {isSubmitting ? "发送中..." : "发送"}
          </button>
        </form>
      </div>
    </>
  )
}

// 显示提示信息
const showToast = (message: string, type: "success" | "error") => {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-lg shadow-lg z-50`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 2000)
}

export default ChatBox
