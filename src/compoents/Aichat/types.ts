export interface Parties {
  type: string;
  name: string;
  details: string;
}

export interface Content {
  subject: string;
  purpose: string;
  location: string;
  sign_date: string;
  rights: string;
  obligations: string;
  start_date: string;
  end_date: string;
  performance: string;
  price: string;
  payment: string;
  breach: string;
  dispute: string;
  confidential: string;
  force: string;
  termination: string;
  additional: string;
}

export interface ContraryInputProps {
  model: string;
  doc_type: string;
  title: string;
  parties: Parties[];
  content: Content;
  additional: string;
  onChange: (data: {
    title: string;
    parties: Parties[];
    content: Content;
    additional: string;
  }) => void;
}

export interface ComplaintData {
  court: string;
  plaintiff: { type: string; name: string; details: string };
  defendant: { type: string; name: string; details: string };
  claims: string[];
  facts: string;
  evidence: string[];
  law_basis: string[];
  attachments: string[];
}

export interface AdviceData {
  background: string;
  issues: string[];
  analysis: string;
  risks: string[];
  suggestions: string[];
  references: string[];
} 

export interface MessageType {
  id?: string;
  content: string;
  response: string;
  theme: string;
  timestamp?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface HistorySideBarProps {
  setMessages: (messages: ChatMessage[]) => void;
  setUserMessage?: (message: string) => void;
  setSelectedHistoryId: (id: string | null) => void;
  selectedHistoryId: string | null;
  setCurrentTheme: (theme: string) => void;
}

export interface ChatBoxProps {
  addMessage: (message: ChatMessage) => void;
  messages: ChatMessage[];
  setIsLoading: (isLoading: boolean) => void;
  refreshHistory: () => void;
  selectedHistoryId: string | null;
  setSelectedHistoryId: (id: string | null) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export interface FormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  textarea?: boolean;
  className?: string;
}

export interface HistoryItem {
  id: string
  theme: string
  content?: string
  response?: string
  created_at: string
  updated_at: string
}
