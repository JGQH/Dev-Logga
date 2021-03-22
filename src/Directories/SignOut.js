import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './Components/AuthHandler';

const SignOut = () => {
    const { signOut } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const doLogout = async () => {
            try {
                await signOut();
                history.push("/");
            } catch {
                alert("Failed to sign out!");
            }
        }
        doLogout();
    }, [history, signOut]);

    return (<></>);   
}

export default SignOut;