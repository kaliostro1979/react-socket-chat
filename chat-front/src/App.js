import React, {useEffect} from "react";
import {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {auth} from "./firebase/firebase";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./Layout/Layout";


function App() {

    const [currentUser, setCurrentUser] = useState(null)


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setCurrentUser(user)
        })
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <main>
                    <Header currentUser={currentUser && currentUser}/>
                    <div className="container">
                        <div className={"global-wrapper"}>
                            <div className={"global-left"}>
                                <Sidebar currentUser={currentUser}/>
                            </div>
                            <Layout currentUser={currentUser}/>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
