import React, {useState} from 'react';
import { signInWithCustomToken, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    onAuthStateChanged(auth, (user) => {
        console.log('user', user)
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;// ...
            navigate("/")
        } else {
            // User is signed out
            // ...
        }
    })

    const login = async (e)=>{
        e.preventDefault()
        if (auth){
           await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }

    return (
        <div className={"form-wrapper"}>
            <form>
                <Input onChange={setEmail} value={email} name={"email"} type={"email"} callBack={null} id={"auth-email"} placeholder={"E-mail"}/>
                <Input onChange={setPassword} value={password} name={"password"} type={"password"} callBack={null} id={"auth-password"} placeholder={"Password"}/>
                <Button callBack={login} className={"button-primary"} text={"Login"} type={"submit"}/>
            </form>
        </div>
    );
};

export default Login;