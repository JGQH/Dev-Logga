import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Directories/Home';
import Signer from './Directories/Signer';
import LandPage from './Directories/LandPage'
import { AuthProvider, useAuth } from './Directories/Components/AuthHandler';

const RealApp = () => {
  const { user } = useAuth();
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        {user ?
        <LandPage />
        :
        <Home />}
      </Route>
      <Route path="/signin">
        <Signer isSignUp={false} />
      </Route>
      <Route path="/signup">
        <Signer isSignUp={true} />
      </Route>
    </Switch>
  </Router>);
}

const App = () => <AuthProvider content={<RealApp />} />;

export default App;