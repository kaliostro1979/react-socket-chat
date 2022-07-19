import {GET_MESSAGES} from "../types";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";

export const getMessages = (id)=>{

    return async (dispatch)=>{
        const docRef = doc(db, "messages", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const messages = docSnap.data().messages
            dispatch(getMessageAction(messages || []))
        }
    }
}


const getMessageAction = (messages)=>{
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}
