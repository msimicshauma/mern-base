import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push("/dashboard");

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  inputChange = e => this.setState({ [e.target.id]: e.target.value });

  submitUser = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    let { errors } = this.state;

    return (
      <div className="form-container">
        <Link to="/">
          <i className="material-icons left">keyboard_backspace</i>
          Back to home
        </Link>
        <form noValidate onSubmit={this.submitUser}>
          <input
            onChange={this.inputChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
          />
          <label htmlFor="email">E-mail</label>
          <span className="error-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
          <input
            onChange={this.inputChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
          />
          <label htmlFor="password">Password</label>
          <span className="error-text">
            {errors.password}
            {errors.passwordincorrect}
          </span>
          <button className="button-sign-log">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
