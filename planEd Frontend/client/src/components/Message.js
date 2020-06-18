import React, { Component } from "react";
import VerticalNavbar from "./layout/VerticalNavbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../store";
import isEmpty from "../validations/isEmpty";
import Gridview from "./layout/Gridview";
import {
  broadcastMessage,
  getBrodcastMessages,
} from "./../actions/messageAction";
import { GET_SUCCESS_MSG, GET_ERRORS } from "../actions/types";
import $ from "jquery";

class Message extends Component {
  constructor() {
    super();
    this.state = {
      selectedBid: "-1",
      errors: {},
      message: "",
      success: {},
      messageDb: [],
      deviceWidth: -1,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    } else {
      //Get the message content details from server
      if (isEmpty(this.props.message)) {
        //Get message list from database
        if (this.props.auth.user.role == "T") {
          this.props.getBrodcastMessages(
            String(this.props.auth.user.tId),
            this.props.auth.user.role,
            this.props.auth.user.insId
          );
        } else if (this.props.auth.user.role == "S") {
          this.props.getBrodcastMessages(
            String(this.props.auth.user.sId),
            this.props.auth.user.role,
            this.props.auth.user.insId
          );
        }
      } else {
        this.setState({ messageDb: this.props.message });
      }
      this.setState({ deviceWidth: $(window).width() });
    }

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

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated == false) {
      props.history.push("/");
    } else {
      if (props.message != state.messageDb) {
        return {
          messageDb: props.message,
          success: props.success,
          errors: {},
          selectedBid: "-1",
          message: "",
        };
      }
      if (props.success != state.success) {
        return {
          success: props.success,
        };
      }
      if (!isEmpty(state.errors)) {
        return { errors: state.errors, success: {} };
      }
    }
    return null;
  }

  componentWillUnmount() {
    store.dispatch({
      type: GET_SUCCESS_MSG,
      payload: {},
    });
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      let arrBid = [];
      let tId = this.props.auth.user.tId;
      let msg = this.state.message;
      let tNm = this.props.auth.user.tNm;
      let insNm = this.props.auth.user.insNm;
      if (this.state.selectedBid == "1") {
        this.props.auth.user.batches.map((batch) => {
          arrBid.push(batch.id);
        });
      } else {
        arrBid.push(this.state.selectedBid);
      }

      this.props.broadcastMessage(arrBid, tId, tNm, msg, insNm);
    }
  };

  validateForm() {
    let isValid = true;
    let errors = {};
    //Perform Validation -- here
    if (this.state.selectedBid === "-1") {
      errors.batch = "Request you to select batch";
      isValid = false;
    }
    if (this.state.message === "") {
      errors.message = "Request you to enter message";
      isValid = false;
    }

    this.setState({ errors: errors });
    return isValid;
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    const { success, deviceWidth } = this.state;
    const batchDropdownOptions =
      this.props.auth.isAuthenticated == true ? (
        user.batches.map((dr, idx) => (
          <option key={idx} value={dr.id}>
            {dr.nm}
          </option>
        ))
      ) : (
        <option value="-1">Select Batch </option>
      );
    const { messageDb } = this.state;

    const broadcastMessageSectionAbove600Width = (
      <div className="row" style={{ margin: "auto" }}>
        <div
          className="card"
          style={{ backgroundColor: "#82B8D9", width: "100%" }}
        >
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-2">
              {/* <div className="row" style={{ marginLeft: "auto" }}> */}
              <div className="col-sm-12">
                <div
                  className="row"
                  style={{ marginLeft: "auto", padding: "3rem" }}
                >
                  <img
                    src={require("../images/Broadcast.svg")}
                    alt="Upload Content"
                    id="imgUploadContent"
                    style={{ height: 120 }}
                  ></img>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="col-sm-10">
              <div className="col-sm-12">
                <div className="row">
                  <div
                    className="col-sm-3"
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                      }}
                    >
                      Select Batch
                    </span>
                  </div>
                  <div className="col-sm-3">
                    <select
                      id="batchDropdownlist"
                      name="selectedBid"
                      className="form-control form-control-lg"
                      value={this.state.selectedBid}
                      onChange={this.onChange}
                    >
                      <option value="-1">Select Batch </option>
                      {batchDropdownOptions}
                      <option value="1">All Batches</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    {errors.batch && (
                      <label className="errorMsg">{errors.batch}</label>
                    )}
                  </div>
                </div>
                <div className="row" style={{ height: "20px" }}></div>
                <div className="row">
                  <div
                    className="col-sm-3"
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                      }}
                    >
                      Message
                    </span>
                  </div>
                  <div className="col-sm-6" style={{ marginTop: "auto" }}>
                    <textarea
                      className="form-control rounded-0"
                      name="message"
                      onChange={this.onChange}
                      value={this.state.message}
                      placeholder="Write message to inform batch"
                      rows="3"
                      required
                      style={{ fontSize: 14 }}
                    ></textarea>
                  </div>
                  <div className="col-sm-3">
                    {errors.message && (
                      <label className="errorMsg">{errors.message}</label>
                    )}
                  </div>
                </div>
                <div className="row" style={{ height: "20px" }}></div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="Send Message"
                      onClick={this.onSubmit}
                    />
                  </div>
                  <div className="col-sm-6">
                    {errors.msg && (
                      <div className="alert alert-danger" role="alert">
                        <label>{errors.msg}</label>
                      </div>
                    )}
                    {success.msg && (
                      <div className="alert alert-success" role="alert">
                        <label>{success.msg}</label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row" style={{ height: "20px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const broadcastMessageSectionLess600Width = (
      <div className="row" style={{ margin: "auto" }}>
        <div
          className="card"
          style={{ backgroundColor: "#82B8D9", width: "100%" }}
        >
          <div style={{ marginTop: "0.5rem" }}></div>
          <div className="text-center" style={{ width: "100%" }}>
            <img
              src={require("../images/Broadcast.svg")}
              alt="Upload Content"
              id="imgUploadContent"
              style={{ height: "4rem" }}
            ></img>
          </div>
          <div
            style={{
              marginLeft: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Select Batch
            </span>
          </div>
          <div style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
            <select
              id="batchDropdownlist"
              name="selectedBid"
              className="form-control form-control-lg"
              value={this.state.selectedBid}
              onChange={this.onChange}
            >
              <option value="-1">Select Batch </option>
              {batchDropdownOptions}
              <option value="1">All Batches</option>
            </select>
          </div>
          <div style={{ marginLeft: "0.5rem", height: "0.5rem" }}>
            {errors.batch && <label className="errorMsg">{errors.batch}</label>}
          </div>
          <div className="row" style={{ height: "0.5rem" }}></div>
          <div
            style={{
              marginLeft: "0.5rem",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Message
            </span>
          </div>
          <div style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
            <textarea
              className="form-control rounded-0"
              name="message"
              onChange={this.onChange}
              value={this.state.message}
              placeholder="Write message to inform batch"
              rows="3"
              required
              style={{ fontSize: 14 }}
            ></textarea>
          </div>
          <div style={{ height: "0.5rem", marginLeft: "0.5rem" }}>
            {errors.message && (
              <label className="errorMsg">{errors.message}</label>
            )}
          </div>
          <div className="row" style={{ height: "0.5rem" }}></div>
          <div style={{ padding: "0.5rem", width: "30%", float: "left" }}>
            <input
              type="submit"
              name="submit"
              className="btn btn-info btn-md"
              value="Send Message"
              onClick={this.onSubmit}
            />
          </div>
          <div style={{ padding: "0.5rem", width: "70%", float: "right" }}>
            {errors.msg && (
              <div className="alert alert-danger" role="alert">
                <label>{errors.msg}</label>
              </div>
            )}
            {success.msg && (
              <div className="alert alert-success" role="alert">
                <label>{success.msg}</label>
              </div>
            )}
          </div>
          <div className="row" style={{ height: "0.5rem" }}></div>
        </div>
      </div>
    );
    const gridviewMessageHeading = (
      <h3 style={{ margin: "auto", fontWeight: "bold" }}>Announcements</h3>
    );
    return (
      <div id="message">
        <div className="container-fluid">
          <div className="row">
            <div id="verticalMenu" className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar deviceWidth={deviceWidth}></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div>
            <div className="col-sm-10" style={{ backgroundColor: "#F2F2F2" }}>
              {deviceWidth <= 600 &&
                user.role == "T" &&
                broadcastMessageSectionLess600Width}
              {deviceWidth > 600 &&
                user.role == "T" &&
                broadcastMessageSectionAbove600Width}
              {user.role == "S" && gridviewMessageHeading}
              <div className="row" style={{ height: 20 }}></div>
              {messageDb.length > 0 && (
                <Gridview data={messageDb} comp="Message"></Gridview>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  // message: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     "Batch Name": PropTypes.string,
  //     Message: PropTypes.string,
  //     Date: PropTypes.string,
  //   })
  // ),
  broadcastMessage: PropTypes.func.isRequired,
  getBrodcastMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  message: state.message,
});

export default connect(mapStateToProps, {
  broadcastMessage,
  getBrodcastMessages,
})(Message);
