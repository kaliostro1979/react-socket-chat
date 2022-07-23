import {GET_MESSAGES} from "../types";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";

export const getMessages = (id, receiverId)=>{
    return async (dispatch)=>{
        if (id){
            const docRef = doc(db, `users/${id}/${receiverId}`, 'messages');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const messages = docSnap.data().messages
                dispatch(getMessageAction(messages))
            }
        }
    }
}


const getMessageAction = (messages)=>{
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}
