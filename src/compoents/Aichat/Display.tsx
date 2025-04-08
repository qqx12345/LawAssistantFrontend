import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"

interface DisplayMessageProps {
  messages: any
  isLoading?: boolean
  selectedHistoryId?: string | null
}

const DisplayMessage = ({ messages, isLoading = false }: DisplayMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 滚动到最新消息
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 h-full w-full bg-[#e3ebff] text-gray-800">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-t-[#5d76c5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-[#5d76c5]">正在生成回复...</p>
        </div>
      </div>
    )
  }

  if (!messages) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-[#e3ebff] text-gray-800">
        <div className="w-24 h-24 rounded-full bg-[#5d76c5]/20 flex items-center justify-center mb-4 shadow-md">
          <span className="text-3xl">⚖️</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3a5199] mb-2">AI法律助手</h3>
        <p className="text-gray-700 max-w-md leading-relaxed">
          您可以询问法律问题、生成法律文书，或者获取专业的法律建议。
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">询问法律问题</p>
            <p className="text-gray-600 text-xs mt-1">例如：租房合同纠纷如何解决？</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">生成法律文书</p>
            <p className="text-gray-600 text-xs mt-1">例如：生成一份房屋租赁合同</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">获取法律建议</p>
            <p className="text-gray-600 text-xs mt-1">例如：我的知识产权被侵犯了，该怎么办？</p>
          </div>
        </div>
      </div>
    )
  }

  let userContent = ""
  let aiContent = ""

  const extractMessageContent = (data: any): string => {
    if (!data) return ""

    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data)
        if (parsed && typeof parsed === "object") {
          if (parsed.message) {
            return parsed.message
          }
          if (parsed.data && parsed.data.message) {
            return parsed.data.message
          }
        }
        return data
      } catch (e) {
        console.error("JSON解析失败:", e)
      }
    }

    if (typeof data === "object") {
      if (data.message) {
        return data.message
      }
      if (data.data && data.data.message) {
        return data.data.message
      }
      if (data.content) {
        return data.content
      }
      return JSON.stringify(data)
    }
    return String(data)
  }

  if (typeof messages === "object" && messages !== null) {
    if ("content" in messages && "response" in messages) {
      userContent = messages.content || ""
      aiContent = extractMessageContent(messages.response)
    } else if ("message" in messages) {
      aiContent = extractMessageContent(messages.message)
    } else if (Array.isArray(messages.data) && messages.data.length >= 2) {
      const userMessage = messages.data.find((msg: { role: string }) => msg.role === "user")
      const aiMessage = messages.data.find((msg: { role: string }) => msg.role === "assistant")

      if (userMessage && aiMessage) {
        userContent = userMessage.content || ""
        aiContent = extractMessageContent(aiMessage.content)
      } else {
        aiContent = extractMessageContent(messages)
      }
    } else {
      aiContent = extractMessageContent(messages)
    }
  } else if (typeof messages === "string") {
    aiContent = extractMessageContent(messages)
  } else {
    aiContent = String(messages)
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-4 h-full w-full bg-[#e3ebff] text-gray-800 overflow-y-auto p-4"
    >
      {userContent && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-lg">👤</span>
            </div>
          </div>
          <div className="chat-bubble bg-[#5d76c5] text-white">{userContent}</div>
        </div>
      )}

      {aiContent && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full bg-[#5d76c5] flex items-center justify-center">
              <span className="text-white text-lg">⚖️</span>
            </div>
          </div>
          <div className="chat-bubble bg-[#f0f4ff] text-gray-800 shadow-sm">
            <div className="prose max-w-none">
              <ReactMarkdown>{aiContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DisplayMessage
