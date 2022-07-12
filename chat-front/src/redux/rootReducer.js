import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";

export const rootReducer = combineReducers({
    user: userReducer
})
