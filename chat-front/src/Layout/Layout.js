import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../components/Home/Home";
import Chat from "../components/Chat/Chat";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import User from "../components/User/User";
import UserEditProfile from "../components/User/UserEditProfile";
import UserPost from "../components/User/UserPost";
import UserPostsList from "../components/User/UserPostsList";
import SinglePost from "../components/Posts/SinglePost";
import io from "socket.io-client";


const Layout = ({user}) => {
    const socket = io.connect("http://localhost:3001")


    return (
        <div className={"global-right"}>
            <Routes>
                <Route path={"/"} element={<Home currentUser={user}/>}/>
                <Route path={"/chat/:uid"} element={<Chat socket={socket} user={user}/>}/>
                <Route path={"/login"} element={<Login user={user} socket={socket}/>}/>
                <Route path={"/register"} element={<Register user={user}/>}/>
                <Route path={"/user/:uid"} element={<User user={user}/>}>
                    <Route path={"edit-profile"} element={<UserEditProfile/>} index/>
                    <Route path={"publish-post"} element={<UserPost user={user}/>} exact/>
                    <Route path={"posts-list"} element={<UserPostsList/>} exact/>
                </Route>
                <Route path={"/post/:id"} element={<SinglePost user={user}/>}/>
            </Routes>
        </div>
    );
};

export default Layout;
