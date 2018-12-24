import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing-page-wrapper">
        <h1>Welcome to MERN skeleton</h1>
        <p>
          Click on <strong>login</strong> if you have an account
        </p>
        <p>
          Click on <strong>register</strong> to create a new account
        </p>
        <div className="buttons-wrapper">
          <Link className="button register" to="/register">
            REGISTER
          </Link>
          <Link className="button login" to="/login">
            SIGN IN
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
