import type React from "react";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";
import { showToast } from "../../utils/toast";
import type { HistoryItem, ChatMessage } from "./types";

interface HistorySideBarProps {
  setMessages: (messages: ChatMessage[]) => void;
  setSelectedHistoryId: (id: string | null) => void;
  selectedHistoryId: string | null;
  setCurrentTheme: (theme: string) => void;
}

const HistorySideBar: React.FC<HistorySideBarProps> = ({
  setMessages,
  setSelectedHistoryId,
  selectedHistoryId,
  setCurrentTheme,
}: HistorySideBarProps) => {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      if (!isMounted) return;
      setIsLoading(true);
      try {
        const response = await fetchWithAuth("/api/ai/theme", "GET");
        if (response.code === 200 && response.data) {
          if (isMounted) {
            setData(response.data);
          }
        } else {
          showToast("获取历史记录失败", "error");
        }
      } catch {
        if (isMounted) {
          showToast("获取历史记录失败", "error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHistory();

    const refreshHandler = () => {
      fetchHistory();
    };

    window.addEventListener("refresh-history", refreshHandler);

    return () => {
      isMounted = false;
      window.removeEventListener("refresh-history", refreshHandler);
    };
  }, []);

  //
  const handleHistoryItemClick = async (item: HistoryItem) => {
    //
    try {
      setSelectedHistoryId(item.id);
      setIsLoading(true);
      setCurrentTheme(item.theme);

      //
      const result = await fetchWithAuth(
        `/api/ai/history?theme=${encodeURIComponent(item.theme || "")}`,
        "GET"
      );

      //
      const chatMessages: ChatMessage[] = [];

      if (result.data && Array.isArray(result.data)) {
        // API
        result.data.forEach(
          (msg: { role: string; content: string; created_at?: string }) => {
            // msg.role
            const role = msg.role === "user" ? "user" : "assistant";
            chatMessages.push({
              role: role,
              content: msg.content,
              timestamp: msg.created_at
                ? new Date(msg.created_at).getTime()
                : new Date().getTime(),
            });
          }
        );
      } else if (result.data?.content && result.data?.response) {
        // API
        //
        chatMessages.push({
          role: "user",
          content: result.data.content as string,
          timestamp: new Date(item.updated_at).getTime(),
        });

        // AI
        chatMessages.push({
          role: "assistant",
          content: result.data.response as string,
          timestamp: new Date(item.updated_at).getTime() + 1, //
        });
      } else if (item.content && item.response) {
        //
        //
        chatMessages.push({
          role: "user",
          content: item.content,
          timestamp: new Date(item.updated_at).getTime(),
        });

        // AI
        chatMessages.push({
          role: "assistant",
          content: item.response,
          timestamp: new Date(item.updated_at).getTime() + 1, //
        });
      }

      //
      setMessages(chatMessages);
      setIsLoading(false);
    } catch {
      console.error("获取历史记录失败");
      setIsLoading(false);
      showToast("获取历史记录失败", "error");
    }
  };

  //
  const deleteHistoryItem = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); //

    try {
      await fetchWithAuth(`/api/ai/delete?id=${itemId}`, "DELETE");

      // 删除成功后更新历史记录列表
      setData((prevData) => prevData.filter((item) => item.id !== itemId));

      // 如果删除的历史记录是当前选中的，则清空当前选中记录和消息列表
      if (selectedHistoryId === itemId) {
        setSelectedHistoryId(null);
        setMessages([]);
      }

      showToast("历史记录删除成功", "success");
    } catch {
      showToast("删除历史记录失败", "error");
    }
  };

  //
  const clearHistory = async () => {
    try {
      // 删除所有历史记录
      let hasError = false;
      for (const item of data) {
        try {
          await fetchWithAuth(`/api/ai/delete?id=${item.id}`, "DELETE");
        } catch {
          hasError = true;
          console.error("删除历史记录失败");
        }
      }

      // 删除成功后更新历史记录列表和消息列表
      if (!hasError) {
        setData([]);
        setSelectedHistoryId(null);
        setMessages([]);
        showToast("历史记录清空成功", "success");
      } else {
        showToast("部分历史记录删除失败", "error");
      }
    } catch {
      showToast("清空历史记录失败", "error");
    }
  };

  //
  const filteredData = data.filter((item) =>
    item.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      {/* */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#3a5199]">历史记录</h2>
        <button
          className="p-2 text-sm rounded-lg bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white shadow-md transition-all"
          onClick={clearHistory}
          aria-label="清空所有历史记录"
        >
          清空历史
        </button>
      </div>

      {/* */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜索历史记录"
          className="w-full px-4 py-3 pr-10 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      {/* */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="loader">加载中...</div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">暂无历史记录</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl cursor-pointer backdrop-blur-sm border transition-all duration-300 ${
                selectedHistoryId === item.id
                  ? "border-[#5d76c5] bg-white/70 shadow-md"
                  : "border-white/30 bg-white/50 hover:bg-white/60 hover:shadow-sm"
              }`}
              onClick={() => handleHistoryItemClick(item)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#3a5199] truncate flex-1">
                  {item.theme || "无标题对话"}
                </span>
                <button
                  className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                  onClick={(e) => deleteHistoryItem(item.id, e)}
                  aria-label="删除此历史记录"
                  title="删除此历史记录"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-gray-600 truncate">
                {item.content
                  ? item.content.substring(0, 50) +
                    (item.content.length > 50 ? "..." : "")
                  : ""}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(item.updated_at).toLocaleString("zh-CN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySideBar;
