import { auth, firebaseApp, provider, db } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { SET_USER, SET_LOADING_STATUS, GET_POSTS } from './actionType';
import store from "../store";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, getFirestore, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status
})

export const getPosts = (payload) => ({
    type: GET_POSTS,
    payload: payload

})

export const signInAPI = async(dispatch) => {

    provider.setCustomParameters({prompt: 'select_account'});
    signInWithPopup(auth, provider)
        .then((payload) => {
            const credential = GoogleAuthProvider.credentialFromResult(payload);
            const token = credential.accessToken;

            // dispatch = tell the entire store that the user has logged in, like starter pistol in the sprint run
            dispatch(setUser(payload.user));

        })
        .catch((error) => alert(error.message));
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

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));

        const postsRef = doc(db, 'posts', 'Random');

        if (payload.image) {
            const storage = getStorage();

            const storageRef = ref(storage, `images/${payload.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, payload.image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log(downloadURL);

                    try {
                        const docRef = addDoc(collection(db, "posts"), {
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName,
                                date: payload.timestamp,
                                image: payload.user.photoURL,
                            },
                            video: '',
                            sharedImg: downloadURL,
                            comments: 0,
                            description: payload.description
                        });

                        dispatch(setLoading(false));
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }

                });

        } else if (payload.video) {
            try {
                const docRef = addDoc(collection(db, "posts"), {
                    actor: {
                        description: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: '',
                    },
                    video: payload.video,
                    sharedImg: '',
                    comments: 0,
                    description: payload.description
                });

                console.log("Document written with ID: ", docRef.id);

                dispatch(setLoading(false));


            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }

    }

}

export function getPostsAPI() {
    return async (dispatch) => {

        let payload;

        const q = query(
            collection(db, 'posts'),
            orderBy("actor.date", "desc"),
        );
        const querySnapshot = await getDocs(q);
        payload = querySnapshot.docs.map((doc) => doc.data());

        dispatch(getPosts(payload));
    }
}
