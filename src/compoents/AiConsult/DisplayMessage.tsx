import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface DisplayMessageProps {
  messages: any;
  isLoading?: boolean;
}

const DisplayMessage = ({
  messages,
  isLoading = false,
}: DisplayMessageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 h-full w-full bg-[#e3ebff] text-gray-800">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-t-[#5d76c5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-[#5d76c5]">正在生成回复...</p>
        </div>
      </div>
    );
  }

  if (!messages) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-[#e3ebff] text-gray-800">
        <div className="w-24 h-24 rounded-full bg-[#5d76c5]/20 flex items-center justify-center mb-4 shadow-md">
          <span className="text-3xl">⚖️</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3a5199] mb-2">
          AI法律文档生成器
        </h3>
        <p className="text-gray-700 max-w-md leading-relaxed">
          请选择要生成的文档类型，填写相关信息后提交请求
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">生成法律合同</p>
            <p className="text-gray-600 text-xs mt-1">
              例如：房屋租赁合同、劳动合同等
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">生成投诉状</p>
            <p className="text-gray-600 text-xs mt-1">
              例如：消费者权益、合同纠纷等
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <p className="font-medium text-[#3a5199]">生成法律意见</p>
            <p className="text-gray-600 text-xs mt-1">
              例如：法律风险分析、法律建议等
            </p>
          </div>
        </div>
      </div>
    );
  }

  const displayedMessage =
    typeof messages === "object" && messages !== null && "message" in messages
      ? messages.message
      : typeof messages === "string"
      ? messages
      : JSON.stringify(messages, null, 2);

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-4 h-full w-full bg-[#e3ebff] text-gray-800"
    >
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-[#5d76c5] flex items-center justify-center">
            <span className="text-white text-lg">⚖️</span>
          </div>
        </div>
        <div className="chat-bubble bg-[#f0f4ff] text-gray-800 shadow-sm">
          <div className="prose max-w-none">
            <ReactMarkdown>{displayedMessage}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMessage;
