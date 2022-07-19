import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {GET_CURRENT_USER} from "../types";

export const getCurrentUser = (id)=>{
    return async (dispatch)=>{
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(getCurrentUserAction(docSnap.data()))
        }
    }
}


const getCurrentUserAction = (user)=>{
    return {
        type : GET_CURRENT_USER,
        payload: user
    }
}