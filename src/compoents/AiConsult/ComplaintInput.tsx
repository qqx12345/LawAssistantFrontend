"use client"

import FormField from "./FormField"
import type { ComplaintInputProps } from "./types"

const ComplaintInput = ({ complaintData, onChange }: ComplaintInputProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 overflow-auto">
      <h2 className="text-xl font-bold text-[#3a5199] mb-4">生成投诉状</h2>

      <FormField
        label="受理法院"
        id="court"
        value={complaintData.court}
        onChange={(e) => onChange({ ...complaintData, court: e.target.value })}
        placeholder="例如：北京市朝阳区人民法院"
        className="mb-4"
      />

      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] mb-2">原告信息</h3>
        <div className="space-y-3">
          <FormField
            label="原告姓名"
            id="plaintiff-name"
            value={complaintData.plaintiff.name}
            onChange={(e) =>
              onChange({
                ...complaintData,
                plaintiff: { ...complaintData.plaintiff, name: e.target.value },
              })
            }
            placeholder="输入原告姓名"
          />
          <FormField
            label="原告详情"
            id="plaintiff-details"
            value={complaintData.plaintiff.details}
            onChange={(e) =>
              onChange({
                ...complaintData,
                plaintiff: {
                  ...complaintData.plaintiff,
                  details: e.target.value,
                },
              })
            }
            placeholder="详细描述，例如：住所地、联系方式等"
            textarea={true}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] mb-2">被告信息</h3>
        <div className="space-y-3">
          <FormField
            label="被告姓名"
            id="defendant-name"
            value={complaintData.defendant.name}
            onChange={(e) =>
              onChange({
                ...complaintData,
                defendant: { ...complaintData.defendant, name: e.target.value },
              })
            }
            placeholder="输入被告姓名"
          />
          <FormField
            label="被告详情"
            id="defendant-details"
            value={complaintData.defendant.details}
            onChange={(e) =>
              onChange({
                ...complaintData,
                defendant: {
                  ...complaintData.defendant,
                  details: e.target.value,
                },
              })
            }
            placeholder="详细描述，例如：住所地、联系方式等"
            textarea={true}
          />
        </div>
      </div>

      <FormField
        label="诉讼请求 (逗号分隔)"
        id="claims"
        value={complaintData.claims.join(",")}
        onChange={(e) =>
          onChange({
            ...complaintData,
            claims: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="例如：判令被告赔偿损失10000元,判令被告公开���歉"
        className="mb-3"
      />

      <FormField
        label="事实与理由"
        id="facts"
        value={complaintData.facts}
        onChange={(e) => onChange({ ...complaintData, facts: e.target.value })}
        placeholder="详细描述案件事实经过和理由依据"
        textarea={true}
        className="mb-3"
      />

      <FormField
        label="证据 (逗号分隔)"
        id="evidence"
        value={complaintData.evidence.join(",")}
        onChange={(e) =>
          onChange({
            ...complaintData,
            evidence: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="例如：合同原件,付款凭证,短信记录"
        className="mb-3"
      />

      <FormField
        label="法律依据 (逗号分隔)"
        id="law_basis"
        value={complaintData.law_basis.join(",")}
        onChange={(e) =>
          onChange({
            ...complaintData,
            law_basis: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="例如：《合同法》第107条,《民法典》第577条"
        className="mb-3"
      />

      <FormField
        label="附件 (逗号分隔)"
        id="attachments"
        value={complaintData.attachments.join(",")}
        onChange={(e) =>
          onChange({
            ...complaintData,
            attachments: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
        placeholder="例如：身份证复印件,原告资格证明"
        className="mb-3"
      />
    </div>
  )
}

export default ComplaintInput
