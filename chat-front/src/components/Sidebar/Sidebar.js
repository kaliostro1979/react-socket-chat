import React, {useEffect, useRef} from 'react';
import UserCard from "../UserCard/UserCard";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/getUsers";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const Sidebar = ({currentUser, socket}) => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(()=>{
        onSnapshot(collection(db, "users"),  (snapshot)=>{
            dispatch(getUsers())
        })
    }, [dispatch])

    return (
        <>
            {
                users.length ? users.map((user) => {
                    if (!currentUser){
                        return <UserCard user={user} key={user && user.uid}/>
                    }else if (currentUser && currentUser.uid !== user.uid){
                        return <UserCard user={user} key={user && user.uid} socket={socket}/>
                    }else {
                        return null
                    }
                }) : null
            }
        </>
    );
};

export default Sidebar;
