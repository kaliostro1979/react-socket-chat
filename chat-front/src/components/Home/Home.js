import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Posts from "../Posts/Posts";
import {getPosts} from "../../redux/actions/getPosts";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";


const Home = ({currentUser}) => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)

    useEffect(()=>{
        onSnapshot(collection(db, "posts"), (snapshot) => {
            dispatch(getPosts())
        });
    },[dispatch])

    return (
        <div className={"home-wrapper"}>
            {
                posts.length ? <Posts user={currentUser} posts={posts}/> : null
            }
        </div>
    );
};

export default Home;
