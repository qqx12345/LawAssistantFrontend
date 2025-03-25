import { useReducer, useState } from "react";
import { token } from "../../share/share";

// 修改接口类型定义
interface Parties {
    type: string;
    name: string;
    details: string;
}

interface Content {
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

interface ContraryInputProps {
    model: string;
    doc_type: string;
    title: string;
    parties: Parties;
    content: Content;
}

const ContraryInput = ({ title, parties, content }: ContraryInputProps) => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="title">标题:</label>
          <input id="title" type="text" value={title} />
        </div>
        <div>
          <label htmlFor="parties">当事人:</label>
          <input id="parties" type="text" value={parties.name} />
        </div>
        <div>
          <label htmlFor="content">内容:</label>
          <input id="content" type="text" value={content.subject} />
        </div>
        <button>生成</button>
      </form>
    </div>
  )
}

const ChatBox = ({setMessage}) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [documentType, setdocumentType] = useState<string>("");

  const SelectBar = () => {
    return (
      <div className="flex flex-row rounded-4xl ">
        <button className="btn" onClick={() => setdocumentType("contrary")}>生成法律合同</button>
        <button className="btn" onClick={() => setdocumentType("complaint")}>生成投诉装</button> 
        <button className="btn" onClick={() => setdocumentType("advice")}>生成法律意见</button>
      </div>
    );
  };

  const ToggleAiModel = () => {
    return (
      <div>
        <label htmlFor="ai-model-select">选择AI模型:</label>
        <select
          id="ai-model-select"
          className="select"
          onChange={(e) => setModel(e.target.value)}
        >
          <option>Moonshot</option>
          <option>Deepseek-R1</option>
          <option>Deepseek-V3</option>
        </select>
      </div>
    );
  };
  
  async function handleUserMessage(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault();
    if (documentType === "contrary") {
      const response = await fetch("/api/ai/contract", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        }),
      },);
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    } else if (documentType === "complaint") {
      const response = await fetch("/api/ai/complaint", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          model: model,
        }),
      })
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    } else if (documentType === "advice") {
      const response = await fetch("/api/ai/advice", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          model: model,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    } else {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          content: userMessage,
          theme: ""
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    }
    setUserMessage("");
  }

  return (
    <div className="">
      <SelectBar />
      <ToggleAiModel />
      <form onSubmit={handleUserMessage}>
        <input
          className="input"
          value={userMessage}
          placeholder="请输入文本"
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ChatBox;
