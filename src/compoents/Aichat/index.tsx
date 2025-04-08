import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import DisplayMessage from "./Display";
import HistorySideBar, { refreshHistorySidebar } from "./HistorySideBar";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(
    null
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 监听刷新历史记录事件
  useEffect(() => {
    const handleRefreshHistory = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener("refresh-history", handleRefreshHistory);

    return () => {
      window.removeEventListener("refresh-history", handleRefreshHistory);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
          window.location.href = "/login";
          return;
        }
      } catch (error) {
        console.error("验证失败", error);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  const handleExitLogin = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      console.error("退出登录失败", response);
      return;
    }
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#e3ebff] text-gray-800 overflow-hidden">
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-[#5d76c5] text-white"
        >
          {isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
        </button>
        <h1 className="text-xl font-bold text-[#3a5199]">法律AI助手</h1>
      </div>

      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        md:w-1/4 w-full fixed md:relative h-screen z-20
      `}
      >
        <HistorySideBar
          setMessage={setMessage}
          setSelectedHistoryId={setSelectedHistoryId}
          selectedHistoryId={selectedHistoryId}
          key={refreshTrigger}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0 ml-0 bg-[#e3ebff] text-gray-800">
        <div className="hidden md:flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
          <h1 className="text-2xl font-bold text-[#3a5199]">智能法律助手</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.location.href = "/index";
              }}
              className="px-4 py-2 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200"
            >
              返回主页
            </button>
            <button
              onClick={() => {
                handleExitLogin();
              }}
              className="px-4 py-2 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200"
            >
              退出登录
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#e3ebff] h-full w-full">
          <DisplayMessage
            messages={message}
            isLoading={isLoading}
            selectedHistoryId={selectedHistoryId}
          />
        </div>
        <ChatBox
          setMessage={setMessage}
          setIsLoading={setIsLoading}
          refreshHistory={refreshHistorySidebar}
          selectedHistoryId={selectedHistoryId}
          setSelectedHistoryId={setSelectedHistoryId}
        />
      </div>
    </div>
  );
};

export default Chat;
