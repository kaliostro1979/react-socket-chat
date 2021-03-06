import React, {useState} from 'react';
import Input from "../UI/Input";
import AvatarIcon from "../../icons/avatar-icon";
import Button from "../UI/Button";
import {doc, setDoc, collection} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";


const UserPost = ({user}) => {
    const [photo, setPhoto] = useState(null)
    const [postTitle, setPostTitle] = useState("")
    const [postText, setPostText] = useState("")
    const [disabled, setDisabled] = useState(false)

    const handlePostContent = (e)=>{
        switch (e.target.name){
            case "title":
                return setPostTitle(e.target.value)
            case "post-content":
                return setPostText(e.target.value)
            case "":
                return setPhoto(e.target.files[0])
            default:
                return ""
        }
    }

    const submitForm = ()=>{
        const photoRef = ref(storage, `postImages/${photo?.name + user.uid}`);
        setDisabled(true)
        uploadBytes(photoRef, photo).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                const post = {
                    id: user.uid,
                    author: user.displayName,
                    date: new Intl.DateTimeFormat(['ban', 'id']).format(new Date(Date.now()).getTime()),
                    time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
                    title: postTitle,
                    text: postText,
                    photo: photo ? url : null
                }
                if (post.title !== "" && post.text !== ""){
                    const postRef = doc(collection(db, "posts"))
                    post["post_id"] = postRef.id
                    setDoc(postRef, JSON.parse(JSON.stringify(post))).then(() => {
                    });
                    setPostTitle("")
                    setPostText("")
                    setPhoto(null)
                    setDisabled(false)
                }
            })
        })


    }

    return (
        <div className={"user-edit-post user-content"}>
            <h2 className={"user-content__title"}>Publish post</h2>
            <div>
                <Input type={"text"} className={"post-title"} name={"title"} placeholder={"Post title"} value={postTitle} onChange={handlePostContent} required={true}/>
                <textarea name="post-content" id="post-content" className={"post-content"} value={postText} onChange={handlePostContent} required={true}>

                </textarea>
                <label htmlFor="user-avatar" className={"input input-label"}>
                    <div className={"label-icon"}>
                        <AvatarIcon/>
                        {!photo ? <p>Post Photo</p> : <p>{photo.name}</p>}
                    </div>
                    <Input type={"file"} name={"avatar"} placeholder={"Post Photo"} id={"user-avatar"}
                           onChange={setPhoto}/>
                </label>
                <Button className={"button-primary"} text={"Publish"} type={"submit"} callBack={submitForm} disabled={disabled}/>
            </div>
        </div>
    );
};

export default UserPost;
