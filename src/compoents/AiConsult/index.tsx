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
    <div className="flex flex-col h-screen bg-[#e3ebff] text-gray-800 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-white text-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-[#3a5199]">法律文档生成</h1>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200"
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
            className="px-4 py-2 bg-[#5d76c5] hover:bg-[#3a5199] text-white rounded-xl transition duration-200"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <LawDocGenerator />
      </div>
    </div>
  );
}
