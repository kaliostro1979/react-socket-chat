import React from 'react';
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";


const User = ({user}) => {
    return  (
        <div className={"user-main"}>
            <UserSidebar user={user}/>
            <UserContent user={user}/>
        </div>
    )
};

export default User;
