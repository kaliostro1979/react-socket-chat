import React from 'react';
import avatarPlaceholder from "../../assets/images/avatar-placeholder.png"


const UserCard = ({user}) => {

    return (
        <div className={user.loggedIn ? "user-card__wrapper current-user" : "user-card__wrapper"}>
            <div className={"user-avatar"}>
                <img src={user.photoURL ? user.photoURL : avatarPlaceholder} alt=""/>
            </div>
            <p className={"user-username"}>{user.displayName}</p>
        </div>
    );
};

export default UserCard;
