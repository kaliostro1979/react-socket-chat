import React, {useEffect} from "react";
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {auth} from "./firebase/firebase";
import Home from "./components/Home/Home";
import Logo from "./icons/logo";
import Button from "./components/UI/Button";
import {signOut} from "firebase/auth";

function App() {
    const socket = io.connect("http://localhost:3001")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [currentUser, setCurrentUser] = useState(null)


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setCurrentUser(user)
        })
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <BrowserRouter>
            <div className="App">
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
                                           <div className={"home-current-user"}>
                                               <Link to={`/start-chat/${currentUser.uid}`}>{currentUser.displayName}</Link>
                                           </div>
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
                <div className="container">
                    <Routes>
                        <Route path={"/"} element={<Home currentUser={currentUser}/>}/>
                        <Route path={"/start-chat"} element={<Main socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} user={currentUser}/>}>
                            <Route path={":id"} element={<Main socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} user={currentUser}/>}/>
                        </Route>
                        <Route path={"/chat"} element={<Chat room={room} socket={socket} userName={userName} user={currentUser} setRoom={setRoom}/>}/>
                        <Route path={"/login"} element={<Login user={currentUser}/>}/>
                        <Route path={"/register"} element={<Register user={currentUser}/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
