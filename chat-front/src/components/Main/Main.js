import React, {useEffect} from 'react';
import { signOut } from "firebase/auth";
import Title from "../UI/Title";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import FriendsList from "../FriendsList/FriendsList";

const Main = ({socket, userName, setUserName, room, setRoom, user}) => {

    const navigate = useNavigate()

    const joinRoom = () => {
        if (user.displayName && room !== "") {
            socket.emit("join_room", room)
            navigate("/chat")
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
       if (user){
           return navigate(`/start-chat/${user.uid}`);
       }else {
           return navigate("/");
       }
   },[navigate, user])

    return (
        <div className={"start-chat__wrapper"}>
            <FriendsList/>
            <div className={'chat-main__wrapper wrapper'}>
                <Title title={"Join A Chat"} className={'chat__title'}/>
                <Input value={user ? user.displayName : ""} onChange={null} callBack={null} type={"text"} name={"user_name"} id={"chat-message"} disabled={true}/>
                <Input value={room} onChange={setRoom} callBack={null} type={"text"} name={"room"} id={"chat-room"} disabled={false}/>
                <div className={"buttons-wrapper"}>
                    <Button className={"button-primary"} text={"Join"} callBack={joinRoom}/>
                    <Button className={"button-primary"} text={"Log out"} callBack={handleSignOut}/>
                </div>
            </div>
        </div>
    );
};

export default Main;
