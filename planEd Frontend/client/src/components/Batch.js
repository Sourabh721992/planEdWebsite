import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import store from "../store";
import VerticalNavbar from "./layout/VerticalNavbar";
import { GET_SUCCESS_MSG, GET_ERRORS } from "../actions/types";

class Batch extends Component {
  constructor() {
    super();
    this.state = {
      deviceWidth: -1,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated == false) {
      let loginUrl = props.loginUrl.url.toString();
      if (loginUrl.indexOf("login") > -1) {
        props.history.push(loginUrl);
      } else {
        props.history.push("/default");
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      let loginUrl = this.props.loginUrl.url.toString();
      if (loginUrl.indexOf("login") > -1) {
        this.props.history.push(loginUrl);
      } else {
        this.props.history.push("/default");
      }
    } else {
      //Mobile Screen rotation code
      let mql = window.matchMedia("(orientation: portrait)");
      // If there are matches, we're in portrait
      if (mql.matches) {
        // Portrait orientation
        this.setState({ deviceWidth: $(window).width() });
      } else {
        // Landscape orientation
        this.setState({ deviceWidth: $(window).width() });
      }

      // Add a media query change listener
      mql.addListener(
        function (m) {
          if (m.matches) {
            // Changed to portrait
            this.setState({ deviceWidth: $(window).width() });
          } else {
            // Changed to landscape
            this.setState({ deviceWidth: $(window).width() });
          }
        }.bind(this)
      );
    }
  }

  componentWillUnmount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    store.dispatch({
      type: GET_SUCCESS_MSG,
      payload: {},
    });
  }

  render() {
    const { deviceWidth } = this.state;
    return (
      <div id="batch">
        <div className="container-fluid">
          <div className="row">
            <div id="verticalMenu" className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar deviceWidth={deviceWidth}></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div>
            <div
              className="col-sm-10"
              style={{ backgroundColor: "#F2F2F2" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  loginUrl: state.loginUrl,
});

export default connect(mapStateToProps, {})(Batch);
