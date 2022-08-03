import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {AppContext, socket} from "../../context/appContext";

const NewChatForm = () => {
    const user = useSelector(state => state.currentUser)
    const [message, setMessage] = useState("")
    const {currentRoom, setCurrentRoom, setMessages, messages} = useContext(AppContext)
    const scrollRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate();

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!message) return
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        const time = today.getHours() + ":" + minutes + ":" + seconds;
        socket.emit("message-room", currentRoom, message, user, time, todayDate)
        setMessage("")
    }

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages)
    })

    function scrollToBottom() {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }


    return (
        <div className={"chat-wrapper"}>
            {
                !currentRoom ? <div>Welcome to chat!! Please choose room</div> : <>
                    <div className={"chat-messages__container"}>
                        {
                            messages && messages.map((message, index) => {

                                return (
                                    <div
                                        className={user && user.uid === message.from.uid ? "message-container you" : "message-container"}
                                        key={index}>
                                        <div className={"message-wrapper"}>
                                            <div className={"sender-info"}>
                                                <img src={message.from.photoURL} alt="" className={"sender-image"}/>
                                                <p>{message.from.displayName}</p>
                                            </div>
                                            <p>{message.content}</p>
                                            <small>{message.date} - {message.time}</small>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div ref={scrollRef}></div>
                    </div>
                    <div className={"chat-message__form"}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                            <button>Send</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default NewChatForm;
