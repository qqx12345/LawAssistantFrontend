import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

interface LoginFormProps {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  rememberMe: boolean
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>
  onLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  error: string
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onLogin,
  error,
}) => {
  return (
    <div className="w-96 rounded-3xl overflow-hidden shadow-xl bg-white">
      <div className="p-8 bg-[#e3ebff] rounded-t-3xl">
        <h2 className="text-2xl font-bold text-[#3a5199] mb-2">智能法律助手</h2>
        <p className="text-[#5d76c5] mb-4">AI驱动的法律解决方案</p>
      </div>
      <form className="space-y-5 p-8" onSubmit={onLogin}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">用户名</label>
          <input
            type="text"
            placeholder="输入你的用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">密码</label>
          <input
            type="password"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-[#5d76c5] focus:ring-[#5d76c5]"
            />
            <span className="text-sm text-gray-600">记住我</span>
          </label>
          <a href="#" className="text-sm text-[#5d76c5] hover:underline">
            忘记密码?
          </a>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full py-3 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200 font-medium"
        >
          登录
        </button>

        <div className="text-center text-sm text-gray-500">
          没有账号？{" "}
          <Link to="/register" className="text-[#5d76c5] hover:underline">
            立即注册
          </Link>
        </div>
      </form>
    </div>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedUsername = localStorage.getItem("username")
    const savedPassword = localStorage.getItem("password")
    const savedRememberMe = localStorage.getItem("rememberMe") === "true"

    if (savedRememberMe && savedUsername && savedPassword) {
      setUsername(savedUsername)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.trim() === "" || password.trim() === "") {
      setError("用户名或密码不能为空")
      return
    }
    setError("")

    try {
      const loadingToast = document.createElement("div")
      loadingToast.className = "fixed top-4 right-4 bg-[#5d76c5] text-white px-4 py-2 rounded-lg shadow-lg z-50"
      loadingToast.textContent = "登录中..."
      document.body.appendChild(loadingToast)

      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Login failed"))
        }, 2000)
      })

      const response = await Promise.race<Response>([
        fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }),
        timeoutPromise,
      ])

      document.body.removeChild(loadingToast)

      const data = await response.json()
      if (!response.ok) {
        console.error(response)
        setError("登录失败")
        return
      }

      console.log(data)
      console.log("login success")

      if (rememberMe) {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        localStorage.setItem("rememberMe", "true")
        localStorage.setItem("token", data.data.token)
      } else {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        localStorage.setItem("rememberMe", "false")
        localStorage.setItem("token", data.data.token)
      }

      const successToast = document.createElement("div")
      successToast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      successToast.textContent = "登录成功，正在跳转..."
      document.body.appendChild(successToast)

      setTimeout(() => {
        document.body.removeChild(successToast)
        navigate("/index")
      }, 1500)
    } catch (e) {
      console.error(e)
      setError("登录失败")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e3ebff] p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#3a5199]">LAW ASSISTANT</h1>
      </div>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        onLogin={onLogin}
        error={error}
      />
    </div>
  )
}

export default Login