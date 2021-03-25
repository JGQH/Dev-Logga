import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthHandler';
import { getUserData } from './FireHandler';
import miniLogo from '../../Resources/dev-loggar-mini-logo.png';

const NavBar = () => {
    const { user } = useAuth();
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
    
    return (
    <>
        <div className="dl-navbar">
            <div className="logo-holder">
                <Link to="/" ><img src={miniLogo} alt="Dev-Loggar Mini Logo"/></Link>
            </div>
            <div className="name-holder">
                <h3>User: {userName}</h3>
            </div>
            <div className="options-holder">
                <div className="option">
                    <Link to={`/profile/${user.uid}`}>Profile</Link>
                </div>
                <div className="option">
                    <Link to="/signout">Sign Out</Link>
                </div>
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