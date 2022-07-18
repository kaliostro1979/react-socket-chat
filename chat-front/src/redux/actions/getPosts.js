import {GET_POSTS, GET_SINGLE_POSTS} from "../types";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";

export const getPosts = ()=>{
    return async (dispatch)=>{
        const postCollection = collection(db, 'posts');
        const postsSnapshot = await getDocs(postCollection);
        const postsList = postsSnapshot.docs.map(doc => doc.data())
        dispatch(getPostsAction(postsList))
    }
}

export const getSinglePost = (id)=>{
    return async (dispatch)=>{
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            dispatch(getSinglePostsAction(docSnap.data()))
        }
    }
}

const getPostsAction = (postsList)=>{
    return {
        type : GET_POSTS,
        payload: postsList
    }
}

const getSinglePostsAction = (post)=>{
    return {
        type : GET_SINGLE_POSTS,
        payload: post
    }
}
