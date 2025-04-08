"use client"

import FormField from "./FormField"
import type { ContraryInputProps } from "./types"

const ContraryInput = ({ title, parties, content, additional, onChange }: ContraryInputProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 overflow-auto">
      <h2 className="text-xl font-bold text-[#3a5199] mb-4">生成法律合同</h2>

      <FormField
        label="合同标题"
        id="title"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, parties, content, additional })}
        placeholder="输入合同标题"
        className="mb-4"
      />

      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] mb-2">当事方信息</h3>
        <div className="space-y-3">
          <FormField
            label="当事人姓名"
            id="party-name"
            value={parties[0].name}
            onChange={(e) => {
              const newParties = [{ ...parties[0], name: e.target.value }]
              onChange({ title, parties: newParties, content, additional })
            }}
            placeholder="输入当事人姓名"
          />
          <FormField
            label="当事人类型"
            id="party-type"
            value={parties[0].type}
            onChange={(e) => {
              const newParties = [{ ...parties[0], type: e.target.value }]
              onChange({ title, parties: newParties, content, additional })
            }}
            placeholder="如：甲方、公司等"
          />
          <FormField
            label="当事人详情"
            id="party-details"
            value={parties[0].details}
            onChange={(e) => {
              const newParties = [{ ...parties[0], details: e.target.value }]
              onChange({ title, parties: newParties, content, additional })
            }}
            placeholder="详细描述，例如：住所地、法定代表人等"
            textarea={true}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-medium text-[#3a5199] mb-2">合同内容</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            label="合同主题"
            id="content-subject"
            value={content.subject}
            onChange={(e) => {
              const newContent = { ...content, subject: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="例如：房屋租赁"
          />
          <FormField
            label="合同目的"
            id="content-purpose"
            value={content.purpose}
            onChange={(e) => {
              const newContent = { ...content, purpose: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="合同订立的目的"
          />
          <FormField
            label="履行地点"
            id="content-location"
            value={content.location}
            onChange={(e) => {
              const newContent = { ...content, location: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="例如：北京市朝阳区"
          />
          <FormField
            label="签订日期"
            id="content-sign-date"
            value={content.sign_date}
            onChange={(e) => {
              const newContent = { ...content, sign_date: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="YYYY-MM-DD"
          />
          <FormField
            label="权利"
            id="content-rights"
            value={content.rights}
            onChange={(e) => {
              const newContent = { ...content, rights: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="当事人的权利"
          />
          <FormField
            label="义务"
            id="content-obligations"
            value={content.obligations}
            onChange={(e) => {
              const newContent = { ...content, obligations: e.target.value }
              onChange({ title, parties, content: newContent, additional })
            }}
            placeholder="当事人的义务"
          />
        </div>
      </div>

      <FormField
        label="附加信息"
        id="additional"
        value={additional}
        onChange={(e) => onChange({ title, parties, content, additional: e.target.value })}
        placeholder="其他需要说明的信息"
        textarea={true}
        className="mb-3"
      />
    </div>
  )
}

export default ContraryInput
