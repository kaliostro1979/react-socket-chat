import React from 'react';
import {Link} from "react-router-dom";
import CloseIcon from "../../icons/close-icon";
import Preloader from "../Preloader/Preloader";
import {doc, getDoc, writeBatch, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const PostCard = ({post, willRemoved, user}) => {

    const handleRemovePost = async (e, id)=>{
        await deleteDoc(doc(db, "posts", id));

        const userRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const posts = docSnap.data().posts
            posts.push(post)
            const batch = writeBatch(db);
            batch.update(userRef, JSON.parse(JSON.stringify({posts: posts.filter(post=>post.post_id !== id)})));
            batch.commit().then();
        }

    }

    return (
        <div className={"post-card"}>
            {
                willRemoved ? <div className={"post-card__remove"} data-post={post.post_id} onClick={(e)=>handleRemovePost(e, post.post_id)}>
                    <CloseIcon/>
                </div> : null
            }
            <Link to={`post/${post.post_id}`}>
                {
                    post.title && post.text ? <div className={"post-card__wrapper"}>
                        <div className={"post-card__image-wrapper"}>
                            {
                                post.photo ?  <img src={post.photo} alt={post.post_id} className={"post-card__image"}/> : <Preloader/>
                            }
                        </div>
                        <div className={"post-card__meta"}>
                            <h2 className={"post-card__title"}>{post.title}</h2>
                            <div className={"post-card__content"}>
                                <p>{post.text}</p>
                            </div>
                            <p className={"post-card__author"}>Posted by: <strong>{post.author}</strong></p>
                            <div className={"post-card__date"}>
                                <small>{post.date} - {post.time}</small>
                            </div>
                        </div>
                    </div> : null
                }

            </Link>
        </div>
    );
};

export default PostCard;
