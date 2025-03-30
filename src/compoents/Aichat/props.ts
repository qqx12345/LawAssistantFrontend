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
  start_date: string
  end_date: string
  performance: string
  price: string
  payment: string
  breach: string
  dispute: string
  confidential: string
  force: string
  termination: string
  additional: string
}

export interface ContraryInputProps {
  model: string
  doc_type: string
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

export interface AdviceData {
  question: string
  context?: string
}

