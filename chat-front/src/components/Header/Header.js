import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../icons/logo";
import Button from "../UI/Button";
import {signOut} from "firebase/auth";
import {auth, db} from "../../firebase/firebase";
import {doc, writeBatch} from "firebase/firestore";
import {useSelector} from "react-redux";


const Header = () => {
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate()
    const [dropDown, setDropDown] = useState(false)

    const handleSignOut = (e)=>{
        e.preventDefault()
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

    const toggleDropDown =()=>{
        setDropDown(!dropDown)
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
                                    <div  className={"current-user__button"}>
                                        <div className={"current-user__arrow"} onClick={toggleDropDown}></div>
                                        <Link to={`/user/${currentUser.uid}/edit-profile`}>
                                            <div className={"home-current-user"}>
                                                {currentUser.displayName}
                                            </div>
                                        </Link>
                                    </div>
                                    <ul className={dropDown ? "header-dropdown open" : "header-dropdown"}>
                                        <li onClick={()=>setDropDown(!dropDown)}><Link to={`/chat`}>Chat</Link></li>
                                        <li onClick={()=>setDropDown(!dropDown)}><Link to={"/logout"} onClick={handleSignOut}>Logout</Link></li>
                                    </ul>
                                </div> :
                                <>
                                    <div className={"link"}>
                                        <Link to={"/login"} className={"button button-secondary"}>Login</Link>
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
