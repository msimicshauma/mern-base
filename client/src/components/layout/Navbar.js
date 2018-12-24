import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link to="/">
          <i className="material-icons">code</i>
          MERN SKELETON
        </Link>
      </nav>
    );
  }
}

export default Navbar;
