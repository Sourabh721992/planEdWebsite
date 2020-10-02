import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import $ from "jquery";

class VerticalNavbar extends Component {
  constructor() {
    super();
    this.onLogoutUser = this.onLogoutUser.bind(this);
    this.state = {
      deviceWidth: -1,
    };
  }

  componentDidMount() {
    //Get device width
    this.setState({ deviceWidth: this.props.deviceWidth });
  }

  onLogoutUser(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  renderLinksBasedOnRoles(role) {
    switch (role) {
      case "T":
        if (this.props.deviceWidth > 600) {
          return (
            <ul className="navbar-nav hidden-xs">
              <li className="nav-item">
                <i className="fas fa-home"></i>
                <Link className="nav-link" to="/teacher">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-chalkboard-teacher"></i>
                <Link className="nav-link" to="/livesession">
                  Live Session
                </Link>
              </li>
              <li className="nav-item">
                <i className="far fa-calendar-alt"></i>
                <Link className="nav-link" to="/session">
                  Schedule Session
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-book"></i>
                <Link className="nav-link" to="/content">
                  Study Material
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-sticky-note"></i>
                <Link className="nav-link" to="/message">
                  Send Message
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-comment-dots"></i>
                <Link
                  className="nav-link"
                  onClick={() =>
                    window.open("https://planed.in/chat/home", "_blank")
                  }
                >
                  planEd Chat
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-sign-out-alt"></i>
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  Logout
                </Link>
              </li>
            </ul>
          );
        } else {
          return (
            <ul className="navbar-nav hidden-xs">
              <li className="nav-item">
                <Link className="nav-link" to="/teacher">
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livesession">
                  <i className="fas fa-chalkboard-teacher"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/session">
                  <i className="far fa-calendar-alt"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/content">
                  <i className="fas fa-book"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/message">
                  <i className="fas fa-sticky-note"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() =>
                    window.open("https://planed.in/chat/home", "_blank")
                  }
                >
                  <i className="fas fa-comment-dots"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </li>
            </ul>
          );
        }
        break;
      case "S":
        if (this.props.deviceWidth > 600) {
          return (
            <ul className="navbar-nav hidden-xs">
              <li className="nav-item">
                <i className="fas fa-home"></i>
                <Link className="nav-link" to="/student">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-chalkboard-teacher"></i>
                <Link className="nav-link" to="/livesession">
                  Live Session
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-book"></i>
                <Link className="nav-link" to="/content">
                  Study Material
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-sticky-note"></i>
                <Link className="nav-link" to="/message">
                  Notice Board
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-comment-dots"></i>
                <Link
                  className="nav-link"
                  onClick={() =>
                    window.open("https://planed.in/chat/home", "_blank")
                  }
                >
                  planEd Chat
                </Link>
              </li>

              <li className="nav-item">
                <i className="fas fa-sign-out-alt"></i>
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  Logout
                </Link>
              </li>
            </ul>
          );
        } else {
          return (
            <ul className="navbar-nav hidden-xs">
              <li className="nav-item">
                <Link className="nav-link" to="/student">
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livesession">
                  <i className="fas fa-chalkboard-teacher"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/content">
                  <i className="fas fa-book"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/message">
                  <i className="fas fa-sticky-note"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() =>
                    window.open("https://planed.in/chat/home", "_blank")
                  }
                >
                  <i className="fas fa-comment-dots"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </li>
            </ul>
          );
        }
        break;
      case "A":
        if (this.props.deviceWidth > 600) {
          return (
            <ul className="navbar-nav hidden-xs">
              {/* <li className="nav-item">
                <i className="fas fa-home"></i>
                <Link className="nav-link" to="/student">
                  Home
                </Link>
              </li> */}
              <li className="nav-item">
                <i className="fas fa-school"></i>
                <Link className="nav-link" to="/batch">
                  Batch Manager
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-user"></i>
                <Link className="nav-link" to="/manageinstructor">
                  Instructor Manager
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-rupee-sign"></i>
                <Link className="nav-link" to="/fee">
                  Feebot
                </Link>
              </li>
              <li className="nav-item">
                <i className="fas fa-sign-out-alt"></i>
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  Logout
                </Link>
              </li>
            </ul>
          );
        } else {
          return (
            <ul className="navbar-nav hidden-xs">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/student">
                  <i className="fas fa-home"></i>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/batch">
                  <i className="fas fa-school"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manageteacher">
                  <i className="fas fa-user"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fee">
                  <i className="fas fa-rupee-sign"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={this.onLogoutUser}>
                  <i className="fas fa-sign-out-alt"></i>
                </Link>
              </li>
            </ul>
          );
        }
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div id="verticalnavbar">
        <nav className="navbar navbar-light bg-light" style={{ padding: 0 }}>
          {this.renderLinksBasedOnRoles(user.role)}
        </nav>
      </div>
    );
  }
}

VerticalNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(VerticalNavbar);
