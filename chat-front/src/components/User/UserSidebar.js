import React from 'react';
import {NavLink} from "react-router-dom";

const UserSidebar = ({user}) => {


    return (
        <div className={"user-sidebar"}>
            <ul>
                <li><NavLink to={`${user && user.uid}/edit-profile`} className={(navData) => (navData.isActive ? 'active' : '')}>Edit profile</NavLink></li>
                <li><NavLink to={`${user && user.uid}/publish-post`} className={(navData) => (navData.isActive ? 'active' : '')}>Publish Post</NavLink></li>
            </ul>
        </div>
    );
};

export default UserSidebar;
