import {combineReducers} from "@reduxjs/toolkit";
import {usersReducer} from "./reducers/users";
import {postsReducer} from "./reducers/posts";
import {getPostReducer} from "./reducers/post";
import {getUserPostsReducer} from "./reducers/userPosts";
import {getMessagesReducer} from "./reducers/messages";
import {getCurrentUserReducer} from "./reducers/currentUser";

export const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    post: getPostReducer,
    userPosts: getUserPostsReducer,
    messages: getMessagesReducer,
    currentUser: getCurrentUserReducer
})
