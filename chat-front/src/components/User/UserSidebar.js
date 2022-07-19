import React from 'react';
import {NavLink} from "react-router-dom";

const UserSidebar = ({user}) => {


    return (
        <div className={"user-sidebar"}>
            <ul>
                <li><NavLink to={`edit-profile`} className={(navData) => (navData.isActive ? 'active' : '')}>Edit profile</NavLink></li>
                <li><NavLink to={`publish-post`} className={(navData) => (navData.isActive ? 'active' : '')}>Publish Post</NavLink></li>
                <li><NavLink to={`posts-list`} className={(navData) => (navData.isActive ? 'active' : '')}>My posts</NavLink></li>
            </ul>
        </div>
    );
};

export default UserSidebar;
