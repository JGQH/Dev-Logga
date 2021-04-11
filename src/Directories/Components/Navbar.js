import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthHandler';
import { getUserData } from './FireHandler';
import miniLogo from '../../Resources/dev-loggar-mini-logo.png';

const NavBar = () => {
    const { user } = useAuth();
    const [ userName, setUserName ] = useState("Remembering dev...");
    const [ hidden, setHidden] = useState(true);

    useEffect(() => {
        const getName = async () => {
            try {
                const data = await getUserData(user.uid)
                setUserName(data.username + "!");
            } catch {
                setUserName("Dev!");
            }
        }
        getName();
    }, [user])
    
    return (
    <>
        <div className="dl-navbar">
            <div className="title-holder">
                <div className="logo">
                    <Link to="/" ><img src={miniLogo} alt="Dev-Loggar Mini Logo"/></Link>
                </div>
                <div className="username">
                    <h3>{userName}</h3>
                </div>
            </div>
            <div className="toggler-holder">
                <button onClick={() => setHidden(!hidden)}>三</button>
            </div>
            <div className={"options-holder " + (hidden ? "is-hidden": "non-hidden")}>
                <div className="option">
                    <Link to="/posts">Posts</Link>
                </div>
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