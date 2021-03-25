import logo from '../Resources/dev-loggar-logo.png';
import { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './Components/AuthHandler';
import { createUserData } from './Components/FireHandler';

const Signer = ({isSignUp}) => {
    const { signIn, signUp } = useAuth();
    const [emailRef, passwordRef, confirmationRef] = [useRef(), useRef(), useRef()];
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const history = useHistory();

    async function attemptSubmit(email, password, error){
        try {
            setErrorMsg(null);
            setLoading(true);
            if(isSignUp) {
                const cred = await signUp(email, password);
                await createUserData(cred.user.uid);
                await cred.user.sendEmailVerification();
                alert("Check email for account verification!");
            } else {
                await signIn(email, password);
            }
            history.push("/");
        } catch {
            setLoading(false);
            setErrorMsg(error);
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(isSignUp) {
            const confirmation = confirmationRef.current.value;

            if(password === confirmation) {
                await attemptSubmit(email, password, "Failed to create account");
                return;
            } else {
                setErrorMsg("Passwords do not match")
            }
        }else {
            await attemptSubmit(email, password, "Failed to login");
        }
    }

    return (
    <div className="signer">
        <Link to="/"><img src={logo} alt="Dev-Loggar Logo" /></Link>
        <form className="form" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Email</legend>
                <input ref={emailRef} type="email" placeholder="example@gmail.com" required/>
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <input ref={passwordRef} type="password" placeholder="$12345" required></input>
            </fieldset>
            {isSignUp && <fieldset>
                <legend>Confirm Password</legend>
                <input ref={confirmationRef} type="password" placeholder="$12345" required></input>
            </fieldset>}
            {errorMsg && <div className="error">{errorMsg} </div>}
            <button type="submit" disabled={isLoading}>{isSignUp ? "Sign Up" : "Sign In"}</button>
            <div className="redirecter">
                {isSignUp ?
                <>Already have an account? <Link to="/signin">Sign In!</Link></>
                :
                <>Don't have an account yet? <Link to="/signup">Sign Up!</Link></>}
            </div>
        </form>
    </div>);
}

export default Signer;