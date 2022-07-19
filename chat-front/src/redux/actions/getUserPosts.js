import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {GET_USER_POSTS} from "../types";

export const getUserPosts = (id)=>{
    const userPosts = []
    return async (dispatch)=>{
        const q = query(collection(db, "posts"), where("id", "==", id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            userPosts.push(doc.data())
        });

        dispatch(getUserPostsAction(userPosts))
    }
}


const getUserPostsAction = (postsList)=>{
    return {
        type : GET_USER_POSTS,
        payload: postsList
    }
}
