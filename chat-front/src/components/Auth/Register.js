import React, {useState} from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/firebase"
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    let navigate = useNavigate()


    const register = (e)=>{
        e.preventDefault()
        if (email !== "" && password !== ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    if (user){
                        navigate("/login")
                    }
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
                <Input onChange={setUserName} value={userName} name={"username"} type={"text"} callBack={null} id={"auth-username"} placeholder={"Username"}/>
                <Input onChange={setPassword} value={password} name={"password"} type={"password"} callBack={null} id={"auth-password"} placeholder={"Password"}/>
                <Input onChange={setRepeatPassword} value={repeatPassword} name={"repeat-password"} type={"password"} callBack={null} id={"auth-repeat-password"} placeholder={"Repeat password"}/>
                <Button callBack={register} className={"button-primary"} text={"Register"} type={"submit"}/>
            </form>
        </div>
    );
};

export default Register;