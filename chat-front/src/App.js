import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {auth} from "./firebase/firebase";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "./redux/actions/getCurrentUser";
import {AppContext} from "./context/appContext";


function App() {

    const user = useSelector(state=>state.currentUser)
    const dispatch = useDispatch()
    const [currentRoom, setCurrentRoom] = useState([])
    const [members, setMembers] = useState([])
    const [messages, setMessages] = useState([])
    const [privateMemberMsg, setPrivateMemberMsg] = useState({})
    const [newMessage, setNewMessage] = useState({})


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if (user){
                sessionStorage.setItem('current_user', JSON.stringify(user))
                dispatch(getCurrentUser())
            }else {
                sessionStorage.removeItem('current_user')
                dispatch(getCurrentUser())
            }
        })
    }, [dispatch])



    return (
        <AppContext.Provider value={{
            currentRoom,
            setCurrentRoom,
            members,
            setMembers,
            messages,
            setMessages,
            privateMemberMsg,
            setPrivateMemberMsg,
            newMessage,
            setNewMessage
        }}>
            <BrowserRouter>
                <div className="App">
                    <main>
                        <Header currentUser={user}/>
                        <div className="container">
                            <div className={"global-wrapper"}>
                                <div className={"global-left"}>
                                    <Sidebar currentUser={user && user}/>
                                </div>
                                <Layout user={user && user}/>
                            </div>
                        </div>
                    </main>
                </div>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
