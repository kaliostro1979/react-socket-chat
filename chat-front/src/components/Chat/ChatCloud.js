import React from 'react';

const ChatCloud = ({name, message, author, date, itemAuthor}) => {

    return (
        <div className={name === itemAuthor ? "you" : "other"}>
            <div className={"message-text"}>
                <p className={"author-meta__text"}>{message}</p>
            </div>
            <div className={"author-meta"}>
                <p className={"author-meta__name"}>{author}</p>
                <p className={"author-meta__date"}>{date}</p>
            </div>
        </div>
    );
};

export default ChatCloud;
