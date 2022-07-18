import {GET_SINGLE_POSTS} from "../types";

const initialState = {}

export const singlePostReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_POSTS:
            return action.payload
        default:
            return state
    }
}