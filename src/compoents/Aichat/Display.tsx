import type React from "react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; //用于解析 Markdown 文本

interface DisplayMessageProps {
  messages: any;
  isLoading?: boolean;
  theme?: string;
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({
  messages,
  isLoading = false,
  theme = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 滚动到最新消息
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-t-[#5d76c5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <p className="mt-4 text-[#5d76c5] dark:text-blue-400">
            正在生成回复...
          </p>
        </div>
      </div>
    );
  }

  if (!messages) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-[#5d76c5]/20 flex items-center justify-center mb-4 shadow-md">
          <span className="text-3xl">⚖️</span>
        </div>
        <h3 className="text-xl font-semibold text-[#3a5199] dark:text-blue-400 mb-2">
          AI法律助手
        </h3>
        <p className="text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
          您可以询问法律问题、生成法律文书，或者获取专业的法律建议。
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="font-medium text-[#3a5199] dark:text-blue-400">
              询问法律问题
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              例如：租房合同纠纷如何解决？
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="font-medium text-[#3a5199] dark:text-blue-400">
              生成法律文书
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              例如：生成一份房屋租赁合同
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="font-medium text-[#3a5199] dark:text-blue-400">
              获取法律建议
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              例如：我的知识产权被侵犯了，该怎么办？
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
    <div ref={containerRef} className="flex flex-col space-y-4">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-[#5d76c5] flex items-center justify-center">
            <span className="text-white text-lg">⚖️</span>
          </div>
        </div>
        <div
          className={`chat-bubble ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-[#f0f4ff] text-gray-800"
          } shadow-sm`}
        >
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{displayedMessage}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMessage;
