import React, {useContext, useState} from 'react';
import {useSelector} from "react-redux";
import {AppContext, socket} from "../../context/appContext";

const NewChatForm = () => {
    const user = useSelector(state => state.currentUser)
    const [message, setMessage] = useState("")
    const { currentRoom, setCurrentRoom,  } = useContext(AppContext)


    const handleSubmit =(event)=>{
        event.preventDefault()
        if (!message) return
        const roomId = currentRoom
        socket.emit("message-room", roomId, message, user)
        setMessage("")
    }

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
