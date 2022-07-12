import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Title from "../UI/Title";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth} from "../../firebase/firebase";

const Main = ({socket, userName, setUserName, room, setRoom}) => {

    const [isLogged, setIsLogged] = useState(false)
    let navigate = useNavigate();


    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room)
            setIsLogged(true)
        }
    }

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

   useEffect(()=>{
       if (isLogged){
           return navigate("/chat");
       }
   },[isLogged, navigate])

    return (
        <div className={'chat-auth'}>
            <Title title={"Join A Chat"} className={'chat__title'}/>
            <Input value={userName} onChange={setUserName} callBack={null} type={"text"} name={"user_name"} id={"chat-message"}/>
            <Input value={room} onChange={setRoom} callBack={null} type={"text"} name={"room"} id={"chat-room"}/>
            <Button className={"button-primary"} text={"Join"} callBack={joinRoom}/>
            <Button className={"button-primary"} text={"Log out"} callBack={handleSignOut}/>
        </div>
    );
};

export default Main;