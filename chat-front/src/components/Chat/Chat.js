import React, {useEffect, useState} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from "../UI/Button";
import Input from "../UI/Input";
import ChatCloud from "./ChatCloud";
import Title from "../UI/Title";
import {useNavigate} from "react-router-dom";


const Chat = ({socket, room, user, setRoom}) => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if (!user){
            return navigate("/login");
        }
    },[navigate, user])

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                author: user && user.displayName,
                room: room,
                message: message,
                date: new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0')
            }

            await socket.emit("send_message", messageData)

            setMessageList((prev) => [...prev, messageData])
            setMessage("")
        }

    }

    const notifyIfUserTyping = ()=>{
        if (message !== ""){
            socket.emit('is_typing', 'user is chatting')
        }else {
            socket.emit('is_typing', 'user is not chatting')
        }
    }

    const handleInputMessage =(e)=>{

        setMessage(e.target.value)
        socket.emit('typing', {
            userId: user.uid,
            userName: user.displayName
        })
    }

    const exitRoom = ()=>{
        navigate(`/start-chat/${user.uid}`)
        setRoom("")
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((prev) => [...prev, data])
        })

    }, [socket]);

    return (
        <div className={"chat-main wrapper"}>
            <div className={"header"}>
                <Title title={`Logged in as ${user && user.displayName} in Room N ${room}`} className={'chat__title'}/>
            </div>
            <div className={"body-wrapper"}>
                <ScrollToBottom scrollViewClassName={"scroll-body"} followButtonClassName={"scroll-button"}>
                    <div className={"body"}>
                        {
                            messageList.length ? messageList.map((item, i) => {
                                return (
                                    <ChatCloud
                                        author={item.author}
                                        message={item.message}
                                        name={user && user.displayName}
                                        date={item.date}
                                        itemAuthor={item.author}
                                        key={i}
                                    />
                                )
                            }) : null
                        }
                    </div>
                </ScrollToBottom>
            </div>
            <div className={"footer"}>
                <Input
                    callBack={sendMessage}
                    onChange={handleInputMessage}
                    value={message}
                    type={"text"}
                    isTyping={notifyIfUserTyping}
                />
                <div className={"buttons-wrapper"}>
                    <Button className={"button-secondary"} text={"Send"} callBack={sendMessage}/>
                    <Button className={"button-primary"} text={"Exit room"} callBack={exitRoom}/>
                </div>
            </div>
        </div>
    );
};

export default Chat;
