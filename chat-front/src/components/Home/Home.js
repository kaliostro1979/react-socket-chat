import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/getUsers";
import UserCard from "../UserCard/UserCard";
import Preloader from "../Preloader/Preloader";



const Home = ({currentUser, logged}) => {
    const [loading, setLoading] = useState(false)

    const users = useSelector(state => state.users)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, logged])

    useEffect(() => {
        if (users.length) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [users.length])


    return (
        <>
            {
                loading ? <Preloader/> : <div className={"home-wrapper"}>
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
            }
        </>
    );
};

export default Home;
