import { auth, provider } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { SET_USER } from './actionType';
import store from "../store";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
})

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider).then((payload) => {
            console.log(payload);
            // dispatch = tell the entire store that the user has logged in, like starter pistol in the sprint run
            dispatch(setUser(payload.user));
            console.log(store.getState());
        })
         .catch((error) => alert(error.message));
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        })
    }

}

export function signOutAPI() {
    return (dispatch) => {
        signOut(auth).then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        });
    }
}