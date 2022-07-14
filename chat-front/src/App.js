import React, {useEffect} from "react";
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {auth} from "./firebase/firebase";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

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

    return (
        <BrowserRouter>
            <div className="App">
                <Header currentUser={currentUser}/>
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
