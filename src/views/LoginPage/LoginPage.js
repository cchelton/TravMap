import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Button, TextField, Typography } from "@material-ui/core";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_TextField_ERROR" });
    }
  }; // end login

  handleTextFieldChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.store.errors.loginMessage && (
          <Typography
            variant="h4"
            component="h2"
            className="alert"
            role="alert"
          >
            {this.props.store.errors.loginMessage}
          </Typography>
        )}
        <form className="formPanel" onSubmit={this.login}>
          <Typography variant="h3" component="h1">
            Login
          </Typography>
          <div>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleTextFieldChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleTextFieldChangeFor("password")}
            />
          </div>
          <div className="register-log-btn">
            <Button
              variant="contained"
              color="secondary"
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            >
              Log In
            </Button>
          </div>
        </form>
        <center>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
