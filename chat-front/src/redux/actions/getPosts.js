import {GET_POSTS} from "../types";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";

export const getPosts = ()=>{
    return async (dispatch)=>{
        const postCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postCollection);
        const postsList = postsSnapshot.docs.map(doc => doc.data())
        dispatch(getPostsAction(postsList))
    }
}

const getPostsAction = (postsList)=>{
    return {
        type : GET_POSTS,
        payload: postsList
    }
}
