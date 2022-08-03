import React, {useContext, useState} from 'react';
import {useSelector} from "react-redux";
import {AppContext, socket} from "../../context/appContext";

const NewChatForm = () => {
    const user = useSelector(state => state.currentUser)
    const [message, setMessage] = useState("")
    const { currentRoom, setCurrentRoom, setMessages, messages  } = useContext(AppContext)


    const handleSubmit =(event)=>{
        event.preventDefault()
        if (!message) return
        const roomId = currentRoom
        const date = JSON.stringify(new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0'))
        socket.emit("message-room", roomId, message, user, date)
        setMessage("")
    }

    socket.off("room-messages").on("room-messages", (roomMessages)=>{
        setMessages(roomMessages)
    })

    console.log(messages);

    return (
        <div className={"chat-wrapper"}>
            <div className={"chat-messages__container"}></div>
            <div className={"chat-message__form"}>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)}/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default NewChatForm;
