import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth} from "../../firebase/firebase";
import {Link, useNavigate} from "react-router-dom";
import Title from "../UI/Title";

const Login = ({user}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate()

    useEffect(()=>{
        if (user){
            return navigate("/");
        }
    },[navigate, user])

    const login = async (e)=>{
        e.preventDefault()
        if (auth){
           await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigate("/start-chat")
                })
                .catch((error) => {
                    setError("Something went wrong")
                });
        }
    }

    return (
        <div className={"form-wrapper wrapper"}>
            <Title className={"form-title"} title={"Log in to your account"}/>
            {
                error ? <p className={"error"}>{error}</p> : null
            }
            <form>
                <Input onChange={setEmail} name={"email"} type={"email"} callBack={null} id={"auth-email"} placeholder={"E-mail"}/>
                <Input onChange={setPassword} name={"password"} type={"password"} callBack={null} id={"auth-password"} placeholder={"Password"}/>
                <div className={"buttons-wrapper"}>
                    <Button callBack={login} className={"button-primary"} text={"Login"} type={"submit"}/>
                    <Link to={"/register"}>Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
