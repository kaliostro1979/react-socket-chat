import {GET_CURRENT_USER} from "../types";

const initialState = {}

export const getCurrentUserReducer = (state=initialState, action)=>{
    switch (action.type){
        case GET_CURRENT_USER:
            return action.payload
        default:
            return state
    }
}