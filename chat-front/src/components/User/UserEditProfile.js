import React from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";

const UserEditProfile = () => {
    return (
        <div className={"user-edit-profile user-content"}>
            <h2 className={"user-content__title"}>Edit profile</h2>
            <form>
                <Input name={"old_password"} type={"password"} placeholder={"Old password"}/>
                <Input name={"new_password"} type={"password"} placeholder={"New password"}/>
                <Input name={"rpt-new_password"} type={"password"} placeholder={"Repeat password"}/>
                <Button type={"submit"} text={"Save changes"} className={"button-primary"}/>
            </form>
        </div>
    );
};

export default UserEditProfile;
