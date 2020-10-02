import React, { Component } from "react";
import VerticalNavbar from "./layout/VerticalNavbar";
import PropTypes from "prop-types";
import $ from "jquery";
import { connect } from "react-redux";
import TimePicker from "react-times";
import store from "../store";
import { GET_SUCCESS_MSG, GET_ERRORS } from "../actions/types";
import isEmpty from "../validations/isEmpty";
import {
  saveLiveSession,
  getLiveSessionList,
} from "../actions/liveSessionAction";
import Gridview from "./layout/Gridview";

// use material theme
import "react-times/css/material/default.css";
// or you can use classic theme
import "react-times/css/classic/default.css";

class ScheduleSession extends Component {
  constructor() {
    super();
    this.state = {
      fromTime: "00:00",
      toTime: "00:00",
      selectedBid: "-1",
      cNm: "",
      topic: "",
      description: "",
      errors: {},
      success: {},
      checked: false,
      session: [],
      deviceWidth: -1,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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
      //Get the uploaded session details from server
      if (isEmpty(this.props.session)) {
        //Get session list from database
        this.props.getLiveSessionList(String(this.props.auth.user.tId));
      } else {
        this.setState({ session: this.props.session });
      }
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
      let loginUrl = props.loginUrl.url.toString();
      if (loginUrl.indexOf("login") > -1) {
        props.history.push(loginUrl);
      } else {
        props.history.push("/default");
      }
    } else {
      if (props.session != state.session) {
        return {
          session: props.session,
          success: props.success,
          errors: {},
          fromTime: "00:00",
          toTime: "00:00",
          selectedBid: "-1",
          cNm: "",
          topic: "",
          description: "",
          checked: false,
        };
      }
      if (props.success != state.success) {
        return {
          success: props.success,
        };
      }
      if (!isEmpty(state.errors)) {
        return { errors: state.errors };
      }

      if (!isEmpty(props.errors)) {
        return {
          errors: props.errors,
          success: {},
          fromTime: "00:00",
          toTime: "00:00",
          selectedBid: "-1",
          cNm: "",
          topic: "",
          description: "",
          checked: false,
        };
      }
    }
    return null;
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

  onFromTimeChange(options) {
    const { hour, minute, meridiem } = options;
    this.setState({ fromTime: hour + ":" + minute });
  }

  onToTimeChange(options) {
    const { hour, minute, meridiem } = options;
    this.setState({ toTime: hour + ":" + minute });
  }

  onFocusChange(focusStatue) {
    // do something
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckboxChange = (e) => this.setState({ checked: e.target.checked });

  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let bId = this.state.selectedBid;
      let bNm = "-1";
      this.props.auth.user.batches.map((dr, idx) => {
        if (dr.id === this.state.selectedBid) {
          bNm = dr.nm;
        }
      });
      let tId = this.props.auth.user.tId;
      let tNm = this.props.auth.user.tNm;
      let chapter = this.state.cNm;
      let topic = this.state.topic;
      let description = this.state.description;
      let startTime = this.state.fromTime;
      let toTime = this.state.toTime;
      let chapterDone = Boolean(this.state.checked);

      this.props.saveLiveSession(
        bId,
        tId,
        tNm,
        bNm,
        chapter,
        topic,
        description,
        startTime,
        toTime,
        chapterDone
      );
    }
  }

  validateForm() {
    let isValid = true;
    let errors = {};
    //Perform Validation -- here
    if (this.state.selectedBid === "-1") {
      errors.batch = "Request you to select batch";
      isValid = false;
    }
    if (this.state.fromTime === "00:00" && this.state.toTime === "00:00") {
      errors.timings = "Request you enter timings of class";
      isValid = false;
    } else {
      let fromTimeMinutes = this.getTimeAsNumberOfMinutes(this.state.fromTime);
      let toTimeMinutes = this.getTimeAsNumberOfMinutes(this.state.toTime);

      if (Number(toTimeMinutes) <= Number(fromTimeMinutes)) {
        errors.timings = "End time should be greater than start time";
        isValid = false;
      } else {
        let dt = new Date();
        let zoneOffset = dt.getTimezoneOffset();
        zoneOffset = 0; //bcz our server is showing time in gmt and its zoneoffset is -120.
        //dt = new Date(dt.getTime() + (zoneOffset + 330) * 60 * 1000);

        let time = dt.getHours() + ":" + dt.getMinutes();
        let nowMinutes = this.getTimeAsNumberOfMinutes(time);
        if (
          Number(fromTimeMinutes) <= Number(nowMinutes) ||
          Number(toTimeMinutes) <= Number(nowMinutes)
        ) {
          errors.timings = "You can schedule future classes only.";
          isValid = false;
        }
        if (isValid) {
          //Check whether teacher has any existing class or not
          let newBatchTimeStart = Number(fromTimeMinutes);
          let newBatchTimeEnd = Number(toTimeMinutes);
          for (let b = 0; b < this.state.session.length; b++) {
            let existingBatchTimeStart = this.getTimeAsNumberOfMinutes(
              this.state.session[b].Timings.split("-")[0].trim()
            );
            let existingBatchTimeEnd = this.getTimeAsNumberOfMinutes(
              this.state.session[b].Timings.split("-")[1].trim()
            );

            if (
              newBatchTimeStart > existingBatchTimeStart &&
              newBatchTimeStart < existingBatchTimeEnd
            ) {
              alert(
                "You are taking class of " +
                  this.state.session[b]["Batch Name"] +
                  " from " +
                  this.state.session[b].Timings +
                  ". Request you to take class at other time."
              );
              isValid = false;
              return isValid;
            }
            //End time of new batch falls between existing batch times
            if (
              newBatchTimeEnd > existingBatchTimeStart &&
              newBatchTimeEnd < existingBatchTimeEnd
            ) {
              alert(
                "You are taking class of " +
                  this.state.session[b]["Batch Name"] +
                  " from " +
                  this.state.session[b].Timings +
                  ". Request you to take class at other time."
              );
              isValid = false;
              return isValid;
            }
            //Start time of existing batch falls between new batch times
            if (
              existingBatchTimeStart > newBatchTimeStart &&
              existingBatchTimeStart < newBatchTimeEnd
            ) {
              alert(
                "You are taking class of " +
                  this.state.session[b]["Batch Name"] +
                  " from " +
                  this.state.session[b].Timings +
                  ". Request you to take class at other time."
              );
              isValid = false;
              return isValid;
            }
            //End time of new existing batch falls between new batch times
            if (
              existingBatchTimeEnd > newBatchTimeStart &&
              existingBatchTimeEnd < newBatchTimeEnd
            ) {
              alert(
                "You are taking class of " +
                  this.state.session[b]["Batch Name"] +
                  " from " +
                  this.state.session[b].Timings +
                  ". Request you to take class at other time."
              );
              isValid = false;
              return isValid;
            }
            if (
              existingBatchTimeEnd === newBatchTimeEnd &&
              existingBatchTimeStart === newBatchTimeStart
            ) {
              alert(
                "You are taking class of " +
                  this.state.session[b]["Batch Name"] +
                  " from " +
                  this.state.session[b].Timings +
                  ". Request you to take class at other time."
              );
              isValid = false;
              return isValid;
            }
          }
        }
      }
    }

    if (this.state.cNm === "") {
      errors.cNm = "Request you to enter chapter";
      isValid = false;
    }
    if (this.state.topic === "") {
      errors.topic = "Request you to enter topic name";
      isValid = false;
    }
    if (this.state.description === "") {
      errors.description = "Request you to enter description";
      isValid = false;
    }

    this.setState({ errors: errors });
    return isValid;
  }

  getTimeAsNumberOfMinutes(time) {
    let timeParts = time.split(":");
    let timeInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
    return timeInMinutes;
  }

  render() {
    const { user } = this.props.auth;
    const { errors, success, session, deviceWidth } = this.state;
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

    const ScheduleSessionAbove600 = (
      <div
        className="card"
        style={{
          backgroundColor: "#82B8D9",
          width: "100%",
          borderRadius: "0.5rem",
        }}
      >
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-sm-2">
            {/* <div className="row" style={{ marginLeft: "auto" }}> */}
            <div className="col-sm-12">
              <div
                className="row"
                style={{ marginLeft: "auto", padding: "6.5rem" }}
              >
                <img
                  src={require("../images/Activity.png")}
                  alt="Activity Logger"
                  id="imgActivity"
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
                  </select>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-4app">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      checked={this.state.checked}
                      onChange={this.handleCheckboxChange}
                    ></input>
                    <label className="form-check-label">
                      <span
                        style={{
                          color: "#FFFFFF",
                          fontSize: 16,
                        }}
                      >
                        Chapter will be completed today
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row" style={{ height: "20px" }}>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  {errors.batch && (
                    <label className="errorMsg">{errors.batch}</label>
                  )}
                </div>
              </div>
              <div className="row" style={{ height: "10px" }}></div>
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
                    Start Time
                  </span>
                </div>
                <div className="col-sm-3">
                  <TimePicker
                    theme="material"
                    timeMode="24"
                    colorPalette="light"
                    showTimezone={true}
                    time={this.state.fromTime}
                    timeFormat="HH:MM"
                    // withoutIcon={true}
                    onFocusChange={this.onFocusChange.bind(this)}
                    onTimeChange={this.onFromTimeChange.bind(this)}
                  />
                </div>
                <div
                  className="col-sm-2"
                  style={{
                    textAlign: "right",
                    marginTop: "0px",
                  }}
                >
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                    }}
                  >
                    End Time
                  </span>
                </div>
                <div className="col-sm-3">
                  <TimePicker
                    theme="material"
                    timeMode="24"
                    // colorPalette="dark"
                    showTimezone={true}
                    time={this.state.toTime}
                    timeFormat="HH:MM"
                    // withoutIcon={true}
                    onFocusChange={this.onFocusChange.bind(this)}
                    onTimeChange={this.onToTimeChange.bind(this)}
                  />
                </div>
              </div>
              <div className="row" style={{ height: "20px" }}>
                <div className="col-sm-3"></div>
                <div className="col-sm-5"></div>
                <div className="col-sm-4">
                  {errors.timings && (
                    <label className="errorMsg">{errors.timings}</label>
                  )}
                </div>
              </div>
              <div className="row" style={{ height: "10px" }}></div>
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
                    Chapter Name
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    id="text"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Chapter Name"
                    name="cNm"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.cNm}
                    required
                  />
                </div>
                <div
                  className="col-sm-2"
                  style={{
                    textAlign: "right",
                    marginTop: "0px",
                  }}
                >
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                    }}
                  >
                    Topic Name
                  </span>
                </div>
                <div className="col-sm-4">
                  <input
                    id="text"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Topic Name"
                    name="topic"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.topic}
                    required
                  />
                </div>
              </div>
              <div className="row" style={{ height: "20px" }}>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  {errors.cNm && (
                    <label className="errorMsg">{errors.cNm}</label>
                  )}
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-4">
                  {errors.topic && (
                    <label className="errorMsg">{errors.topic}</label>
                  )}
                </div>
              </div>
              <div className="row" style={{ height: "10px" }}></div>
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
                    Description
                  </span>
                </div>
                <div className="col-sm-9" style={{ marginTop: "auto" }}>
                  <textarea
                    className="form-control rounded-0"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                    placeholder="Write what the class is going to be about"
                    rows="2"
                    required
                    style={{ fontSize: 14 }}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9" style={{ height: "20px" }}>
                  {errors.description && (
                    <label className="errorMsg">{errors.description}</label>
                  )}
                </div>
              </div>
              <div className="row" style={{ height: "10px" }}></div>
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="Schedule Online Class"
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
    );

    const ScheduleSessionLess600 = (
      <div
        className="card"
        style={{
          backgroundColor: "#82B8D9",
          width: "100%",
          borderRadius: "0.5rem",
        }}
      >
        <div className="row" style={{ marginTop: 20, width: "100%" }}>
          <div className="text-center" style={{ width: "100%" }}>
            <img
              src={require("../images/Activity.png")}
              alt="Activity Logger"
              id="imgActivity"
              style={{ height: "4rem" }}
            ></img>
          </div>
          <div style={{ height: "1rem" }}></div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
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
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
              marginRight: "0.5rem",
            }}
          >
            <select
              id="batchDropdownlist"
              name="selectedBid"
              className="form-control form-control-lg"
              value={this.state.selectedBid}
              onChange={this.onChange}
            >
              <option value="-1">Select Batch </option>
              {batchDropdownOptions}
            </select>
          </div>
          <div style={{ height: "0.5rem" }}></div>
          <div style={{ marginLeft: "1.5rem", height: "0.5rem" }}>
            {errors.batch && <label className="errorMsg">{errors.batch}</label>}
          </div>
          <div style={{ height: "2rem" }}></div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Start Time
            </span>
          </div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
              marginRight: "0.5rem",
            }}
          >
            <TimePicker
              theme="material"
              timeMode="24"
              colorPalette="light"
              showTimezone={true}
              time={this.state.fromTime}
              timeFormat="HH:MM"
              // withoutIcon={true}
              onFocusChange={this.onFocusChange.bind(this)}
              onTimeChange={this.onFromTimeChange.bind(this)}
            />
          </div>
          <div style={{ height: "1rem" }}></div>
          <div style={{ height: "1rem" }}></div>
          <div style={{ marginLeft: "1.5rem", width: "100%" }}>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              End Time
            </span>
          </div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
              marginRight: "0.5rem",
            }}
          >
            <TimePicker
              theme="material"
              timeMode="24"
              // colorPalette="dark"
              showTimezone={true}
              time={this.state.toTime}
              timeFormat="HH:MM"
              // withoutIcon={true}
              onFocusChange={this.onFocusChange.bind(this)}
              onTimeChange={this.onToTimeChange.bind(this)}
            />
          </div>

          <div style={{ height: "0.5rem" }}></div>
          <div style={{ marginLeft: "1.5rem", height: "0.5rem" }}>
            {errors.timings && (
              <label className="errorMsg">{errors.timings}</label>
            )}
          </div>
          <div style={{ height: "2rem" }}></div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Chapter Name
            </span>
          </div>
          <div
            style={{
              marginLeft: "1.5rem",
              marginRight: "0.5rem",
              width: "100%",
            }}
          >
            <input
              id="text"
              type="text"
              className="form-control form-control-lg"
              placeholder="Chapter Name"
              name="cNm"
              style={{ fontSize: 14 }}
              onChange={this.onChange}
              value={this.state.cNm}
              required
            />
          </div>
          <div style={{ height: "0.5rem" }}></div>
          <div style={{ marginLeft: "1.5rem", height: "0.5rem" }}>
            {errors.cNm && <label className="errorMsg">{errors.cNm}</label>}
          </div>
          <div style={{ height: "2rem" }}></div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Topic Name
            </span>
          </div>
          <div
            style={{
              marginLeft: "1.5rem",
              marginRight: "0.5rem",
              width: "100%",
            }}
          >
            <input
              id="text"
              type="text"
              className="form-control form-control-lg"
              placeholder="Topic Name"
              name="topic"
              style={{ fontSize: 14 }}
              onChange={this.onChange}
              value={this.state.topic}
              required
            />
          </div>
          <div style={{ height: "0.5rem" }}></div>
          <div style={{ marginLeft: "1.5rem", height: "0.5rem" }}>
            {errors.topic && <label className="errorMsg">{errors.topic}</label>}
          </div>
          <div style={{ height: "2rem" }}></div>
          <div
            style={{
              marginLeft: "1.5rem",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 16,
              }}
            >
              Description
            </span>
          </div>
          <div
            style={{
              marginLeft: "1.5rem",
              marginRight: "0.5rem",
              width: "100%",
            }}
          >
            <textarea
              className="form-control rounded-0"
              name="description"
              onChange={this.onChange}
              value={this.state.description}
              placeholder="Write what the class is going to be about"
              rows="2"
              required
              style={{ fontSize: 14 }}
            ></textarea>
          </div>
          <div style={{ height: "0.5rem" }}></div>
          <div style={{ height: "0.5rem", marginLeft: "1.5rem" }}>
            {errors.description && (
              <label className="errorMsg">{errors.description}</label>
            )}
          </div>
          <div style={{ height: "2rem" }}></div>
          <div
            className="form-check"
            style={{ marginLeft: "1.5rem", width: "100%" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
              checked={this.state.checked}
              onChange={this.handleCheckboxChange}
            ></input>
            <label className="form-check-label">
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                }}
              >
                Chapter will be completed today
              </span>
            </label>
          </div>
          <div style={{ height: "2rem" }}></div>
          <div style={{ marginLeft: "1.5rem", width: "100%" }}>
            <input
              type="submit"
              name="submit"
              className="btn btn-info btn-md"
              value="Schedule Online Class"
              onClick={this.onSubmit}
            />
          </div>
          <div style={{ height: "2rem" }}></div>
          <div style={{ marginLeft: "1.5rem" }}>
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
          <div className="row" style={{ height: "20px" }}></div>
        </div>
      </div>
    );

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
            <div className="col-sm-10" style={{ backgroundColor: "#F2F2F2" }}>
              {deviceWidth > 600 && ScheduleSessionAbove600}
              {deviceWidth <= 600 && ScheduleSessionLess600}
              <div className="row" style={{ height: 20 }}></div>
              {session.length > 0 && (
                <Gridview data={session} comp="Session"></Gridview>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ScheduleSession.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  loginUrl: PropTypes.object.isRequired,
  saveLiveSession: PropTypes.func.isRequired,
  getLiveSessionList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  session: state.session,
  loginUrl: state.loginUrl,
});

export default connect(mapStateToProps, {
  saveLiveSession,
  getLiveSessionList,
})(ScheduleSession);
