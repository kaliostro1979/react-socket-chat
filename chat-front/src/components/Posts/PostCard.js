import React from 'react';
import {Link} from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <Link to={`post/${post.post_id}`}>
            {
                post.title && post.text ? <div className={"post-card__wrapper"}>

                    <div className={"post-card__image-wrapper"}>
                        <img src={post.photo} alt={post.post_id} className={"post-card__image"}/>
                    </div>
                    <h2 className={"post-card__title"}>{post.title}</h2>
                    <div className={"post-card__content"}>
                        <p>{post.text}</p>
                    </div>

                    <p className={"post-card__author"}>Posted by: <strong>{post.author}</strong></p>
                    <div className={"post-card__date"}>
                        <small>{post.date} - {post.time}</small>
                    </div>
                </div> : null
            }

        </Link>
    );
};

export default PostCard;
