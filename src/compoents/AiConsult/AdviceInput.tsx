"use client"

import FormField from "./FormField"
import type { AdviceInputProps } from "./types"

const AdviceInput = ({ adviceData, onChange }: AdviceInputProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-bold text-[#3a5199] mb-4">生成法律意见</h2>
      <FormField
        label="法律问题背景"
        id="background"
        value={adviceData.background}
        onChange={(e) => onChange({ ...adviceData, background: e.target.value })}
        placeholder="输入法律问题背景"
        className="mb-4"
        textarea={true}
      />
      <FormField
        label="法律问题 (逗号分隔)"
        id="issues"
        value={adviceData.issues.join(",")}
        onChange={(e) =>
          onChange({
            ...adviceData,
            issues: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="输入法律问题 (逗号分隔)"
        className="mb-4"
      />
      <FormField
        label="法律分析"
        id="analysis"
        value={adviceData.analysis}
        onChange={(e) => onChange({ ...adviceData, analysis: e.target.value })}
        placeholder="输入法律分析"
        textarea={true}
        className="mb-4"
      />
      <FormField
        label="法律风险 (逗号分隔)"
        id="risks"
        value={adviceData.risks.join(",")}
        onChange={(e) =>
          onChange({
            ...adviceData,
            risks: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="输入法律风险 (逗号分隔)"
        className="mb-4"
      />
      <FormField
        label="建议措施 (逗号分隔)"
        id="suggestions"
        value={adviceData.suggestions.join(",")}
        onChange={(e) =>
          onChange({
            ...adviceData,
            suggestions: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="输入建议措施 (逗号分隔)"
        className="mb-4"
      />
      <FormField
        label="参考文献 (逗号分隔)"
        id="references"
        value={adviceData.references.join(",")}
        onChange={(e) =>
          onChange({
            ...adviceData,
            references: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="输入参考文献 (逗号分隔)"
        className="mb-4"
      />
    </div>
  )
}

export default AdviceInput
