import React from 'react';
import {Link, useParams} from "react-router-dom";

const SinglePost = ({posts}) => {
    const params = useParams()
    const [post] = posts.filter(p=>p.post_id === params.id)


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
