import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../redux/actions/getPost";
import Preloader from "../Preloader/Preloader";

const SinglePost = () => {
    const post = useSelector(state => state.post)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getPost(params.id))
    }, [dispatch, params.id])

    return (
        <>
            {
                !post ? <Preloader/> : <div className={"single-post__wrapper"}>
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
            }
        </>
    );
};

export default SinglePost;
