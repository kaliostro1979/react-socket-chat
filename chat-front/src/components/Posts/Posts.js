import React from 'react';
import PostCard from "./PostCard";

const Posts = ({posts}) => {
    return (
        <div className={"posts-main"}>
            {
                posts.length ? posts.map((post) => <PostCard post={post} key={post.post_id}/>) : null
            }
        </div>
    );
};

export default Posts;
