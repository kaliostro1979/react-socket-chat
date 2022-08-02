import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import io from "socket.io-client";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {getMessages} from "../../redux/actions/getMessages";
import ChatCloudWrapper from "./ChatCloudWrapper";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";



const Chat = ({currentUser, onlineUsers, data}) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages)

    const [sendingMessage, setSendingMessage] = useState(null)
    const [messageList, setMessageList] = useState(messages || [])

    const navigate = useNavigate()
    const params = useParams()
    const socketRef = useRef()

    const setSendMessage = useCallback(async ()=>{
        if (currentUser && sendingMessage) {
            const messageRef = doc(db, 'users', currentUser.uid, sendingMessage.receiverId, 'messages')
            await setDoc(messageRef, {messageList}, {merge: true}).then();
        }
    }, [messageList, sendingMessage, currentUser])

    const setReceivedMessage = useCallback(async ()=>{
        if (data && currentUser) {
            const messageRef = doc(db, 'users', currentUser.uid, data.senderId, 'messages')
            await setDoc(messageRef, {messageList}, {merge: true}).then();
        }
    }, [messageList, data, currentUser])

    const setMessageListFunction = useCallback(async ()=>{
        await setMessageList(messages)
    }, [messages])

    useEffect(() => {
        socketRef.current = io("ws://localhost:3001")
    }, [])

    useEffect(() => {
        dispatch(getMessages(currentUser && currentUser.uid, params.uid))
    }, [dispatch, params.uid, currentUser])

    useEffect(()=>{
        setMessageListFunction().then()
    }, [setMessageListFunction])

    useEffect(() => {
        if (!currentUser) {
            return navigate("/");
        }
    }, [navigate, currentUser])

    useEffect(()=>{
        setSendMessage().then()
    }, [setSendMessage])

    useEffect(()=>{
        setReceivedMessage().then()
    }, [setReceivedMessage])

    useEffect(() => {
        if (data){
            setMessageList((prev) => [...prev, {...data, date: Date.now(), author: data.senderName}])
        }
    }, [data])


    return (
        <>
            {
                !currentUser ? <Preloader/> : <div className={"chat-main wrapper"}>
                    <ChatHeader currentUser={currentUser}/>
                    <ChatCloudWrapper currentUser={currentUser} messageList={messageList}/>
                    <ChatFooter
                        socketRef={socketRef}
                        onlineUsers={onlineUsers}
                        currentUser={currentUser}
                        setSendingMessage={setSendingMessage}
                        setMessageList={setMessageList}
                        params={params}
                        navigate={navigate}
                    />
                </div>
            }
        </>
    );
};

export default Chat;
