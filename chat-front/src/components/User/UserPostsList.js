import React from 'react';
import PostCard from "../Posts/PostCard";

const UserPostsList = ({user}) => {
    return (
        <div className={"user-content"}>
            {
                user ? user.posts.map((post)=>{
                    return (
                        <PostCard post={post} key={post.post_id}/>
                    )
                }) : null
            }
        </div>
    );
};

export default UserPostsList;
