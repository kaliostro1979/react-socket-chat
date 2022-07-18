import {combineReducers} from "@reduxjs/toolkit";
import {usersReducer} from "./reducers/users";
import {postsReducer} from "./reducers/posts";
import {singlePostReducer} from "./reducers/post";

export const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    post: singlePostReducer
})
