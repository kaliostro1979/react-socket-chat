import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import {auth} from "./firebase/firebase";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./Layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "./redux/actions/getCurrentUser";


function App() {

    const user = useSelector(state=>state.currentUser)
    const dispatch = useDispatch()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if (user){
                dispatch(getCurrentUser(user.uid))
            }
        })
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className="App">
                <main>
                    <Header currentUser={Object.keys(user).length && user}/>
                    <div className="container">
                        <div className={"global-wrapper"}>
                            <div className={"global-left"}>
                                <Sidebar currentUser={Object.keys(user).length && user}/>
                            </div>
                            <Layout currentUser={Object.keys(user).length && user}/>
                        </div>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
