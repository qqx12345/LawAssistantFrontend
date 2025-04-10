"use client";

import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";

// 定义Userdata类型
type UserData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = ({
  userdata,
  setUserdata,
  onRegister,
}: {
  userdata: UserData;
  setUserdata: React.Dispatch<React.SetStateAction<UserData>>;
  onRegister: (e: React.FormEvent) => Promise<void>;
}) => { 
  return (
    <div className="w-96 rounded-3xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md">
      <div className="p-8 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] rounded-t-3xl">
        <h2 className="text-2xl font-bold text-white mb-2">智能法律助手</h2>
        <p className="text-white/80 mb-4">AI驱动的法律解决方案</p>
      </div>
      <form className="space-y-5 p-8" onSubmit={onRegister}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            用户名
          </label>
          <input
            type="text"
            placeholder="输入你的用户名"
            value={userdata.username}
            onChange={(e) => {
              setUserdata((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            邮箱
          </label>
          <input
            type="email"
            placeholder="输入邮箱"
            value={userdata.email}
            onChange={(e) => {
              setUserdata((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            密码
          </label>
          <input
            type="password"
            placeholder="输入密码"
            value={userdata.password}
            onChange={(e) => {
              setUserdata((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            确认密码
          </label>
          <input
            type="password"
            placeholder="确认密码"
            value={userdata.confirmPassword}
            onChange={(e) => {
              setUserdata((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }));
            }}
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#5d76c5] focus:border-transparent text-gray-800 placeholder-gray-500 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white rounded-xl transition duration-200 font-medium shadow-md"
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
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (
      !userdata.username ||
      !userdata.email ||
      !userdata.password ||
      !userdata.confirmPassword
    ) {
      setError("请填写所有必填字段");
      showToast("请填写所有必填字段", "warning");
      return;
    }

    if (userdata.password !== userdata.confirmPassword) {
      setError("两次密码不一致");
      showToast("两次密码不一致", "warning");
      return;
    }

    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userdata.email)) {
      setError("请输入有效的邮箱地址");
      showToast("请输入有效的邮箱地址", "warning");
      return;
    }

    // 显示加载状态与错误处理
    try {
      setError("");
      showToast("正在注册...", "info");

      const timeoutPromise = new Promise<Response>((_, reject) => {
        setTimeout(() => {
          reject(new Error("请求超时"));
        }, 5000);
      });

      const response = await Promise.race<Response>([
        fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userdata.username,
            email: userdata.email,
            password: userdata.password,
          }),
        }),
        timeoutPromise,
      ]);

      // 处理响应
      if (!response.ok) {
        console.error(response);
        setError("注册失败");
        showToast("注册失败，请稍后重试", "error");
        return;
      }
      
      // 注册成功
      showToast("注册成功，正在跳转到登录页...", "success");

      // 延迟跳转
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("请求失败：", (error as Error).message);
      setError("注册失败，请检查网络连接");
      showToast("注册失败，请检查网络连接", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e8ff] to-[#f5f7ff] p-4 relative overflow-hidden">
      {/* 装饰气泡 */}
      <div className="bubble" style={{ width: '200px', height: '200px', top: '10%', left: '5%', opacity: 0.6 }}></div>
      <div className="bubble" style={{ width: '150px', height: '150px', top: '70%', right: '10%', opacity: 0.5 }}></div>
      <div className="bubble" style={{ width: '100px', height: '100px', top: '30%', right: '15%', opacity: 0.4 }}></div>
      
      <div className="mb-8 text-center relative z-10">
        <h1 className="text-3xl font-bold text-[#3a5199]">LAW ASSISTANT</h1>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-lg text-sm max-w-md relative z-10 border border-red-100 shadow-sm">
          {error}
        </div>
      )}

      <div className="relative z-10">
        <RegisterForm
          userdata={userdata}
          setUserdata={setUserdata}
          onRegister={onRegister}
        />
      </div>
    </div>
  );
};

export default Register;
