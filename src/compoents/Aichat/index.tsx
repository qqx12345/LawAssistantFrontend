import { useState } from "react";
import ChatBox from "./ChatBox"
import DisplayMessage from "./Display";
import HistorySideBar from "./HistorySideBar";


const Chat = () => {
    const [message, setMessage] = useState("");
    return (
        <div>
            <ChatBox setMessage={setMessage}/>
            <HistorySideBar />
            <DisplayMessage messages={message} />
        </div>
    )
}

export default Chat