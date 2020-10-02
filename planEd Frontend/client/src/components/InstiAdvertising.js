import React, { Component } from "react";
import isEmpty from "../validations/isEmpty";
import $ from "jquery";
import axios from "axios";

class InstiAdvertising extends Component {
  constructor() {
    super();
    this.state = {
      insNm: "",
      insAddress: "",
      teacherNm: "",
      subject: "",
      tagline: "",
      mobile: "",
      email: "",
      selectedFile: null,
      deviceWidth: -1,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    let file = this.state.selectedFile;
    if (
      file.name.indexOf("png") > -1 ||
      file.name.indexOf("jpg") > -1 ||
      file.name.indexOf("jpeg") > -1 ||
      file.name.indexOf("svg") > -1
    ) {
      let data = new FormData();
      data.append("insNm", this.state.insNm);
      data.append("insAddress", this.state.insAddress);
      data.append("teacherNm", this.state.teacherNm);
      data.append("subject", this.state.subject);
      data.append("tagline", this.state.tagline);
      data.append("mobile", this.state.mobile);
      data.append("email", this.state.email);
      data.append("file", file);
      axios
        .post("https://planed.in/api/others/instiadvertisinglink", data, {})
        .then((res) => {
          if (res.data.flag == 1) {
            this.setState({ insNm: "" });
            this.setState({ insAddress: "" });
            this.setState({ teacherNm: "" });
            this.setState({ subject: "" });
            this.setState({ tagline: "" });
            this.setState({ mobile: "" });
            this.setState({ email: "" });
            this.setState({ selectedFile: null });
            alert("Link has been created. Link: " + res.data.msg);
          } else {
            alert("An error has occured. Request you to try after sometime.");
          }
        });
    } else {
      alert("Only png, jpg, jpeg, svg images are allowed");
    }
  }

  onChangeFileHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  componentDidMount() {
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

  render() {
    const webForm = (
      <div id="instiAdverstising">
        <div
          className="row align-items-center"
          style={{ height: "1.5rem" }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "14rem",
            marginRight: "14rem",
            marginTop: "1rem",
          }}
        >
          <div className="card" style={{ backgroundColor: "#3a648a" }}>
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div className="row col-sm-12">
              <div
                className="col-sm-6"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <img
                  src={require("../images/Help.png")}
                  style={{ height: "25rem", marginLeft: "5rem" }}
                ></img>
              </div>
              <div className="col-sm-6">
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="insNm"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.insNm}
                    required
                    placeholder="Enter Institute Name"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="insAddress"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.insAddress}
                    required
                    placeholder="Enter Institute Address (Enter Area, City)"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="teacherNm"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.teacherNm}
                    required
                    placeholder="Enter Owner/Teacher Name"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="subject"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.subject}
                    required
                    placeholder="Enter Subject(s)"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="tagline"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.tagline}
                    required
                    placeholder="Enter Institute tagline"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.mobile}
                    required
                    placeholder="Enter Contact Number"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                    placeholder="Enter Email Address"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="file"
                    name="selectedFile"
                    onChange={this.onChangeFileHandler}
                    required
                  ></input>
                </div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <span style={{ color: "white", fontSize: "10px" }}>
                    Request you to upload your Institute Banner (Size of image
                    should be 880*1280)
                  </span>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="Create Advertising Link"
                  />
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const mobileForm = (
      <div id="instiAdverstising">
        <div
          className="row align-items-center"
          style={{ height: "1.5rem" }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "14rem",
            marginRight: "14rem",
            marginTop: "1rem",
          }}
        >
          <div className="card" style={{ backgroundColor: "#3a648a" }}>
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div className="row col-sm-12">
              <div
                className="col-sm-6"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <img
                  src={require("../images/Help.png")}
                  style={{ height: "25rem", marginLeft: "5rem" }}
                ></img>
              </div>
              <div className="col-sm-6">
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="insNm"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.insNm}
                    required
                    placeholder="Enter Institute Name"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="insAddress"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.insAddress}
                    required
                    placeholder="Enter Institute Address (Enter Area, City)"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="teacherNm"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.teacherNm}
                    required
                    placeholder="Enter Owner/Teacher Name"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="subject"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.subject}
                    required
                    placeholder="Enter Subject(s)"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="tagline"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.tagline}
                    required
                    placeholder="Enter Institute tagline"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.mobile}
                    required
                    placeholder="Enter Contact Number"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    style={{ fontSize: 14 }}
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                    placeholder="Enter Email Address"
                  ></input>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="file"
                    name="selectedFile"
                    onChange={this.onChangeFileHandler}
                    required
                  ></input>
                </div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <span style={{ color: "white", fontSize: "10px" }}>
                    Request you to upload your Institute Banner (Size of image
                    should be 880*1280)
                  </span>
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
                <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="Create Advertising Link"
                  />
                </div>
                <div className="row" style={{ height: "1rem" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const { deviceWidth } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        {deviceWidth > 600 && webForm}
        {deviceWidth <= 600 && mobileForm}
      </form>
    );
  }
}

export default InstiAdvertising;
