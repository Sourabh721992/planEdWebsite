import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validations/isEmpty";
import $ from "jquery";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      aboutLinkColor: "#FFFFFF",
      contactLinkColor: "#FFFFFF",
      url: "",
    };
    this.onAboutLinkClicked = this.onAboutLinkClicked.bind(this);
    this.onContactLinkClicked = this.onContactLinkClicked.bind(this);
    this.onplanEdLinkClicked = this.onplanEdLinkClicked.bind(this);
  }

  componentDidMount() {
    this.setState({ url: window.location.pathname });
  }
  //Redirection to home page will be based on the roles
  renderLinkBasedOnRoles(role) {
    switch (role) {
      case "T":
        return (
          <Link
            className="navbar-brand"
            to="/teacher"
            onClick={this.onplanEdLinkClicked}
          >
            <img
              src={require("../../images/planEdLogo.jpeg")}
              alt="planEd"
              id="planEdLogo"
            ></img>
          </Link>
        );
        break;
      case "S":
        return (
          <Link
            className="navbar-brand"
            to="/student"
            onClick={this.onplanEdLinkClicked}
          >
            <img
              src={require("../../images/planEdLogo.jpeg")}
              alt="planEd"
              id="planEdLogo"
            ></img>
          </Link>
        );
        break;
      case "A":
        return (
          <Link
            className="navbar-brand"
            to="/batch"
            onClick={this.onplanEdLinkClicked}
          >
            <img
              src={require("../../images/planEdLogo.jpeg")}
              alt="planEd"
              id="planEdLogo"
            ></img>
          </Link>
        );
        break;
      case "About":
        return (
          <Link className="navbar-brand" onClick={this.onplanEdLinkClicked}>
            <img
              src={require("../../images/planEdLogo.jpeg")}
              alt="planEd"
              id="planEdLogo"
            ></img>
          </Link>
        );
    }
  }

  onAboutLinkClicked = (e) => {
    this.setState({ aboutLinkColor: "#11c5d9" });
    this.setState({ contactLinkColor: "#FFFFFF" });
  };

  onContactLinkClicked = (e) => {
    this.setState({ contactLinkColor: "#11c5d9" });
    this.setState({ aboutLinkColor: "#FFFFFF" });
  };

  onplanEdLinkClicked = (e) => {
    if (this.state.url == "/") {
      $("html,body").animate(
        {
          scrollTop: $("#website").offset().top,
        },
        "slow"
      );
    }
    this.setState({ contactLinkColor: "#FFFFFF" });
    this.setState({ aboutLinkColor: "#FFFFFF" });
  };

  GoToServices = (e) => {
    $("html,body").animate(
      {
        scrollTop: $("#divServiceStart").offset().top,
      },
      "slow"
    );
  };

  GoToContactSection = (e) => {
    $("html,body").animate(
      {
        scrollTop: $("#divConatctStart").offset().top,
      },
      "slow"
    );
  };

  GoToAppSection = (e) => {
    $("html,body").animate(
      {
        scrollTop: $("#divAppStart").offset().top,
      },
      "slow"
    );
  };

  render() {
    const { user } = this.props.auth;
    const { url } = this.state;
    const normalLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <Link
              className="nav-link"
              to="/about"
              style={{ color: this.state.aboutLinkColor }}
              onClick={this.onAboutLinkClicked}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/help"
              style={{ color: this.state.contactLinkColor }}
              onClick={this.onContactLinkClicked}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    );
    const websiteLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <Link
              className="nav-link"
              // to=""
              onClick={this.GoToServices}
            >
              Services
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" onClick={this.GoToAppSection}>
              Why Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={this.GoToContactSection}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    );
    return (
      <div style={{}}>
        <nav
          className={
            url == "/"
              ? "navbar navbar-expand-sm navbar-dark bg-dark mb-4 fixed-top"
              : "navbar navbar-expand-sm navbar-dark bg-dark mb-4 "
          }
        >
          {!isEmpty(user)
            ? this.renderLinkBasedOnRoles(user.role)
            : this.renderLinkBasedOnRoles("About")}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {url == "/" ? websiteLinks : normalLinks}
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Navbar);
