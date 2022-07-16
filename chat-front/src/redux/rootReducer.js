import {combineReducers} from "@reduxjs/toolkit";
import {usersReducer} from "./reducers/users";

export const rootReducer = combineReducers({
    users: usersReducer
})
