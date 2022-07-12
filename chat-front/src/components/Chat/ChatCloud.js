import React from 'react';

const ChatCloud = ({name, message, author, date, itemAuthor}) => {

    return (
        <div className={name === itemAuthor ? "cloud-wrapper you" : "cloud-wrapper other"}>
            <div className={"cloud-item"}>
                <div className={"cloud-item__content"}>
                    <div className={"message-text"}>
                        <p className={"author-meta__text"}>{message}</p>
                    </div>
                </div>
                <div className={"author-meta"}>
                    <p className={"author-meta__name"}>{author}</p>
                    <p className={"author-meta__date"}>{date}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatCloud;
