import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getSinglePost} from "../../redux/actions/getPosts";

const SinglePost = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const post = useSelector(state => state.post)

    useEffect(()=>{
        dispatch(getSinglePost(params.id))
    }, [dispatch, params.id])

    return (
        <div className={"single-post__wrapper"}>
            <div className={"single-post__header"}>
                <Link to={"/"}>Back to home</Link>
            </div>
            <div className={"single-post__image-wrapper"}>
                <img src={post.photo} alt={post.post_id} className={"single-post__image"}/>
            </div>
            <h2 className={"single-post__title"}>{post.title}</h2>
            <p className={"single-post__text"}>{post.text}</p>
            <div className={"single-post__meta"}>
                <strong>{post.author}</strong>
                <small>{post.date}</small>
            </div>
        </div>
    );
};

export default SinglePost;
