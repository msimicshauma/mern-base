import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  inputChange = e => this.setState({ [e.target.id]: e.target.value });

  submitUser = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
            value={this.state.name}
            error={errors.name}
            id="name"
            type="text"
          />
          <label htmlFor="name">Name</label>
          <span className="error-text">{errors.name}</span>
          <input
            onChange={this.inputChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
          />
          <label htmlFor="email">E-mail</label>
          <span className="error-text">{errors.email}</span>
          <input
            onChange={this.inputChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
          />
          <label htmlFor="password">Password</label>
          <span className="error-text">{errors.password}</span>
          <input
            onChange={this.inputChange}
            value={this.state.password2}
            error={errors.password2}
            id="password2"
            type="password"
          />
          <label htmlFor="password2">Confirm password</label>
          <span className="error-text">{errors.password2}</span>
          <button className="button-sign-log">Sign up</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
