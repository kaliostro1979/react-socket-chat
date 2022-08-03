import React, {useContext} from 'react';
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png"
import {AppContext, socket} from "../../context/appContext";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const UserCard = ({user}) => {
    const currentUser = useSelector(state=>state.currentUser)
    const { currentRoom, setCurrentRoom, setPrivateMemberMsg } = useContext(AppContext)
    const navigate = useNavigate()

    const joinRoom = (room, isPublic = true)=>{
        if (!user){
            return alert("Please login")
        }
        socket.emit("join-room", room, currentRoom)
        setCurrentRoom(room)

        if (isPublic){
            setPrivateMemberMsg(null)
        }

    }

    const orderIds = (id1, id2)=>{
        if (id1 > id2){
            return id1 + "-" + id2
        }else {
            return id2 + "-" + id1
        }
    }

    const handlePrivetMemberMsg =(member)=>{
        navigate("/chat")
        setPrivateMemberMsg(member)
        const roomId = orderIds(currentUser.uid, member.uid)
        joinRoom(roomId, false)
    }

    return (
        <>
            {
                user.status === "online" ?
                    <div
                        className={user.status === "online" ? "user-card__wrapper current-user" : "user-card__wrapper"}
                        onClick={currentUser && currentUser.uid !== user.uid ? ()=>handlePrivetMemberMsg(user) : null}
                        data-disabled={currentUser && user.uid === currentUser.uid}
                    >
                        <div className={"user-avatar"}>
                            <img src={user.photoURL ? user.photoURL : avatarPlaceholder} alt=""/>
                        </div>
                        <div className={"user-meta"}>
                            <p className={"user-username"}>
                                {user.displayName}
                                {currentUser && user.uid === currentUser.uid && " (You)" }
                            </p>
                            <p className={"user-status"}>Online</p>
                        </div>
                    </div> :
                    <div className={user.status === "offline" ? "user-card__wrapper current-user" : "user-card__wrapper"}>
                        <div className={"user-avatar"}>
                            <img src={user.photoURL ? user.photoURL : avatarPlaceholder} alt=""/>
                        </div>
                        <div className={"user-meta"}>
                            <p className={"user-username"}>
                                {user.displayName}
                            </p>
                            <p className={"user-status"}>Offline</p>
                        </div>
                    </div>
            }
        </>
    );
};

export default UserCard;
