import Signer from './Components/Signer';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const redirect = (<>Don't have an account yet? <Link to="/signup">Sign Up!</Link></>);
    return <Signer
            buttonText="Sign In"
            redirectText={redirect}/>;
}

export default SignIn;