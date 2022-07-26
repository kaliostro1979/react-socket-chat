import React, {useEffect, useState, useRef} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import Button from "../UI/Button";
import Input from "../UI/Input";
import ChatCloud from "./ChatCloud";
import Title from "../UI/Title";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import io from "socket.io-client";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {getMessages} from "../../redux/actions/getMessages";



const Chat = ({currentUser, onlineUsers, data}) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages)

    const [message, setMessage] = useState("")
    const [sendingMessage, setSendingMessage] = useState(null)
    const [messageList, setMessageList] = useState(messages)
    const navigate = useNavigate()
    const [typing, setTyping] = useState(false)
    const [typingUser, setTypingUser] = useState(null)

    const params = useParams()
    const socketRef = useRef()


    useEffect(() => {
        socketRef.current = io("ws://localhost:3001")
    }, [])

    useEffect(() => {
        dispatch(getMessages(currentUser && currentUser.uid, params.uid))
    }, [dispatch, params.uid, currentUser])

    useEffect(()=>{
        setMessageList(messages)
    }, [messages])

    useEffect(() => {
        if (!currentUser) {
            return navigate("/");
        }
    }, [navigate, currentUser])

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
        setTyping(false)
        setTypingUser(null)
    }

    useEffect(()=>{
        if (currentUser && sendingMessage) {
            const messageRef = doc(db, 'users', currentUser.uid, sendingMessage.receiverId, 'messages')
            setDoc(messageRef, {messageList}, {merge: true}).then();
        }
    }, [messageList, sendingMessage, currentUser])

    useEffect(() => {
        if (data){
            setMessageList((prev) => [...prev, {...data, date: Date.now(), author: data.senderName}])
        }
    }, [data])


    const handleInputMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage().then(() => setTyping(false))
        }

    }

    const exitRoom = async () => {
        navigate(`/`)
    }

    const handleOnBlur = (e) => {
        if (message.length <= 1) {

        }
    }

    useEffect(() => {
        if (data && currentUser) {
            const messageRef = doc(db, 'users', currentUser.uid, data.senderId, 'messages')
            setDoc(messageRef, {messageList}, {merge: true}).then();
        }
    }, [currentUser, data, messageList, params.uid])


    return (
        <>
            {
                !currentUser ? <Preloader/> : <div className={"chat-main wrapper"}>
                    <div className={"header"}>
                        <Title title={`Logged in as ${currentUser && currentUser.displayName}`}
                               className={'chat__title'}/>
                    </div>
                    <div className={"body-wrapper"}>
                        <ScrollToBottom scrollViewClassName={"scroll-body"} followButtonClassName={"scroll-button"}>
                            <div className={"body"}>
                                {
                                    messageList.length ? messageList.map((item, i) => {
                                        return (
                                            <ChatCloud
                                                author={item.author}
                                                message={item.text}
                                                name={currentUser && currentUser.displayName}
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
