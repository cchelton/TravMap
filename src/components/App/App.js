import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import { makeStyles } from "@material-ui/core";

import LoginPage from "../../views/LoginPage/LoginPage";
import RegisterPage from "../../views/LoginPage/LoginPage";
import UserHomePage from "../../views/UserHomePage/UserHomePage";
import UserProfilePage from "../../views/UserProfilePage/UserProfilePage";
import ModeratorPage from "../../views/ModeratorPage/ModeratorPage";
import Err404Page from "../../views/Err404Page/Err404Page";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const useStyles = makeStyles((theme) => ({
  appBodyContainer: {
    display: "block",
    width: "100%",
  },
}));

function App(props) {
  useEffect(() => {
    props.dispatch({ type: "FETCH_USER" });
  });

  const classes = useStyles();
  return (
    <Router>
      <Header />
      <div className={classes.appBodyContainer}>
        <Switch>
          {/* Get those users to a login screen */}
          <Redirect exact from="/" to="/login" />
          {/* Protected routes are locked. If a user is not authenticated, they'll see login. */}
          <ProtectedRoute exact path="/home" component={UserHomePage} />
          <ProtectedRoute
            exact
            path="/user/:userID"
            component={UserProfilePage}
          />
          <ProtectedRoute exact path="/moderation" component={ModeratorPage} />
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
      <Footer />
    </Router>
  );
}

export default connect()(App);
