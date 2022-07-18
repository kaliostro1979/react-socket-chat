import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../redux/actions/getUsers";
import Preloader from "../Preloader/Preloader";
import Posts from "../Posts/Posts";


const Home = ({currentUser, logged, posts}) => {
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
                loading ? <Preloader/> :
                    <div className={"home-wrapper"}>
                        {
                            posts.length ? <Posts posts={posts} user={currentUser}/> : null
                        }
                    </div>
            }
        </>
    );
};

export default Home;
