import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthHandler';
import { getUserData } from './FireHandler';
import miniLogo from '../../Resources/dev-loggar-mini-logo.png';

const NavBar = () => {
    const { user, signOut } = useAuth();
    const [ userName, setUserName ] = useState("dev...");

    useEffect(() => {
        const getName = async () => {
            try {
                const data = await getUserData(user.uid)
                setUserName(data.username + "!");
            } catch {
                setUserName("dev!");
            }
        }
        getName();
    }, [user])
    

    async function handleSignOut() {
        try {
            await signOut();
        } catch {
            alert("Failed to Sign Out");
        }
    }
    return (
    <>
        <div className="dl-navbar">
            <div className="logo-holder">
                <img src={miniLogo} alt="Dev-Loggar Mini Logo"/>
                <span>Dev-Loggar</span>
            </div>
            <div className="name-holder">
                <h3>Welcome, {userName}</h3>
            </div>
            <div className="options-holder">
                <p>Email: {user.email}</p>
                <Link to={`/profile/${user.uid}`}><button>Profile</button></Link>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        {!user.emailVerified && (
        <div className="dl-verification">
            <p>Your email has not been verified. Verification is required to continue in the website.</p>
            <p>If your account has been verified, try refreshing the page.</p>
        </div>)}
    </>);
}

export default NavBar;