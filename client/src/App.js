import React from "react";
import Login from "./pages/Login";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Sign-up";
import WeatherService from "./pages/WeatherService";
import ExchangeService from "./pages/ExchangeService";
import SteamService from "./pages/SteamService";
import SteamSettings from "./pages/SteamSettings";
import WeatherSettings from "./pages/weatherSettings";
import ExchangeSettings from "./pages/ExchangeSettings";
import CovidService from "./pages/CovidService";
import CovidSettings from "./pages/CovidSettings";
import RedditService from "./pages/RedditService";
import RedditSettings from "./pages/RedditSettings";
import PornhubService from "./pages/PornhubService";
import PornhubSettings from "./pages/PornhubSettings";

const history = createBrowserHistory();

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/weatherServices" component={WeatherService} />
        <Route path="/weatherSettings/:id" component={WeatherSettings} />
        <Route exact path="/covidServices" component={CovidService} />
        <Route path="/covidSettings/:id" component={CovidSettings} />
        <Route exact path="/exchangeServices" component={ExchangeService} />
        <Route path="/exchangeSettings/:id" component={ExchangeSettings} />
        <Route exact path="/redditServices" component={RedditService} />
        <Route path="/redditSettings/:id" component={RedditSettings} />
        <Route exact path="/pornhubServices" component={PornhubService} />
        <Route path="/pornhubSettings/:id" component={PornhubSettings} />
        <Route exact path="/steamServices" component={SteamService} />
        <Route exact path="/steamSettings" component={SteamSettings} />
      </Router>
    );
  }
}

export default App;
