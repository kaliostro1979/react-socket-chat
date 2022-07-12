import React from "react";
import {store} from './redux/store/store'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./components/Chat/Chat";
import Main from "./components/Main/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    const socket = io.connect("http://localhost:3001")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")

    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <div className="container">
                        <div className={"chat-wrapper"}>
                            <Routes>
                                <Route path={"/"} element={<Main socket={socket} userName={userName} setUserName={setUserName} room={room}
                                                                   setRoom={setRoom}/>}/>
                                <Route path={"/chat"} element={<Chat room={room} socket={socket} userName={userName}/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
