import {combineReducers} from "@reduxjs/toolkit";
import {usersReducer} from "./reducers/users";
import {postsReducer} from "./reducers/posts";

export const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer
})
