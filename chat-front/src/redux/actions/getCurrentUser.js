import {GET_CURRENT_USER} from "../types";

export const getCurrentUser = ()=>{
    return async (dispatch)=>{
        const userJson = sessionStorage.getItem('current_user')
        const user = userJson ? JSON.parse(userJson) : null
        dispatch(getCurrentUserAction(user))
    }
}


const getCurrentUserAction = (user)=>{
    return {
        type : GET_CURRENT_USER,
        payload: user
    }
}
