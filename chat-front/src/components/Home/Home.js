import React from 'react';
import {auth} from "../../firebase/firebase"
import { getUsers } from "firebase/auth";

const Home = () => {

    auth.getUsers()
        .then((getUsersResult) => {
            console.log('Successfully fetched user data:');
            getUsersResult.users.forEach((userRecord) => {
                console.log(userRecord);
            });

            console.log('Unable to find users corresponding to these identifiers:');
            getUsersResult.notFound.forEach((userIdentifier) => {
                console.log(userIdentifier);
            });
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;
