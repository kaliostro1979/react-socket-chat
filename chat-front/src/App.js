import {store} from './redux/store/store'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import {useState} from "react";
import Chat from "./components/Chat/Chat";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import Title from "./components/UI/Title";


function App() {
    const socket = io.connect("http://localhost:3001")
    const [userName, setUserName] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if (userName !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true)
        }
    }

    return (
        <Provider store={store}>
            <div className="App">
                <div className="container">
                    <div className={"chat-wrapper"}>
                        {
                            showChat ? <Chat room={room} socket={socket} userName={userName}/> :
                                <div className={'chat-auth'}>
                                    <Title title={"Join A Chat"} className={'chat__title'}/>
                                    <Input value={userName} onChange={setUserName} callBack={null} type={"text"} name={"user_name"} id={"chat-message"}/>
                                    <Input value={room} onChange={setRoom} callBack={null} type={"text"} name={"room"} id={"chat-room"}/>
                                    <Button className={"button-primary"} text={"Join"} callBack={joinRoom}/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Provider>
    );
}

export default App;
