import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/getUsers";
import UserCard from "../UserCard/UserCard";



const Home = ({currentUser, logged}) => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, logged])


    return (
        <div className={"home-wrapper"}>
            <div className={"home-inner"}>
                <div className={"home-users"}>
                    {
                        users.length ? users.map((user) => {
                            return <UserCard user={user} key={user && user.uid} currentUser={currentUser}/>
                        }) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
