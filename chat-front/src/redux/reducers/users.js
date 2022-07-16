import {GET_USERS} from "../types";

const initialState = []

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return action.payload
        default:
            return state
    }
}
