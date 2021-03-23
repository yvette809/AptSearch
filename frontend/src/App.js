import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Houses from './pages/Houses'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'


function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact ><Home /></Route>
        <Route path="/about-us" ><AboutUs /></Route>
        <Route path="/houses" ><Houses /></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="*" exact ><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
