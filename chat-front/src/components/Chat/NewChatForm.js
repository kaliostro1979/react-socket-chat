import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import Picker, {SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';
import {AppContext, socket} from "../../context/appContext";
import WelcomeImage from "../../assets/images/welcome.png"
import emoji from "../../assets/images/emoji.png"

const NewChatForm = () => {
    const user = useSelector(state => state.currentUser)
    const [message, setMessage] = useState("")
    const {currentRoom, setMessages, messages} = useContext(AppContext)
    const scrollRef = useRef(null)
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

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

    const handleMessage = (event)=>{
        setMessage(event.target.value)
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
                !currentRoom ? <div>
                        <div className={"welcome-image"}>
                            <img src={WelcomeImage} alt=""/>
                        </div>
                        <p className={"welcome-text"}>Welcome to chat!! Please choose room</p>
                    </div> :
                    <>
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
                                                    <p className={"sender-name"}>{message.from.displayName}</p>
                                                </div>
                                                <p className={"message-content"}>{message.content}</p>
                                                <small className={"message-date"}>{message.date} - {message.time}</small>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div ref={scrollRef}></div>
                        </div>
                        <div className={"chat-message__form"}>
                            <form onSubmit={handleSubmit}>
                                <div className={"form-input__container"}>
                                    <div className={"emoji-wrapper"}>
                                        {
                                            showPicker && <Picker
                                                onEmojiClick={onEmojiClick}
                                                disableAutoFocus={true}
                                                skinTone={SKIN_TONE_MEDIUM_DARK}
                                                groupNames={{ smileys_people: 'PEOPLE' }}
                                                native
                                            />
                                        }
                                    </div>
                                    <div className={"form-input__wrapper"}>
                                        <img
                                            className="emoji-icon"
                                            src={emoji}
                                            onClick={() => setShowPicker(val => !val)}
                                            alt={"emoji"}
                                        />
                                        <input type="text" value={message} onChange={handleMessage}/>
                                    </div>
                                </div>
                                <button>Send</button>
                            </form>
                        </div>
                    </>
            }
        </div>
    );
};

export default NewChatForm;
