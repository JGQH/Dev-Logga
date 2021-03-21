import React, { useState, useContext, useEffect} from 'react';
import { Auth } from './FireBase'

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

    function sendEmailVerification(newUser){
        newUser.sendEmailVerification()
                .then(ff => alert(`Email verification sent to '${newUser.email}'`))
                .catch(uf => alert(`Failed to send email verification to '${newUser.email}'`));
    }

    useEffect(() => {
        const disconnect = Auth.onAuthStateChanged(newUser => {
            newUser &&  (!newUser.emailVerified &&  sendEmailVerification(newUser));
            setUser(newUser);
            setLoading(false);
        });
        return disconnect;
    }, [])
    
    const value = {
        user, signUp, signIn, signOut
    }

    return (
    <AuthContext.Provider value={value}>
        {!isLoading && content}
    </AuthContext.Provider>);
}