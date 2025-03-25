import { useState } from "react";
import { token } from "../../share/share";
import { ComplaintData, Content, ContraryInputProps, Parties } from "./props";

const ContraryInput = ({ title, parties, content, additional, onChange }: ContraryInputProps) => {
  return (
    <div className="card p-4 mb-4">
      <form>
        <div className="form-control mb-2">
          <label htmlFor="title" className="label">标题:</label>
          <input 
            id="title" 
            type="text" 
            className="input input-bordered w-full"
            value={title} 
            onChange={(e) => onChange({ title: e.target.value, parties, content, additional })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="party-name" className="label">当事人姓名:</label>
          <input 
            id="party-name" 
            type="text" 
            className="input input-bordered w-full"
            value={parties[0].name} 
            onChange={(e) => {
              const newParties = [{ ...parties[0], name: e.target.value }];
              onChange({ title, parties: newParties, content, additional });
            }}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="content-subject" className="label">内容主题:</label>
          <input 
            id="content-subject" 
            type="text" 
            className="input input-bordered w-full"
            value={content.subject} 
            onChange={(e) => {
              const newContent = { ...content, subject: e.target.value };
              onChange({ title, parties, content: newContent, additional });
            }}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="additional" className="label">附加信息:</label>
          <input 
            id="additional" 
            type="text" 
            className="input input-bordered w-full"
            value={additional} 
            onChange={(e) => onChange({ title, parties, content, additional: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-secondary">生成</button>
      </form>
    </div>
  )
}



const ComplaintInput = ({ complaintData, onChange }: { complaintData: ComplaintData; onChange: (data: ComplaintData) => void; }) => {
  return (
    <div className="card p-4 mb-4">
      <form>
        <div className="form-control mb-2">
          <label htmlFor="court" className="label">受理法院:</label>
          <input 
            id="court" 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.court}
            onChange={(e) => onChange({ ...complaintData, court: e.target.value })}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">原告姓名:</label>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.plaintiff.name}
            onChange={(e) => onChange({ ...complaintData, plaintiff: { ...complaintData.plaintiff, name: e.target.value } })}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">原告详情:</label>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.plaintiff.details}
            onChange={(e) => onChange({ ...complaintData, plaintiff: { ...complaintData.plaintiff, details: e.target.value } })}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">被告姓名:</label>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.defendant.name}
            onChange={(e) => onChange({ ...complaintData, defendant: { ...complaintData.defendant, name: e.target.value } })}
          />
        </div>
        <div className="form-control mb-2">
          <label className="label">被告详情:</label>
          <input 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.defendant.details}
            onChange={(e) => onChange({ ...complaintData, defendant: { ...complaintData.defendant, details: e.target.value } })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="claims" className="label">诉讼请求 (逗号分隔):</label>
          <input 
            id="claims" 
            type="text"
            className="input input-bordered w-full"
            value={complaintData.claims.join(",")}
            onChange={(e) => onChange({ ...complaintData, claims: e.target.value.split(",").map(s => s.trim()) })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="facts" className="label">事实:</label>
          <textarea 
            id="facts"
            className="textarea textarea-bordered w-full"
            value={complaintData.facts}
            onChange={(e) => onChange({ ...complaintData, facts: e.target.value })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="evidence" className="label">证据 (逗号分隔):</label>
          <input 
            id="evidence"
            type="text"
            className="input input-bordered w-full"
            value={complaintData.evidence.join(",")}
            onChange={(e) => onChange({ ...complaintData, evidence: e.target.value.split(",").map(s => s.trim()) })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="law_basis" className="label">法律依据 (逗号分隔):</label>
          <input 
            id="law_basis"
            type="text"
            className="input input-bordered w-full"
            value={complaintData.law_basis.join(",")}
            onChange={(e) => onChange({ ...complaintData, law_basis: e.target.value.split(",").map(s => s.trim()) })}
          />
        </div>
        <div className="form-control mb-2">
          <label htmlFor="attachments" className="label">附件 (逗号分隔):</label>
          <input 
            id="attachments"
            type="text"
            className="input input-bordered w-full"
            value={complaintData.attachments.join(",")}
            onChange={(e) => onChange({ ...complaintData, attachments: e.target.value.split(",").map(s => s.trim()) })}
          />
        </div>
        <button type="button" className="btn btn-secondary">生成</button>
      </form>
    </div>
  )
}

const AdviceInput = () => {
  return (
    <div className="card p-4 mb-4">
      <form>
        <div className="form-control mb-2">
          <label htmlFor="advice" className="label">法律意见:</label>
          <input id="advice" type="text" className="input input-bordered w-full" />
        </div>
        <button className="btn btn-secondary">生成</button>
      </form>
    </div>
  )
}

const ChatInput = ({userChat, onChange}) => {
  return (
    <div className="card p-4 mb-4">
      <form>
        <input type="text" className="input input-bordered w-full" onChange={(e) => onChange(e.target.value)}/>
      </form>
    </div>
  )
}

const ChatBox = ({ setMessage }) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [model, setModel] = useState<string>("moonshot");
  const [documentType, setdocumentType] = useState<string>("");
  const [userChat, setUserChat] = useState<string>("");

  const [contraryData, setContraryData] = useState<{
    title: string;
    parties: Parties[];
    content: Content;
    additional: string;
  }>({
    title: "",
    parties: [{ type: "", name: "", details: "" }],
    content: {
      subject: "",
      purpose: "",
      location: "",
      sign_date: "",
      rights: "",
      obligations: "",
      start_date: "",
      end_date: "",
      performance: "",
      price: "",
      payment: "",
      breach: "",
      dispute: "",
      confidential: "",
      force: "",
      termination: "",
      additional: ""
    },
    additional: ""
  });

  const [complaintData, setComplaintData] = useState<ComplaintData>({
    court: "",
    plaintiff: { type: "原告", name: "", details: "" },
    defendant: { type: "被告", name: "", details: "" },
    claims: [],
    facts: "",
    evidence: [],
    law_basis: [],
    attachments: []
  });

  const SelectBar = () => {
    return (
      <div className="btn-group mb-4">
        <button className="btn" onClick={() => setdocumentType("")}>聊天</button>
        <button className="btn" onClick={() => setdocumentType("contrary")}>生成法律合同</button>
        <button className="btn" onClick={() => setdocumentType("complaint")}>生成投诉状</button> 
        <button className="btn" onClick={() => setdocumentType("advice")}>生成法律意见</button>
      </div>
    );
  };

  const ToggleAiModel = () => {
    return (
      <div className="form-control w-full max-w-xs mb-4">
        <label htmlFor="ai-model-select" className="label">选择AI模型:</label>
        <select
          id="ai-model-select"
          className="select select-bordered"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        >
          <option>moonshot</option>
          <option>deepseek-reasoner</option>
          <option>deepseek-chat</option>
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
          model: model,
          doc_type: "contrary",
          title: contraryData.title,
          parties: contraryData.parties,
          content: contraryData.content,
          additional: contraryData.additional
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    } else if (documentType === "complaint") {
      const response = await fetch("/api/ai/complain", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          content: complaintData
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage(data);
      }
    } else if (documentType === "advice") {
      const response = await fetch("/api/ai/option", {
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
          content: userChat,
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
    <div className="card p-4">
      <SelectBar />
      <ToggleAiModel />
      {documentType === "contrary" && (
        <>
          <ContraryInput 
            model={model}
            doc_type="contrary"
            title={contraryData.title}
            parties={contraryData.parties}
            content={contraryData.content}
            additional={contraryData.additional}
            onChange={(data) => setContraryData(data)}
          />
          <form onSubmit={handleUserMessage}>
            <button type="submit" className="btn btn-primary mt-4">提交合同请求</button>
          </form>
        </>
      )}
      {documentType === "complaint" && (
        <>
          <ComplaintInput 
            complaintData={complaintData}
            onChange={(data) => setComplaintData(data)}
          />
          <form onSubmit={handleUserMessage}>
            <button type="submit" className="btn btn-primary mt-4">提交投诉状请求</button>
          </form>
        </>
      )}
      {documentType === "advice" && <AdviceInput />}
      {documentType === "" && 
        <>
          <ChatInput 
            userChat={userChat}
            onChange={(data) => setUserChat(data)}
            />
          <form onSubmit={handleUserMessage}>
            <button type="submit" className="btn btn-primary mt-4">发送</button>
          </form>
        </>}
    </div>
  );
};

export default ChatBox;
