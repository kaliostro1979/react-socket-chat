import React, {useState} from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";

const ChatFooter = ({socketRef, onlineUsers, currentUser, setSendingMessage, setMessageList, params, navigate}) => {
    const [message, setMessage] = useState("")


    const sendMessage = async () => {
        const receiver = onlineUsers.find((user) => user.uid === params.uid)

        const messageData = {
            senderId: currentUser.uid,
            receiverId: receiver && receiver.uid,
            senderName: currentUser.displayName,
            text: message,
            date: new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0'),
            itemAuthor: currentUser && currentUser.displayName,
            typing: false,
        }

        socketRef.current.emit("sendMessage", messageData)
        setSendingMessage({...messageData, date: Date.now(), author: messageData.senderName})
        setMessageList((prev) => [...prev, {...messageData, date: Date.now(), author: messageData.senderName}])

        setMessage("")
    }


    const handleInputMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage().then()
        }
    }

    const exitRoom = async () => {
        navigate(`/`)
    }

    const handleOnBlur = (e) => {
        if (message.length <= 1) {

        }
    }

    return (
        <div className={"footer"}>
            <Input
                callBack={handleKeyDown}
                onChange={handleInputMessage}
                value={message}
                type={"text"}
                onBlur={handleOnBlur}
            />
            <div className={"buttons-wrapper"}>
                <Button className={"button-secondary"} text={"Send"} callBack={sendMessage}/>
                <Button className={"button-primary"} text={"Exit room"} callBack={exitRoom}/>
            </div>
        </div>
    );
};

export default ChatFooter;
