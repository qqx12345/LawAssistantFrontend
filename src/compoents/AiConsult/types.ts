import type React from "react"
export interface Parties {
  type: string
  name: string
  details: string
}

export interface Content {
  subject: string
  purpose: string
  location: string
  sign_date: string
  rights: string
  obligations: string
  start_date?: string
  end_date?: string
  performance?: string
  price?: string
  payment?: string
  breach?: string
  dispute?: string
  confidential?: string
  force?: string
  termination?: string
  additional?: string
}

export interface ContraryInputProps {
  title: string
  parties: Parties[]
  content: Content 
  additional: string
  onChange: (data: {
    title: string
    parties: Parties[]
    content: Content
    additional: string
  }) => void
}

export interface ComplaintData {
  court: string
  plaintiff: { type: string; name: string; details: string }
  defendant: { type: string; name: string; details: string }
  claims: string[]
  facts: string
  evidence: string[]
  law_basis: string[]
  attachments: string[]
}

export interface ComplaintInputProps {
  complaintData: ComplaintData
  onChange: (data: ComplaintData) => void
}

export interface AdviceData {
  background: string
  issues: string[]
  analysis: string
  risks: string[]
  suggestions: string[]
  references: string[]
}

export interface AdviceInputProps {
  adviceData: AdviceData
  onChange: (data: AdviceData) => void
}

export interface FormFieldProps {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  textarea?: boolean
  className?: string
}
