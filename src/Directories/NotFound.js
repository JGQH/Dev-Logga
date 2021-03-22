import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
    <>
        <h1>Directorie not found, <Link to="/">click here</Link> to return to home.</h1>
    </>
    );
}

export default NotFound;