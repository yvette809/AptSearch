import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navigation from './pages/Navigation'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Houses from './pages/houses/Houses'
import HouseDetails from './components/HouseDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import AddHouse from './components/AddHouse'
import NotFound from './pages/NotFound'


function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact ><Home /></Route>
        <Route path="/about-us" ><AboutUs /></Route>
        <Route path="/register"><Register /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/houses/:_id"><HouseDetails /></Route>
        <Route path="/houses"><Houses /></Route>
        <Route path="/create-house"><AddHouse /></Route>
        <Route path="*" ><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
