import React, { useState, useContext, useEffect} from 'react';
import { Auth, FireStore } from './FireBase'

const AuthContext = React.createContext();

export function useAuth() { return useContext(AuthContext) };

export function AuthProvider({content}) {
    const [user, setUser] = useState();
    const [isLoading, setLoading] = useState(true);

    function signUp(email, password) {
        return Auth.createUserWithEmailAndPassword(email, password);
    }

    function signIn(email, password) {
        return Auth.signInWithEmailAndPassword(email, password);
    }

    function signOut() {
        return Auth.signOut();
    }

    function createUser(uid) {
        return FireStore.collection(process.env.REACT_APP_USERS_COLLECTION).doc(uid).set({
            "username": `Dev-${uid}`,
            "description": `Hello world! I'm "Dev-${uid}", ready to start creating!`,
            "networking": {}
        });
    }

    useEffect(() => {
        const disconnect = Auth.onAuthStateChanged(newUser => {
            setUser(newUser);
            setLoading(false);
        });
        return disconnect;
    }, [])
    
    const value = {
        user, signUp, signIn, signOut, createUser
    }

    return (
    <AuthContext.Provider value={value}>
        {!isLoading && content}
    </AuthContext.Provider>);
}