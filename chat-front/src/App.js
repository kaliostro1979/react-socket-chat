import React, {useEffect, useMemo} from "react";
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import {auth, db} from "./firebase/firebase";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { collection, onSnapshot } from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "./redux/actions/getUsers";
import Sidebar from "./components/Sidebar/Sidebar";
import UserPost from "./components/User/UserPost";
import UserContent from "./components/User/UserContent";
import UserEditProfile from "./components/User/UserEditProfile";
import User from "./components/User/User";
import UserPostsList from "./components/User/UserPostsList";
import SinglePost from "./components/Posts/SinglePost";
import {getPosts} from "./redux/actions/getPosts";


function App() {
    const socket = io.connect("http://localhost:3001")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [logged, setLogged] = useState(false)
    const posts = useSelector(state => state.posts)

    const users = useSelector(state => state.users)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUsers())
        dispatch(getPosts())
    }, [dispatch, logged])

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if (users.length && user){
                users.forEach((u)=>{
                    if (u.uid === user.uid){
                        setCurrentUser(u)
                    }
                })
            }else {
                setCurrentUser(null)
            }
        })
    }, [users])

    useMemo(()=>{
        onSnapshot(collection(db, "users"),  (snapshot)=>{
            setLogged(snapshot)
        })
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <main>
                    <Header currentUser={currentUser && currentUser} setRoom={setRoom}/>
                    <div className="container">
                        <div className={"global-wrapper"}>
                            <div className={"global-left"}>
                                <Sidebar users={users} currentUser={currentUser}/>
                            </div>
                            <div className={"global-right"}>
                                <Routes>
                                    <Route path={"/"} element={<Home currentUser={currentUser && currentUser} logged={logged} posts={posts}/>}/>
                                    <Route path={"/start-chat"} element={<Main socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} user={currentUser &&currentUser}/>}>
                                        <Route path={":id"} element={<Main socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} user={currentUser && currentUser}/>}/>
                                    </Route>
                                    <Route path={"/chat"} element={<Chat room={room} socket={socket} userName={userName} user={currentUser && currentUser} setRoom={setRoom}/>}>
                                        <Route path={":uid"} element={<Chat room={room} socket={socket} userName={userName} user={currentUser && currentUser} setRoom={setRoom}/>}/>
                                    </Route>
                                    <Route path={"/login"} element={<Login user={currentUser && currentUser} socket={socket}/>}/>
                                    <Route path={"/register"} element={<Register user={currentUser && currentUser}/>}/>
                                    <Route path={"/user"} element={<User user={currentUser && currentUser}/>}>
                                        <Route path={":userId"} element={<UserContent/>}>
                                            <Route index element={<UserEditProfile/>}/>
                                            <Route path={"edit-profile"} element={<UserEditProfile/>}/>
                                            <Route path={"publish-post"} element={<UserPost socket={socket} user={currentUser && currentUser}/>} exact/>
                                            <Route path={"posts-list"} element={<UserPostsList socket={socket} user={currentUser && currentUser}/>} exact/>
                                        </Route>
                                    </Route>
                                    <Route path={"posts-list"} element={<UserPostsList socket={socket} user={currentUser && currentUser}/>} exact/>
                                    <Route path={"/post"}>
                                        <Route path={":id"} element={<SinglePost user={currentUser && currentUser} posts={posts}/>}/>
                                    </Route>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
