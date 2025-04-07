import { useState, useEffect, type SetStateAction } from "react"
import ChatBox from "./ChatBox"
import DisplayMessage from "./Display"
import HistorySideBar from "./HistorySideBar"

const Chat = () => {
  const [message, setMessage] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState("light")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token")
        if (!savedToken) {
          window.location.href = "/login"
          return
        }
      } catch (error) {
        console.error("验证失败", error)
        window.location.href = "/login"
      }
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }

    checkAuth()
  }, [])

  const handleSetMessage = (newMessage: SetStateAction<string>) => {
    if (typeof newMessage === "function") {
      setIsLoading(true)
      setTimeout(() => {
        setMessage(newMessage)
        setIsLoading(false)
      }, 300)
    } else {
      setMessage(newMessage)
    }
  }

  return (
    <div className={`flex flex-col md:flex-row h-screen bg-[#e3ebff] dark:bg-gray-900 overflow-hidden`}>
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
        <button onClick={toggleSidebar} className="p-2 rounded-lg bg-[#5d76c5] text-white">
          {isSidebarOpen ? "关闭侧边栏" : "打开侧边栏"}
        </button>
        <h1 className="text-xl font-bold text-[#3a5199] dark:text-white">法律AI助手</h1>
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        md:w-1/4 w-full fixed md:relative h-screen z-20
      `}
      >
        <HistorySideBar setMessage={handleSetMessage} theme={theme} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden md:ml-0 ml-0">
        <div className="hidden md:flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-2xl font-bold text-[#3a5199] dark:text-white">智能法律助手</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-lg">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/login"
              }}
              className="px-4 py-2 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              退出登录
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <DisplayMessage messages={message} isLoading={isLoading} theme={theme} />
        </div>
        <ChatBox setMessage={handleSetMessage} setIsLoading={setIsLoading} />
      </div>
    </div>
  )
}

export default Chat

