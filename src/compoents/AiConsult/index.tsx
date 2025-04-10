import { useNavigate } from "react-router-dom";
import LawDocGenerator from "./LawDocGenerator";

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

export default function LawDocGeneratePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden relative">
      {/* 生成背景浮动元素 */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-300/30 backdrop-blur-sm animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-indigo-300/20 backdrop-blur-sm animate-float-medium pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-blue-200/30 backdrop-blur-sm animate-float-fast pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-36 h-36 rounded-full bg-indigo-200/20 backdrop-blur-sm animate-float-medium pointer-events-none"></div>
      
      <div className="flex justify-between items-center p-4 bg-white/70 backdrop-blur-sm shadow-md z-10">
        <h1 className="text-2xl font-bold text-[#3a5199]">法律文档生成</h1>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white rounded-xl transition duration-200 shadow-lg"
            onClick={() => {
              navigate("/index");
            }}
          >
            返回主页
          </button>
          <button
            onClick={() => {
              handleExitLogin();
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#5d76c5] to-[#3a5199] hover:from-[#4a5fa3] hover:to-[#324785] text-white rounded-xl transition duration-200 shadow-lg"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 z-10">
        <LawDocGenerator />
      </div>
    </div>
  );
}
