import React from 'react';
import ChatCloud from "./ChatCloud";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatCloudWrapper = ({messageList, currentUser}) => {
    return (
        <div className={"body-wrapper"}>
            <ScrollToBottom scrollViewClassName={"scroll-body"} followButtonClassName={"scroll-button"}>
                <div className={"body"}>
                    {
                        messageList.length ? messageList.map((item, i) => {
                            return (
                                <ChatCloud
                                    author={item.author}
                                    message={item.text}
                                    name={currentUser && currentUser.displayName}
                                    date={item.date}
                                    itemAuthor={item.author}
                                    key={i}
                                />
                            )
                        }) : null
                    }
                </div>
            </ScrollToBottom>
        </div>
    );
};

export default ChatCloudWrapper;
