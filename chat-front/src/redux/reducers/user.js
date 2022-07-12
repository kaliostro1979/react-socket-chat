import {GET_USER} from "../types";

const initialState = {}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload
        default:
            return state
    }
}