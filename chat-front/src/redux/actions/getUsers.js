import {GET_USERS} from "../types";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";



export const getUsers = () => {
    return async function (dispatch) {
        const usersCol = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCol);
        const usersList = usersSnapshot.docs.map(doc => doc.data())
        dispatch(getUsersAction(usersList))
    }
}

const getUsersAction = (users) => {

    return {
        type: GET_USERS,
        payload: users
    }
}
