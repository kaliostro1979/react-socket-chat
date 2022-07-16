import React, {useCallback, useEffect, useState} from 'react';
import Title from "../UI/Title";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {useNavigate, useParams} from "react-router-dom";

const Main = ({socket, user}) => {
    const navigate = useNavigate()
    const params = useParams()

    const joinRoom = useCallback(()=>{
        if (user) {
            socket.emit("join_room", params.uid)
            navigate(`/chat/${params.uid}`)
        }
    }, [navigate, params.uid, socket, user])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setLoading(false)
        } else {
            setLoading(true)
        }

        joinRoom()
    }, [navigate, user, joinRoom])

    return (
        <>
            {
                loading ? <p>Loading...</p> : <div className={"start-chat__wrapper"}>
                    <div className={'chat-main__wrapper wrapper'}>
                        <Title title={"Create room"} className={'chat__title'}/>
                        <Input value={user ? user.displayName : ""} onChange={null} callBack={null} type={"text"}
                               name={"user_name"} id={"chat-username"} disabled={true} className={"room-user-name"}/>
                        <Input value={params.id} onChange={null} callBack={null} type={"text"} name={"room"}
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
