import { useEffect, useState } from "react"
import { token } from "../../share/share"

interface HistoryItem {
  id: string
  content: string
  date: string
  response?: string
}

interface HistorySideBarProps {
  setMessage: (message: string) => void
  theme?: string
}

const HistorySideBar: React.FC<HistorySideBarProps> = ({ setMessage, theme = "light" }) => {
  const [data, setData] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/ai/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const failedToast = document.createElement("div")
          failedToast.className = "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          failedToast.textContent = "获取历史记录失败"
          document.body.appendChild(failedToast)
          setTimeout(() => {
            document.body.removeChild(failedToast)
          }, 2000)
          console.error("获取历史记录失败", response)
          setIsLoading(false)
          return
        }

        const result = await response.json()
        console.log(result)
        setData(result.data || [])
      } catch (error) {
        console.error("请求历史记录出错", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleHistoryItemClick = async (item: HistoryItem) => {
    setSelectedItem(item.id)

    // 如果响应已经缓存，直接显示
    if (item.response) {
      setMessage(item.response)
      return
    }

    // 否则请求完整对话
    try {
      const response = await fetch(`/api/ai/conversation/${item.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        // 更新本地数据，缓存响应
        setData((prevData) => prevData.map((d) => (d.id === item.id ? { ...d, response: result.data.response } : d)))
        setMessage(result.data.response)
      } else {
        console.error("获取对话详情失败")
      }
    } catch (error) {
      console.error("请求对话详情出错", error)
    }
  }

  const filteredData = data.filter((item) => item.content.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString // 返回原始字符串
    }
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const clearHistory = async () => {
    if (!confirm("确定要清空所有历史记录吗？此操作不可撤销。")) {
      return
    }

    try {
      const response = await fetch("/api/ai/history/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setData([])
        const successToast = document.createElement("div")
        successToast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        successToast.textContent = "历史记录已清空"
        document.body.appendChild(successToast)
        setTimeout(() => {
          document.body.removeChild(successToast)
        }, 2000)
      } else {
        console.error("清空历史记录失败")
      }
    } catch (error) {
      console.error("清空历史记录出错", error)
    }
  }

  return (
    <div
      className={`flex flex-col h-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#f5f8ff] text-gray-800"}`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-[#3a5199] dark:text-white">历史记录</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索历史记录..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] dark:focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#5d76c5] dark:border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredData.length === 0 ? (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                {searchTerm ? "没有匹配的记录" : "暂无历史记录"}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleHistoryItemClick(item)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-colors
                      ${
                        selectedItem === item.id
                          ? "bg-[#5d76c5] text-white dark:bg-blue-600"
                          : "hover:bg-[#e3ebff] dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <div className="font-medium truncate">{item.content}</div>
                    <div className="text-xs mt-1 opacity-80">{formatDate(item.date)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearHistory}
              className="w-full px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              清空历史记录
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default HistorySideBar