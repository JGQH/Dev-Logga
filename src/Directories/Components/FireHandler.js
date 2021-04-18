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

export async function getPosts(lastPost) {
    //Get last posts
    let query = FireStore.collection(process.env.REACT_APP_POSTS_COLLECTION).orderBy("date", 'desc');
    if(lastPost) (query = query.startAt(lastPost));

    const posts =  await query.limit(20).get();
    return posts.docs.map(doc => {
        return doc.data();
    })
}

export async function getUserPosts(uid, lastPost) {
    let query = FireStore.collection(process.env.REACT_APP_POSTS_COLLECTION).where("uid", "==", uid).orderBy("date", 'desc');

    if(lastPost) (query = query.startAt(lastPost));

    const posts = await query.limit(20).get();

    return posts.docs.map(doc => {
        return doc.data();
    })
}