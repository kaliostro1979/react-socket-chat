import React, {useEffect} from 'react';
import PostCard from "../Posts/PostCard";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserPosts} from "../../redux/actions/getUserPosts";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";




const UserPostsList = () => {
    const params = useParams()
    const posts = useSelector(state => state.userPosts)
    const dispatch = useDispatch()

    useEffect(()=>{
        onSnapshot(collection(db, "posts"), (snapshot) => {
            dispatch(getUserPosts(params.uid))
        });
    },[dispatch, params.uid])

    return (
        <div className={"user-content"}>
            {
                posts.length ? posts.map((post) => {
                    return (
                        <PostCard post={post} key={post.post_id} willRemoved={true} userId={params.uid}/>
                    )
                }) : null
            }
        </div>
    );
};

export default UserPostsList;
