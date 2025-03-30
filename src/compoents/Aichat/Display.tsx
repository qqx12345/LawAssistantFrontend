import type React from "react"
import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"  // 新增：用于解析 Markdown 文本

interface DisplayMessageProps {
  messages: any
  isLoading?: boolean
  theme?: string
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({ messages, isLoading = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 滚动到最新消息
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-t-[#5d76c5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-[#5d76c5] dark:text-blue-400">正在生成回复...</p>
        </div>
      </div>
    )
  }

  if (!messages) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-[#5d76c5]/10 flex items-center justify-center mb-4">
          <span className="text-3xl">⚖️</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3a5199] dark:text-blue-400 mb-2">AI法律助手</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          您可以询问法律问题、生成法律文书，或者获取专业的法律建议。
        </p>
      </div>
    )
  }

  const displayedMessage =
    typeof messages === "object" && messages !== null && "message" in messages
      ? messages.message
      : typeof messages === "string"
        ? messages
        : JSON.stringify(messages, null, 2)

  return (
    <div
      ref={containerRef}
      className="max-w-none bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md whitespace-pre-wrap"
    >
      <ReactMarkdown>{displayedMessage}</ReactMarkdown>
    </div>
  )
}

export default DisplayMessage
