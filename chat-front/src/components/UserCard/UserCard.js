import React from 'react';

const UserCard = ({user, currentUser}) => {

    return (
        <div className={"user-card__wrapper"}>
            <p>{user.displayName}</p>
        </div>
    );
};

export default UserCard;