import React, {useState, useEffect} from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth, db} from "../../firebase/firebase"
import {Link, useNavigate} from "react-router-dom";
import Title from "../UI/Title";
import { doc, setDoc } from "firebase/firestore";


const Register = ({user}) => {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate()

    useEffect(()=>{
        if (user){
            return navigate("/login");
        }
    },[navigate, user])

    const register = (e)=>{
        e.preventDefault()
        if (email !== "" && password !== "" && password === repeatPassword){
           createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: userName
                    }).then(() => {
                        const userRef = doc(db, 'users', user.uid);
                        setDoc(userRef, JSON.parse(JSON.stringify(user))).then();
                        navigate("/")
                    }).catch((error) => {

                    });
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }else {
            setError("Something went wrong")
        }
    }

    return (
        <div className={"form-wrapper wrapper"}>
            <Link to={"/"}>Back to home</Link>
            <Title className={"form-title"} title={"Register new account"}/>
            <form>
                {
                    error && <p>{error}</p>
                }
                <Input onChange={setEmail} value={email} name={"email"} type={"email"} callBack={null} id={"auth-email"} placeholder={"E-mail"}/>
                <Input onChange={setUserName} value={userName} name={"username"} type={"text"} callBack={null} id={"auth-username"} placeholder={"Username"}/>
                <Input onChange={setPassword} value={password} name={"password"} type={"password"} callBack={null} id={"auth-password"} placeholder={"Password"}/>
                <Input onChange={setRepeatPassword} value={repeatPassword} name={"repeat-password"} type={"password"} callBack={null} id={"auth-repeat-password"} placeholder={"Repeat password"}/>
                <div className={"buttons-wrapper"}>
                    <Button callBack={register} className={"button-primary"} text={"Register"} type={"submit"}/>
                    <Link to={"/login"}>Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
