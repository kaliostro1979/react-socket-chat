import React from 'react';
import Title from "../UI/Title";

const ChatHeader = ({currentUser}) => {
    return (
        <div className={"header"}>
            <Title title={`Logged in as ${currentUser && currentUser.displayName}`} className={'chat__title'}/>
        </div>
    );
};

export default ChatHeader;
