import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { TextField, Button } from "@material-ui/core";

class RegisterPage extends Component {
  state = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          date_of_birth: this.state.date_of_birth,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form className="formPanel" onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <TextField
              label="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
            />
          </div>
          <div>
            <TextField
              label="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            />
          </div>
          <div>
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange={this.handleInputChangeFor("first_name")}
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChangeFor("last_name")}
            />
          </div>
          <div>
            <TextField
              label="Date of Birth"
              type="text"
              name="date_of_birth"
              value={this.state.date_of_birth}
              onChange={this.handleInputChangeFor("date_of_birth")}
            />
          </div>

          <div>
            <Button
              variant="outlined"
              color="primary"
              className="register"
              type="submit"
              name="submit"
              value="Register"
            >
              Register
            </Button>
          </div>
        </form>
        <center>
          <Button
            variant="outlined"
            color="link"
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </Button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
