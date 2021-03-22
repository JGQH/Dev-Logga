import { FireStore } from './FireBase';

export async function getUserData(uid) {
    const userData = await FireStore.collection(process.env.REACT_APP_USERS_COLLECTION).doc(uid).get();
    return userData.data();
}

export function createUserData(uid) {
    return FireStore.collection(process.env.REACT_APP_USERS_COLLECTION).doc(uid).set({
        "username": `Dev-${uid}`,
        "description": `Hello world! I'm "Dev-${uid}", ready to start creating!`,
        "networking": {},
        "following": []
    });
}