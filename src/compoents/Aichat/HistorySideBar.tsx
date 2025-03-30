import { useEffect, useState } from "react"
import { token } from "../../share/share"

interface HistoryItem {
  content: string;
  date: string;
}

const HistorySideBar = () => {
  const [data, setData] = useState<HistoryItem[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
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
          return
        }
        const result = await response.json()
        console.log(result)
        setData(result.data)
      } catch (error) {
        console.error("请求历史记录出错", error)
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className="flex flex-col w-1/4 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">历史记录</h2>
      <div className="overflow-y-auto">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-row justify-between items-center p-4 bg-gray-700 text-white mb-2">
            <div className="text-lg">{item.content.slice(0, 10)}</div>
            <div className="text-lg">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistorySideBar