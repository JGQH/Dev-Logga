import logo from '../Resources/dev-loggar-logo.png';
import banner from '../Resources/dev-loggar-banner.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="homepage">
        <div className="header" style={{backgroundImage:`url(${banner})`}}>
            <img src={logo} alt="Dev-Loggar Logo" />
            <h1>Dev-Loggar</h1>
        </div>
        <div className="navbar">
            <div className="nav-space">
                The place to come and develop together!
            </div>
            <Link to="/signin">
                <div className="nav-space">
                    Sign In
                </div>
            </Link>
            <Link to="/signup">
                <div className="nav-space">
                    Sign Up
                </div>
            </Link>
        </div>
    </div>);
}

export default Home;