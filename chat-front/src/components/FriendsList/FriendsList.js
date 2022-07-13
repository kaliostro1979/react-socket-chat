import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/getUsers";

const FriendsList = () => {
    const users = useSelector(state=>state.users)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className={"friendslist-main"}>
            <h1>Friends list</h1>
            {
                users.length ? users.map((user)=>{
                    console.log(user);
                    return <p key={user.uid}>{user.displayName}</p>
                }) : null
            }
        </div>
    );
};

export default FriendsList;
