import React, {useState, useEffect} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {auth, db} from "../../firebase/firebase";
import {Link, useNavigate} from "react-router-dom";
import Title from "../UI/Title";
import {doc, writeBatch} from "firebase/firestore";


const Login = ({user}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if (user){
            return navigate("/");
        }
    },[navigate, user])


    const handleUserEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleUserPassword = (e)=>{
        setPassword(e.target.value)
    }

    const login = async (e)=>{
        e.preventDefault()
        if (auth){
           await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const batch = writeBatch(db);
                    const userRef = doc(db, 'users', userCredential.user.uid);
                    batch.update(userRef, {status: "online"});
                    await batch.commit();
                    navigate("/")
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
                <Input onChange={handleUserEmail} name={"email"} type={"email"} callBack={null} id={"auth-email"} placeholder={"E-mail"}/>
                <Input onChange={handleUserPassword} name={"password"} type={"password"} callBack={null} id={"auth-password"} placeholder={"Password"}/>
                <div className={"buttons-wrapper"}>
                    <Button callBack={login} className={"button-primary"} text={"Login"} type={"submit"}/>
                    <Link to={"/register"}>Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
