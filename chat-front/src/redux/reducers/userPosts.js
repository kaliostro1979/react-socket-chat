import {GET_USER_POSTS} from "../types";

const initialState = []

export const getUserPostsReducer = (state=initialState, action)=>{

    switch (action.type){
        case GET_USER_POSTS:
            return action.payload
        default:
            return state
    }
}
