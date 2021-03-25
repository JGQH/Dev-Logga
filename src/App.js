import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Directories/Home';
import Signer from './Directories/Signer';
import LandPage from './Directories/LandPage'
import Profile from './Directories/Profile';
import NotFound from './Directories/NotFound';
import SignOut from './Directories/SignOut';
import NavBar from './Directories/Components/Navbar';
import { AuthProvider, useAuth } from './Directories/Components/AuthHandler';

const RealApp = () => {
  const { user } = useAuth();
  return (
  <Router>
    {user ?
    <>
    {/* Require NavBar */}
      <NavBar />
      <Switch>
        <Route exact path="/">
          <LandPage />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </>
    :
    <Switch>
      {/* Do not require NavBar*/}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signer isSignUp={false} />
      </Route>
      <Route path="/signup">
        <Signer isSignUp={true} />
      </Route>
      <Route path="/">
        <NotFound />
      </Route>
    </Switch>}
  </Router>);
}

const App = () => <AuthProvider content={<RealApp />} />;

export default App;