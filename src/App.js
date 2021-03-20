import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Directories/Home';
import SignIn from './Directories/SignIn';
import SignUp from './Directories/SignUp';
import { AuthProvider } from './Directories/Components/AuthHandler';

const RealApp = () => {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  </Router>);
}

const App = () => <AuthProvider content={<RealApp />} />;

export default App;