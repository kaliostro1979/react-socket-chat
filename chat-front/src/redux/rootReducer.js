import {combineReducers} from "@reduxjs/toolkit";
import {testReducer} from "./reducers/testReducer";

export const rootReducer = combineReducers({
    test: testReducer
})
