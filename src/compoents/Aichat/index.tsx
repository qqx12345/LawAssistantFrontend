import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import DisplayMessage from "./Display";
import HistorySideBar from "./HistorySideBar";
import { refreshHistorySidebar } from "../../utils/events";
import type { ChatMessage } from "./types";
import { fetchWithAuth } from "../../utils/api";
import { showToast } from "../../utils/toast";

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null
  );
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const refreshListener = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener("refresh-history", refreshListener);
    return () => {
      window.removeEventListener("refresh-history", refreshListener);
    };
  }, []);

  useEffect(() => {
    // 检查用户是否登录
    const checkLogin = () => {
      // 检查localStorage中是否存在token
      const token = localStorage.getItem("token");
      if (!token) {
        // 如果没有token，重定向到登录页面
        window.location.href = "/login";
      }
    };

    checkLogin();
  }, []);

  const handleExitLogin = async () => {
    try {
      const result = await fetchWithAuth("/api/user/logout", "POST");
      if (result.code === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        window.location.href = "/login";
      } else {
        showToast("退出失败", "error");
      }
    } catch {
      showToast("退出失败", "error");
    }
  };

  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
    setSelectedHistoryId(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* 装饰气泡元素 */}
      <div
        className="bubble"
        style={{
          width: "200px",
          height: "200px",
          top: "5%",
          left: "10%",
          opacity: 0.7,
        }}
      ></div>
      <div
        className="bubble"
        style={{
          width: "150px",
          height: "150px",
          top: "70%",
          right: "5%",
          opacity: 0.6,
        }}
      ></div>
      <div
        className="bubble"
        style={{
          width: "100px",
          height: "100px",
          top: "40%",
          left: "80%",
          opacity: 0.5,
        }}
      ></div>

      {/* 移动端头部 */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white/70 backdrop-blur-sm shadow-md z-10 fixed w-full">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white shadow-md transition-all"
          aria-label={isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
        >
          {isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
        </button>
        <h1 className="text-xl font-bold text-[#3a5199]">法律AI助手</h1>
      </div>

      {/* 侧边栏 */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        md:w-1/4 w-full fixed md:relative h-screen z-20 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-md shadow-xl border-r border-white/30
      `}
      >
        <HistorySideBar
          setMessages={setMessages}
          setSelectedHistoryId={setSelectedHistoryId}
          selectedHistoryId={selectedHistoryId}
          setCurrentTheme={setCurrentTheme}
          key={refreshTrigger}
        />
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0 ml-0 z-10 pt-14 md:pt-0 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
        {/* 桌面端头部 */}
        <div className="hidden md:flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm shadow-md">
          <h1 className="text-2xl font-bold text-[#3a5199]">智能法律助手</h1>
          <div className="flex items-center gap-4">
            {selectedHistoryId && (
              <button
                onClick={clearMessages}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white transition-all shadow-lg"
                aria-label="开始新对话"
              >
                开始新对话
              </button>
            )}
            <button
              onClick={() => {
                window.location.href = "/index";
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white rounded-xl transition-all shadow-lg"
              aria-label="返回主页"
            >
              返回主页
            </button>
            <button
              onClick={() => {
                handleExitLogin();
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white rounded-xl transition-all shadow-lg"
              aria-label="退出登录"
            >
              退出登录
            </button>
          </div>
        </div>

        {/* 消息显示区 */}
        <div className="flex-1 overflow-y-auto h-full w-full">
          <DisplayMessage
            messages={messages}
            isLoading={isLoading}
            selectedHistoryId={selectedHistoryId}
          />
        </div>

        {/* 聊天输入框 */}
        <ChatBox
          addMessage={addMessage}
          messages={messages}
          setIsLoading={setIsLoading}
          refreshHistory={refreshHistorySidebar}
          selectedHistoryId={selectedHistoryId}
          setSelectedHistoryId={setSelectedHistoryId}
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
        />
      </div>
    </div>
  );
};

export default Chat;
