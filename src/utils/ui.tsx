import React from 'react';

interface AIModelOption {
  value: string;
  label: string;
}

// AI模型选择组件
export const AIModelSelector: React.FC<{
  model: string;
  setModel: (model: string) => void;
  className?: string;
  label?: string;
  options?: AIModelOption[];
}> = ({ model, setModel, className = "mb-3", label = "选择AI模型:", options }) => {
  const defaultOptions = [
    { value: "moonshot", label: "Moonshot" },
    { value: "deepseek-reasoner", label: "Deepseek-R1" },
    { value: "deepseek-chat", label: "Deepseek-V3" },
  ];

  const modelOptions = options || defaultOptions;

  return (
    <div className={className}>
      <label
        htmlFor="ai-model-select"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id="ai-model-select"
        style={{ height: "30px" }}
        className="w-full md:w-60 px-3 py-0 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d76c5] text-gray-800 text-sm"
        onChange={(e) => setModel(e.target.value)}
        value={model}
      >
        {modelOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// 提交按钮组件
export const SubmitButton: React.FC<{
  isSubmitting: boolean;
  isDisabled: boolean;
  text?: string;
  loadingText?: string;
}> = ({
  isSubmitting,
  isDisabled,
  text = "发送",
  loadingText = "发送中...",
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isDisabled}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isSubmitting || isDisabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#5d76c5] hover:bg-[#3a5199] text-white"
      }`}
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
};
