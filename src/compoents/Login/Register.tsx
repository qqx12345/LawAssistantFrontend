"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// 定义Userdata类型
type UserData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm = ({
  userdata,
  setUserdata,
  onRegister,
}: {
  userdata: UserData
  setUserdata: React.Dispatch<React.SetStateAction<UserData>>
  onRegister: (e: React.FormEvent) => Promise<void>
}) => {
  return (
    <div className="w-96 rounded-3xl overflow-hidden shadow-xl bg-white">
      <div className="p-8 bg-[#e3ebff] rounded-t-3xl">
        <h2 className="text-2xl font-bold text-[#3a5199] mb-2">智能法律助手</h2>
        <p className="text-[#5d76c5] mb-4">AI驱动的法律解决方案</p>
      </div>
      <form className="space-y-5 p-8" onSubmit={onRegister}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">用户名</label>
          <input
            type="text"
            placeholder="输入你的用户名"
            value={userdata.username}
            onChange={(e) => {
              setUserdata((prevState) => ({ ...prevState, username: e.target.value }))
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            type="email"
            placeholder="输入邮箱"
            value={userdata.email}
            onChange={(e) => {
              setUserdata((prevState) => ({ ...prevState, email: e.target.value }))
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">密码</label>
          <input
            type="password"
            placeholder="输入密码"
            value={userdata.password}
            onChange={(e) => {
              setUserdata((prevState) => ({ ...prevState, password: e.target.value }))
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">确认密码</label>
          <input
            type="password"
            placeholder="确认密码"
            value={userdata.confirmPassword}
            onChange={(e) => {
              setUserdata((prevState) => ({ ...prevState, confirmPassword: e.target.value }))
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200 font-medium"
        >
          注册
        </button>

        <div className="text-center text-sm text-gray-500">
          已有账号？{" "}
          <Link to="/login" className="text-[#5d76c5] hover:underline">
            返回登录
          </Link>
        </div>
      </form>
    </div>
  )
}

const Register = () => {
  const navigate = useNavigate()
  const [userdata, setUserdata] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!userdata.username || !userdata.email || !userdata.password || !userdata.confirmPassword) {
      setError("请填写所有必填字段")
      return
    }

    if (userdata.password !== userdata.confirmPassword) {
      setError("两次密码不一致")
      return
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userdata.email)) {
      setError("请输入有效的邮箱地址")
      return
    }

    // 显示加载状态
    const loadingToast = document.createElement("div")
    loadingToast.className = "fixed top-4 right-4 bg-[#5d76c5] text-white px-4 py-2 rounded-lg shadow-lg z-50"
    loadingToast.textContent = "注册中..."
    document.body.appendChild(loadingToast)

    try {
        
        const timeoutPromise = new Promise<Response>((_, reject) => {
            setTimeout(() => {
              reject(new Error("请求超时"))
            }, 5000)
          })
      
          const response = await Promise.race<Response>([
              fetch("/api/user/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: userdata.username, email: userdata.email, password: userdata.password }),
              }),
              timeoutPromise,
            ])
      // 移除加载提示
      document.body.removeChild(loadingToast)

      // 显示成功提示
        if (!response.ok) {
            console.error(response)
            setError("注册失败")
            return
        }
      const successToast = document.createElement("div")
      successToast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      successToast.textContent = "注册成功，正在跳转到登录页..."
      document.body.appendChild(successToast)

      // 延迟跳转
      setTimeout(() => {
        document.body.removeChild(successToast)
        navigate("/login")
      }, 2000)
    } catch (error) {
      console.error("请求失败：", (error as Error).message)
      setError("注册失败，请检查网络连接")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e3ebff] p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#3a5199]">LAW ASSISTANT</h1>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm max-w-md">{error}</div>}

      <RegisterForm userdata={userdata} setUserdata={setUserdata} onRegister={onRegister} />
    </div>
  )
}

export default Register

