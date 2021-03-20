import Signer from './Components/Signer';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const redirect = (<>Already have an account? <Link to="/signin">Sign In!</Link></>);
    return <Signer
            buttonText="Sign Up"
            redirectText={redirect}
            isSignUp={true} />;
}

export default SignUp;