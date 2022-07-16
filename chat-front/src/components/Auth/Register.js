import React, {useState, useEffect} from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../../firebase/firebase"
import {Link, useNavigate} from "react-router-dom";
import Title from "../UI/Title";
import {doc, setDoc, writeBatch} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";


const Register = ({user}) => {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")
    const [avatar, setAvatar] = useState(null)


    const handleInput = (e) => {

        switch (e.target.name) {
            case "email":
                return setEmail(e.target.value)
            case "user_name":
                return setUserName(e.target.value)
            case "pass":
                return setPassword(e.target.value)
            case "rpt-password":
                return setRepeatPassword(e.target.value)
            default:
                return ""
        }
    }

    let navigate = useNavigate()

    useEffect(() => {
        if (user) {
            return navigate("/");
        }
    }, [navigate, user])

    const register = (e) => {
        e.preventDefault()
        if (password === repeatPassword || userName !== "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (avatar) {
                        const avatarRef = ref(storage, `avatars/${avatar?.name + user.uid}`);
                        uploadBytes(avatarRef, avatar).then((snapshot) => {
                            getDownloadURL(snapshot.ref).then((url) => {
                                updateProfile(user, {
                                    displayName: userName,
                                    photoURL: avatar ? url : null
                                }).then(() => {
                                    const userRef = doc(db, 'users', user.uid);
                                    setDoc(userRef, JSON.parse(JSON.stringify(user))).then(() => {
                                        setDoc(userRef, {loggedIn: true}, {merge: true}).then();
                                        const batch = writeBatch(db);
                                        batch.update(userRef, {loggedIn: true, room: user.uid});
                                        batch.commit().then();
                                    });
                                }).catch((error) => {

                                });
                            })
                        })
                    } else {
                        updateProfile(user, {
                            displayName: userName,
                            photoURL: null
                        }).then(() => {
                            const userRef = doc(db, 'users', user.uid);
                            setDoc(userRef, JSON.parse(JSON.stringify(user))).then(() => {
                                setDoc(userRef, {loggedIn: true}, {merge: true}).then();
                            });
                            navigate("/start-chat")
                        }).catch((error) => {
                            console.log(error.message);
                        });
                    }
                })
                .catch((error) => {

                });
        } else {
            setError("Please enter password and user name")
        }
    }

    return (
        <div className={"form-wrapper wrapper"}>
            <Title className={"form-title"} title={"Register new account"}/>
            <form autoComplete="off">
                {
                    error && <p className={"error"}>{error}</p>
                }
                <Input onChange={handleInput} value={email} name={"email"} type={"email"} callBack={null}
                       id={"auth-email"} placeholder={"E-mail"}/>
                <Input onChange={handleInput} name={"user_name"} type={"text"} callBack={null} id={"auth-username"}
                       placeholder={"Username"}/>
                <Input onChange={handleInput} name={"pass"} type={"password"} callBack={null} id={"auth-password"}
                       placeholder={"Password"}/>
                <Input onChange={handleInput} name={"rpt-password"} type={"password"} callBack={null}
                       id={"auth-repeat-password"} placeholder={"Repeat password"}/>
                <Input type={"file"} name={"avatar"} placeholder={"choose your avatar"} id={"user-avatar"}
                       onChange={setAvatar}/>
                <div className={"buttons-wrapper"}>
                    <Button callBack={register} className={"button-primary"} text={"Register"} type={"submit"}/>
                    <Link to={"/login"}>Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
