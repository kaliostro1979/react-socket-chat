import React from 'react';
import PostCard from "./PostCard";

const Posts = ({posts, user}) => {

    return (
        <div className={"posts-main"}>
            {
                posts.length ?
                    posts.map((post) => <PostCard post={post} key={post.post_id} willRemoved={false} user={user}/>) :
                    <div><h2>There are no posts here yet</h2></div>
            }
        </div>
    );
};

export default Posts;
