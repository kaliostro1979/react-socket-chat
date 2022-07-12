import React, {useEffect, useState} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from "../UI/Button";
import Input from "../UI/Input";
import ChatCloud from "./ChatCloud";
import Title from "../UI/Title";


const Chat = ({socket, room, userName}) => {
    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (message !== "") {
            const messageData = {
                author: userName,
                room: room,
                message: message,
                date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)

            setMessageList((prev) => [...prev, messageData])
            setMessage("")
        }

    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log('Data', data);
            setMessageList((prev) => [...prev, data])
        })
    }, [socket]);

    return (
        <div className={"chat-main"}>
            <div className={"header"}>
                <Title title={`Logged in as ${userName} in Room N ${room}`} className={'chat__title'}/>
            </div>
            <ScrollToBottom>
                <div className={"body"}>
                    {
                        messageList.length ? messageList.map((item, i) => {
                            return (
                                <ChatCloud
                                    author={item.author}
                                    message={item.message}
                                    name={userName}
                                    date={item.date}
                                    itemAuthor={item.author}
                                    key={i}
                                />
                            )
                        }) : null
                    }
                </div>
            </ScrollToBottom>
            <div className={"footer"}>
                <Input
                    callBack={sendMessage}
                    onChange={setMessage}
                    value={message}
                    type={"text"}
                />
                <Button
                    className={"button-secondary"}
                    text={"Send"}
                    callBack={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
