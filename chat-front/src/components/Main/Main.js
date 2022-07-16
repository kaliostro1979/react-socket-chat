import React, {useEffect, useState} from 'react';
import Title from "../UI/Title";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useNavigate} from "react-router-dom";

const Main = ({socket, room, setRoom, user}) => {

    const navigate = useNavigate()

    const joinRoom = () => {
        if (user.displayName && room !== "") {
            socket.emit("join_room", room)
            navigate("/chat")
        }
    }

    const handleRoom = (e) => {
        setRoom(e.target.value)
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [navigate, user])

    return (
        <>
            {
                loading ? <p>Loading...</p> : <div className={"start-chat__wrapper"}>
                    <div className={'chat-main__wrapper wrapper'}>
                        <Title title={"Create room"} className={'chat__title'}/>
                        <Input value={user ? user.displayName : ""} onChange={null} callBack={null} type={"text"}
                               name={"user_name"} id={"chat-username"} disabled={true} className={"room-user-name"}/>
                        <Input value={room} onChange={handleRoom} callBack={null} type={"text"} name={"room"}
                               id={"chat-room"} disabled={false} placeholder={"Enter Room ID"}/>
                        <div className={"buttons-wrapper"}>
                            <Button className={"button-ternary"} text={"Join"} callBack={joinRoom}/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Main;
