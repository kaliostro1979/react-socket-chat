import React, {useEffect, useState, useCallback} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from "../UI/Button";
import Input from "../UI/Input";
import ChatCloud from "./ChatCloud";
import Title from "../UI/Title";
import {useNavigate, useParams} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {getMessages} from "../../redux/actions/getMessages";
import Preloader from "../Preloader/Preloader";


const Chat = ({socket, user, setRoom}) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages)

    const [message, setMessage] = useState("")
    const [messageList, setMessageList] = useState(messages)
    const navigate = useNavigate()
    const [typing, setTyping] = useState(false)
    const [typingUser, setTypingUser] = useState(null)
    const params = useParams()

    const joinRoom = useCallback(() => {
        if (user) {
            socket.emit("join_room", params.uid)
            navigate(`/chat/${params.uid}`)
        }
    }, [navigate, params.uid, socket, user])

    const sendMessage = async () => {
        if (message !== "") {

            const messageData = {
                author: user && user.displayName,
                message: message,
                date: new Date(Date.now()).getHours().toString().padStart(2, '0') + ":" + new Date(Date.now()).getMinutes().toString().padStart(2, '0'),
                typing: false,
                room: params.uid
            }

            await socket.emit("send_message", messageData)
            setMessageList((prev) => [...prev, messageData])

            const messageRef = doc(db, 'messages', params.uid);
            await setDoc(messageRef, {messages: [...messageList, messageData]}, {merge: true});

            setMessage("")
            setTyping(false)
            setTypingUser(null)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage().then(() => setTyping(false))
        }

    }

    const handleInputMessage = (e) => {
        setMessage(e.target.value)

        if (message !== "" || message.length > 1) {
            socket.emit('start_chat', {
                userId: user.uid,
                userName: user.displayName,
                room: params.uid,
                typing: true
            })
        }

        if (message.length <= 1) {
            socket.emit('end_chat', {
                userId: user.uid,
                userName: user.displayName,
                room: params.uid,
                typing: false
            })
        }
    }

    const exitRoom = () => {
        navigate(`/`)
        setRoom("")
    }

    const handleOnBlur = (e) => {
        if (message.length <= 1) {
            socket.emit('end_chat', {
                userId: user.uid,
                userName: user.displayName,
                room: user.uid,
                typing: false
            })
        }
    }

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }
    }, [navigate, user])

    useEffect(() => {
        joinRoom()
    }, [joinRoom]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((prev) => [...prev, data])
            setTyping(false)
        })

        socket.on('receive_typing', (data) => {
            setTyping(data.typing)
            setTypingUser(data.userName)
        })

        socket.on('stop_typing', (data) => {
            setTyping(data.typing)
            setTypingUser(data.userName)
        })

    }, [socket])

    useEffect(() => {
        dispatch(getMessages(params.uid))
    }, [dispatch, params.uid, messageList])


    return (
        <>
            {
                !user ? <Preloader/> : <div className={"chat-main wrapper"}>
                    <div className={"header"}>
                        <Title title={`Logged in as ${user && user.displayName} in Room N ${params.uid}`}
                               className={'chat__title'}/>
                    </div>
                    <div className={"body-wrapper"}>
                        <ScrollToBottom scrollViewClassName={"scroll-body"} followButtonClassName={"scroll-button"}>
                            <div className={"body"}>
                                {
                                    messageList.length ? messages.map((item, i) => {
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
                        {
                            typing ? <div className={"typing-label"}>
                                <p>{typingUser} typing
                                    <span className={"label__dot"}></span>
                                    <span className={"label__dot"}></span>
                                    <span className={"label__dot"}></span>
                                </p>
                            </div> : null
                        }
                    </div>
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
                </div>
            }
        </>
    );
};

export default Chat;
