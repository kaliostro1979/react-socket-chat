import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../icons/logo";
import Button from "../UI/Button";
import {signOut} from "firebase/auth";
import {auth, db} from "../../firebase/firebase";
import {doc, writeBatch} from "firebase/firestore";


const Header = ({currentUser}) => {
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        signOut(auth).then(()=>changeLoggedInStatus()).catch((error) => {
            // An error happened.
        });
    }

    async function changeLoggedInStatus() {
        const batch = writeBatch(db);
        const userRef = doc(db, 'users', currentUser.uid);
        batch.update(userRef, {status: "offline"});
        await batch.commit();
        navigate("/")
    }

    return (
        <header>
            <div className={"container"}>
                <div className={"home-header"}>
                    <div className={"logo"}>
                        <Link to={"/"}><Logo/></Link>
                    </div>
                    <div className={"home-buttons"}>
                        {
                            currentUser ?
                                <div className={"home-buttons__inner"}>

                                    <Link to={`/user/${currentUser.uid}/edit-profile`}>
                                        <div className={"home-current-user"}>
                                            {currentUser.displayName}
                                        </div>
                                    </Link>
                                    <Link to={`/chat`} className={"button button-primary"}>Chat</Link>
                                    <Button className={"button-secondary"} text={"Logout"} callBack={handleSignOut}/>
                                </div> :
                                <>
                                    <div className={"link"}>
                                        <Link to={"/login"} className={"button button-primary"}>Login</Link>
                                    </div>
                                    <div className="link">
                                        <Link to={"/register"} className={"button button-secondary"}>Register</Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
