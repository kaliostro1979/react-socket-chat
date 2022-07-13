import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/users";

export const rootReducer = combineReducers({
    users: userReducer
})
