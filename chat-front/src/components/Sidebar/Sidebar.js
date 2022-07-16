import React from 'react';
import UserCard from "../UserCard/UserCard";

const Sidebar = ({users, currentUser}) => {
    return (
        <>
            {
                users.length ? users.map((user) => {
                    return <UserCard user={user} key={user && user.uid} currentUser={currentUser}/>
                }) : null
            }
        </>
    );
};

export default Sidebar;
