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

  // 修改消息处理逻辑以适应不同的数据格式
  // 处理消息显示
  let userContent = ""
  let aiContent = ""

  if (typeof messages === "object" && messages !== null) {
    if ("content" in messages && "response" in messages) {
      // 历史记录格式
      userContent = messages.content || ""
      aiContent = typeof messages.response === "string" ? messages.response : JSON.stringify(messages.response)
    } else if ("message" in messages) {
      // API返回格式
      aiContent = typeof messages.message === "string" ? messages.message : JSON.stringify(messages.message)
    } else if (Array.isArray(messages.data) && messages.data.length >= 2) {
      // API返回的历史记录数组格式
      const userMessage = messages.data.find((msg) => msg.role === "user")
      const aiMessage = messages.data.find((msg) => msg.role === "assistant")

      if (userMessage && aiMessage) {
        userContent =
          typeof userMessage.content === "string" ? userMessage.content : JSON.stringify(userMessage.content)
        aiContent = typeof aiMessage.content === "string" ? aiMessage.content : JSON.stringify(aiMessage.content)
      } else {
        aiContent = JSON.stringify(messages)
      }
    } else {
      aiContent = JSON.stringify(messages)
    }
  } else if (typeof messages === "string") {
    aiContent = messages
  } else {
    // 如果不是对象也不是字符串，转换为字符串
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