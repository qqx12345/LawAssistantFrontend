import { useState } from "react";
import ChatBox from "./ChatBox"
import DisplayMessage from "./Display";
import HistoryBar from "./HistorySIdeBar";

const Chat = () => {
    const [message, setMessage] = useState("");
    return (
        <div>
            <ChatBox setMessage={setMessage}/>
            <HistoryBar />
            <DisplayMessage messages={message} />
        </div>
    )
}

export default Chat