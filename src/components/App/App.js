import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LoginPage from "../../views/LoginPage/LoginPage";
import RegisterPage from "../../views/LoginPage/LoginPage";
import UserHomePage from "../../views/UserHomePage/UserHomePage";
import UserProfilePage from "../../views/UserProfilePage/UserProfilePage";
import ModeratorPage from "../../views/ModeratorPage/ModeratorPage";
import Err404Page from "../../views/Err404Page/Err404Page";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            {/* <Route exact path="/home" component={LandingPage} /> */}
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            {/* <ProtectedRoute exact path="/admin" component={UserPage} /> */}
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            {/* <ProtectedRoute exact path="/info" component={InfoPage} /> */}
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute exact path="/home" component={UserHomePage} />
            <ProtectedRoute
              exact
              path="/user/:userID"
              component={UserProfilePage}
            />
            <ProtectedRoute
              exact
              path="/moderation"
              component={ModeratorPage}
            />
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/home"
              component={LoginPage}
            />
            <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/home"
              component={RegisterPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route component={Err404Page} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
