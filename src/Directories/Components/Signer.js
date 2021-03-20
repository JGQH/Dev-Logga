import logo from '../../Resources/dev-loggar-logo.png';
import { Link } from 'react-router-dom';

const Signer = ({buttonText, redirectText}) => {
    return (
    <div className="signer">
        <Link to="/"><img src={logo} alt="Dev-Loggar Logo" /></Link>
        <form className="form">
            <fieldset>
                <legend>Email</legend>
                <input type="email" placeholder="example@gmail.com" required/>
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <input type="password" placeholder="$12345" required></input>
            </fieldset>
            <fieldset>
                <legend>Confirm Password</legend>
                <input type="password" placeholder="$12345" required></input>
            </fieldset>
            <button onClick={evt => evt.preventDefault()}>{buttonText}</button>
            <div className="redirecter">
                {redirectText}
            </div>
        </form>
    </div>);
}

export default Signer;