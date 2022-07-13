import React from 'react';
import {Link} from "react-router-dom";
import Title from "../UI/Title";
import {auth} from "../../firebase/firebase";
import {signOut} from "firebase/auth";
import Button from "../UI/Button";



const Home = ({user}) => {

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }



    return (
        <div>
            <Title title={"Home"} className={"home-title"}/>
            {
                user ? <div>
                        <p>{user.displayName}</p>
                        <Button className={"button-secondary"} text={"Logout"} callBack={handleSignOut}/>
                    </div> :
                    <div className={"link"}>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </div>
            }
        </div>
    );
};

export default Home;
