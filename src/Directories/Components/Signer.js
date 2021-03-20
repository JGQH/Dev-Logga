import logo from '../../Resources/dev-loggar-logo.png';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthHandler'

const Signer = ({buttonText, redirectText, isSignUp}) => {
    const { signIn, signUp } = useAuth();
    const [emailRef, passwordRef, confirmationRef] = [useRef(), useRef(), useRef()];
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    async function handleSubmit(evt) {
        evt.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(isSignUp) {
            const confirmation = confirmationRef.current.value;

            if(password === confirmation) {
                try {
                    setErrorMsg(null);
                    setLoading(true);
                    await signUp(email, password);
                    setLoading(false);
                } catch {
                    setErrorMsg("Failed to create account");
                }
                return;
            } else {
                setErrorMsg("Passwords do not match")
            }
        }else {
            try {
                setErrorMsg(null);
                setLoading(true);
                await signIn(email, password);
                setLoading(false);
            } catch {
                setErrorMsg("Failed to login");
            }
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
            {errorMsg && <>{errorMsg}</>}
            <button type="submit" disabled={isLoading}>{buttonText}</button>
            <div className="redirecter">
                {redirectText}
            </div>
        </form>
    </div>);
}

export default Signer;