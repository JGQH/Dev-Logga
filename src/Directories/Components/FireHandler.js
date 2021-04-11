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

export async function getPosts(uid) {
    if(uid) {
        //Get posts from a specific profile
        const posts = await FireStore.collection(process.env.REACT_APP_POSTS_COLLECTION).where("username", "==", uid).orderBy("date", 'desc').limit(20).get();
        return posts.docs.map(doc => {
            return doc.data()
        })
    }

    //Get last posts
    const posts = await FireStore.collection(process.env.REACT_APP_POSTS_COLLECTION).orderBy("date", 'desc').limit(20).get();
    return posts.docs.map(doc => {
        return doc.data();
    })
}