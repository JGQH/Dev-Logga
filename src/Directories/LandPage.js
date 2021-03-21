import { useAuth } from './Components/AuthHandler';
import miniLogo from '../Resources/dev-loggar-mini-logo.png';

const LandPage = () => {
    const { user, signOut } = useAuth();
    async function handleSignOut() {
        try {
            await signOut();
        } catch {
            alert("Failed to Sign Out");
        }
    }
    return (
    <>
        <div className="navbar">
            <div className="logo-holder">
                <img src={miniLogo} alt="Dev-Loggar Mini Logo"/>
                <span>Dev-Loggar</span>
            </div>
            <div className="options-holder">
                <p>Email: {user.email}</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    </>);
}

export default LandPage;