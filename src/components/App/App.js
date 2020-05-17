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
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core";

import LoginPage from "../../views/LoginPage/LoginPage";
import RegisterPage from "../../views/LoginPage/LoginPage";
import UserHomePage from "../../views/UserHomePage/UserHomePage";
import UserProfilePage from "../../views/UserProfilePage/UserProfilePage";
import ModeratorPage from "../../views/ModeratorPage/ModeratorPage";
import Err404Page from "../../views/Err404Page/Err404Page";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#274659" },
    secondary: { main: "#F2B807" },
  },
  typography: {
    fontFamily: "Playfair+Display, 'Segoe UI', Helvetica, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  appBodyContainer: {
    display: "block",
    width: "100%",
    height: "100%",
    paddingBottom: 34, // padded by bottom footer height to prevent covering. Probably going to remove the whole footer in future and put friends up top.
  },
}));

function App(props) {
  useEffect(() => {
    props.dispatch({ type: "FETCH_USER" });
  });

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
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
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default connect()(App);
