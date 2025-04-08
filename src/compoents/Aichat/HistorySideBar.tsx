import type React from "react"
import { useEffect, useState } from "react"
import { token } from "../../share/share"
import type { HistoryItem } from "./types"

interface HistorySideBarProps {
  setMessage: (message: any) => void
  setUserMessage?: (message: string) => void
  setSelectedHistoryId: (id: string | null) => void
  selectedHistoryId: string | null
}

const HistorySideBar = ({
  setMessage,
  setUserMessage,
  setSelectedHistoryId,
  selectedHistoryId,
}: HistorySideBarProps) => {
  const [data, setData] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // // 添加刷新历史记录的函数
  // const refreshHistory = () => {
  //   setRefreshTrigger((prev) => prev + 1)
  // }

  useEffect(() => {
    let isMounted = true
    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/ai/theme", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!isMounted) return

        if (!response.ok) {
          showToast("获取历史记录失败", "error")
          console.error("获取历史记录失败", response)
          setIsLoading(false)
          return
        }

        const result = await response.json()
        setData(result.data || [])
      } catch (error) {
        console.error("请求历史记录出错", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchHistory()

    return () => {
      isMounted = false
    }
  }, [refreshTrigger])

  const handleHistoryItemClick = async (item: HistoryItem) => {
    setSelectedHistoryId(item.id)

    if (item.response && item.content) {
      setMessage({
        content: item.content,
        response: item.response,
      })
      return
    }

    try {
      const response = await fetch(`/api/ai/history?theme=${item.theme || ""}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()

        if (result.data && Array.isArray(result.data) && result.data.length >= 2) {
          const userMessage = result.data.find((msg: { role: string }) => msg.role === "user")
          const aiMessage = result.data.find((msg: { role: string }) => msg.role === "assistant")

          if (userMessage && aiMessage) {
            setData((prevData) =>
              prevData.map((d) =>
                d.id === item.id ? { ...d, response: aiMessage.content, content: userMessage.content } : d,
              ),
            )
            setMessage({
              content: userMessage.content,
              response: aiMessage.content,
            })
            return
          }
        }
        if (result.data && result.data.response && result.data.content) {
          setData((prevData) =>
            prevData.map((d) =>
              d.id === item.id ? { ...d, response: result.data.response, content: result.data.content } : d,
            ),
          )
          setMessage({
            content: result.data.content,
            response: result.data.response,
          })
        } else {
          console.error("历史记录数据格式不符合预期", result)
          showToast("历史记录数据格式不符合预期", "error")
        }
      } else {
        console.error("获取对话详情失败")
        showToast("获取对话详情失败", "error")
      }
    } catch (error) {
      console.error("请求对话详情出错", error)
      showToast("请求对话详情出错", "error")
    }
  }

  const deleteHistoryItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    if (!confirm("确定要删除这条历史记录吗？")) {
      return
    }

    try {
      const response = await fetch(`/api/ai/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id))

        if (selectedHistoryId === id) {
          setSelectedHistoryId(null)
          setMessage("")
          if (setUserMessage) {
            setUserMessage("")
          }
        }

        showToast("历史记录已删除", "success")
      } else {
        console.error("删除历史记录失败")
        showToast("删除历史记录失败", "error")
      }
    } catch (error) {
      console.error("删除历史记录出错", error)
      showToast("删除历史记录出错", "error")
    }
  }

  const filteredData = data.filter((item) => (item.theme ?? "").toLowerCase().includes(searchTerm.toLowerCase()))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString
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

    let hasError = false
    for (const item of data) {
      try {
        const response = await fetch(`/api/ai/delete?id=${item.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          hasError = true
          console.error(`清空历史记录失败: ${item.id}`)
        }
      } catch (error) {
        hasError = true
        console.error("清空历史记录出错", error)
      }
    }

    if (!hasError) {
      setData([])
      setSelectedHistoryId(null)
      setMessage("")
      if (setUserMessage) {
        setUserMessage("")
      }
      showToast("历史记录已清空", "success")
    } else {
      showToast("部分历史记录清空失败", "error")
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#f5f8ff] text-gray-800">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-[#3a5199]">历史记录</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索历史记录..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] text-gray-800 placeholder-gray-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#5d76c5] rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-2">
            {filteredData.length === 0 ? (
              <div className="text-center p-4 text-gray-500">{searchTerm ? "没有匹配的记录" : "暂无历史记录"}</div>
            ) : (
              <div className="space-y-2">
                {filteredData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleHistoryItemClick(item)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-colors relative group
                      ${selectedHistoryId === item.id ? "bg-[#5d76c5] text-white" : "hover:bg-[#e3ebff]"}
                    `}
                  >
                    <div className="font-medium truncate">{item.theme}</div>
                    <div className="text-xs mt-1 opacity-80">{formatDate(item.updated_at)}</div>
                    {/* 添加删除按钮 */}
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className={`
                        absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity
                        p-1 rounded-full hover:bg-red-500 hover:text-white
                        ${selectedHistoryId === item.id ? "text-white" : "text-gray-500"}
                      `}
                      title="删除此记录"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
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

// 显示提示信息
const showToast = (message: string, type: "success" | "error") => {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-lg shadow-lg z-50`
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 2000)
}

// 导出刷新历史记录函数
export const refreshHistorySidebar = () => {
  // 这里使用自定义事件来触发刷新
  const event = new CustomEvent("refresh-history")
  window.dispatchEvent(event)
}

export default HistorySideBar
