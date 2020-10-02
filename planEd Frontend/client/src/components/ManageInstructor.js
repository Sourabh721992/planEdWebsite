import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import store from "../store";
import VerticalNavbar from "./layout/VerticalNavbar";
import { GET_SUCCESS_MSG, GET_ERRORS } from "../actions/types";

class ManageInstructor extends Component {
  constructor() {
    super();
    this.state = {
      deviceWidth: -1,
      errors: {},
      success: {},
      tNm: "",
      mobile: "",
      email: "",
      subject: "",
      address: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      alert("Hit API");
    }
  }

  validateForm() {
    let errors = {};
    let isValid = true;

    if (this.state.tNm === "") {
      errors.tNm = "Teacher name is required";
      isValid = false;
    }

    if (this.state.mobile === "") {
      errors.mobile = "Contact number is required";
      isValid = false;
    } else {
      if (/^\d{10}$/.test(this.state.mobile)) {
      } else {
        errors.mobile = "Enter valid conatct number";
        isValid = false;
      }
    }

    if (this.state.email === "") {
      errors.email = "Teacher email is required";
      isValid = false;
    } else {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
      ) {
      } else {
        errors.email = "Enter valid email address";
        isValid = false;
      }
    }

    if (this.state.subject === "") {
      errors.subject = "Subject is required";
      isValid = false;
    }
    this.setState({ errors: errors });
    return isValid;
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

  render() {
    const { deviceWidth, errors, success } = this.state;

    const htmlAddTeacherMoreThan600 = (
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
                  src={require("../images/batch.svg")}
                  alt="Activity Logger"
                  id="imgActivity"
                  style={{ height: 120, fill: "#FFFFFF" }}
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
                    Teacher Name
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    type="text"
                    name="tNm"
                    placeholder="Teacher Name"
                    className="form-control form-control-lg"
                    value={this.state.tNm}
                    onChange={this.onChange}
                    style={{ fontSize: 14 }}
                    required
                  ></input>
                </div>
                <div className="col-sm-3" style={{ textAlign: "right" }}>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                    }}
                  >
                    Mobile Number
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Teacher Mobile Number"
                    className="form-control form-control-lg"
                    value={this.state.mobile}
                    onChange={this.onChange}
                    style={{ fontSize: 14 }}
                    required
                  ></input>
                </div>
              </div>
              <div className="row" style={{ height: "20px" }}>
                <div className="col-sm-3"></div>
                <div className="col-sm-4">
                  {errors.tNm && (
                    <label className="errorMsg">{errors.tNm}</label>
                  )}
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-3">
                  {errors.mobile && (
                    <label className="errorMsg">{errors.mobile}</label>
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
                    Email
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    type="text"
                    name="email"
                    placeholder="Teacher Email Address"
                    className="form-control form-control-lg"
                    value={this.state.email}
                    onChange={this.onChange}
                    style={{ fontSize: 14 }}
                    required
                  ></input>
                </div>
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
                    Subject
                  </span>
                </div>
                <div className="col-sm-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject Name"
                    className="form-control form-control-lg"
                    value={this.state.subject}
                    onChange={this.onChange}
                    style={{ fontSize: 14 }}
                    required
                  ></input>
                </div>
              </div>
              <div className="row" style={{ height: "20px" }}>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  {errors.email && (
                    <label className="errorMsg">{errors.email}</label>
                  )}
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                  {errors.subject && (
                    <label className="errorMsg">{errors.subject}</label>
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
                    Address
                  </span>
                </div>
                <div className="col-sm-6">
                  <textarea
                    className="form-control rounded-0"
                    name="address"
                    onChange={this.onChange}
                    value={this.state.address}
                    placeholder="Teacher Address"
                    rows="2"
                    style={{ fontSize: 14 }}
                  ></textarea>
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
                    value="Add Teacher"
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
    return (
      <div id="manageInstructor">
        <div className="container-fluid">
          <div className="row">
            <div id="verticalMenu" className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar deviceWidth={deviceWidth}></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div>
            <div className="col-sm-10" style={{ backgroundColor: "#F2F2F2" }}>
              {deviceWidth > 600 && htmlAddTeacherMoreThan600}
            </div>
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

export default connect(mapStateToProps, {})(ManageInstructor);
