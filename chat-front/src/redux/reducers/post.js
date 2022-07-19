import {GET_SINGLE_POST} from "../types";

const initialState = {}

export const getPostReducer = (state=initialState, action)=>{
    switch (action.type){
        case GET_SINGLE_POST:
            return action.payload
        default:
            return state
    }
}
