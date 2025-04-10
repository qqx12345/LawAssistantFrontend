import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import type { ChatMessage } from "./types"

interface DisplayMessageProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  selectedHistoryId?: string | null;
}

const DisplayMessage = ({ messages, isLoading = false }: DisplayMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 滚动到最新消息
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  if (!messages.length && !isLoading) {
    return (
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center h-full w-full overflow-y-auto p-4 relative bg-gradient-to-br from-[#e8f0ff] to-[#d8e3ff] custom-scrollbar"
      >
        {/* 装饰气泡 */}
        <div className="bubble" style={{ width: '100px', height: '100px', top: '10%', left: '5%' }}></div>
        <div className="bubble" style={{ width: '150px', height: '150px', bottom: '15%', right: '10%' }}></div>
        <div className="bubble" style={{ width: '80px', height: '80px', top: '40%', right: '20%' }}></div>
        
        <div className="text-center p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg max-w-lg border border-white/50 fade-in">
          <h2 className="text-xl font-bold text-[#3a5199] mb-2">欢迎使用智能法律助手</h2>
          <p className="text-gray-700 mb-4">
            这是一个基于AI的法律咨询工具，可以协助解答您的法律相关问题。
          </p>
          <p className="text-gray-700">
            在下方输入框中输入您的问题，我将尽力为您提供专业的法律建议和信息。
          </p>
        </div>
      </div>
    )
  }

  if (isLoading && !messages.length) {
    return (
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-center h-full w-full overflow-y-auto p-4 relative bg-gradient-to-br from-[#e8f0ff] to-[#d8e3ff] custom-scrollbar"
      >
        {/* 装饰气泡 */}
        <div className="bubble" style={{ width: '100px', height: '100px', top: '10%', left: '5%' }}></div>
        <div className="bubble" style={{ width: '150px', height: '150px', bottom: '15%', right: '10%' }}></div>
        
        <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 fade-in">
          <div className="flex space-x-4 items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5d76c5] to-[#3a5199] flex items-center justify-center">
              <span className="text-white text-lg">⚖️</span>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-[#e3ebff] rounded-full w-3/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-[#e3ebff] rounded-full animate-pulse"></div>
                <div className="h-3 bg-[#e3ebff] rounded-full w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-4 h-full w-full overflow-y-auto p-4 relative bg-gradient-to-br from-[#e8f0ff] to-[#d8e3ff] custom-scrollbar"
    >
      {/* 装饰气泡 */}
      <div className="bubble" style={{ width: '100px', height: '100px', top: '10%', left: '5%' }}></div>
      <div className="bubble" style={{ width: '80px', height: '80px', bottom: '30%', right: '5%' }}></div>
      <div className="bubble" style={{ width: '60px', height: '60px', top: '50%', left: '15%' }}></div>
      
      {messages.map((message, index) => (
        <div key={index} className="fade-in">
          {message.role === 'user' && (
            <div className="flex justify-end mb-4">
              <div className="flex items-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-none py-3 px-4 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] text-white shadow-md">
                  <p className="break-words">{message.content}</p>
                </div>
                <div className="w-8 h-8 ml-2 rounded-full bg-white/80 border border-[#5d76c5]/30 flex items-center justify-center shadow-sm">
                  <span className="text-[#3a5199]">👤</span>
                </div>
              </div>
            </div>
          )}

          {message.role === 'assistant' && (
            <div className="flex justify-start mb-4">
              <div className="flex items-end">
                <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-r from-[#5d76c5] to-[#3a5199] flex items-center justify-center shadow-sm">
                  <span className="text-white">⚖️</span>
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-none py-3 px-4 bg-white/70 backdrop-blur-sm border border-white/50 text-gray-800 shadow-md">
                  <div className="prose max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4 fade-in">
          <div className="flex items-end">
            <div className="w-8 h-8 mr-2 rounded-full bg-gradient-to-r from-[#5d76c5] to-[#3a5199] flex items-center justify-center shadow-sm">
              <span className="text-white">⚖️</span>
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-bl-none py-3 px-4 bg-white/70 backdrop-blur-sm border border-white/50 text-gray-800 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#5d76c5] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#5d76c5] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-[#5d76c5] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DisplayMessage
