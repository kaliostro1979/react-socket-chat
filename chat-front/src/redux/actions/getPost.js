import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {GET_SINGLE_POST} from "../types";

export const getPost = (id)=>{
    return async (dispatch)=>{
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(getPostAction(docSnap.data()))
        }
    }
}


const getPostAction = (postsList)=>{
    return {
        type : GET_SINGLE_POST,
        payload: postsList
    }
}

