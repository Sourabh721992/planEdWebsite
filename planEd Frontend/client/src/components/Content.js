import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../validations/isEmpty";
import store from "../store";
import { GET_SUCCESS_MSG, GET_ERRORS } from "../actions/types";
import PropTypes from "prop-types";
import VerticalNavbar from "./layout/VerticalNavbar";
import { uploadContent, getContentList } from "../actions/contentAction";
import Gridview from "./layout/Gridview";
import $ from "jquery";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      loaded: 0,
      selectedBid: "-1",
      filename: "",
      description: "",
      errors: {},
      success: {},
      content: [],
      deviceWidth: -1,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    } else {
      //Get the uploaded content details from server
      if (isEmpty(this.props.content)) {
        //Get content list from database
        if (this.props.auth.user.role == "T") {
          this.props.getContentList(
            String(this.props.auth.user.tId),
            this.props.auth.user.role,
            this.props.auth.user.insId
          );
        } else if (this.props.auth.user.role == "S") {
          this.props.getContentList(
            String(this.props.auth.user.sId),
            this.props.auth.user.role,
            this.props.auth.user.insId
          );
        }
        // this.props.getContentList(String(this.props.auth.user.tId));
      } else {
        this.setState({ content: this.props.content });
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
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated == false) {
      props.history.push("/");
    } else {
      if (props.content != state.content) {
        return {
          content: props.content,
          success: props.success,
          errors: {},
          filename: "",
          selectedBid: "-1",
          description: "",
          selectedFile: null,
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
          filename: "",
          selectedBid: "-1",
          description: "",
          selectedFile: null,
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

  onChangeFileHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let bId = this.state.selectedBid;
      let tId = this.props.auth.user.tId;
      let description = this.state.description;
      let nm = this.state.filename;
      let insNm = this.props.auth.user.insNm;
      let file = this.state.selectedFile;

      this.props.uploadContent(bId, tId, description, nm, insNm, file);
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
    if (this.state.selectedFile == null) {
      errors.file = "Request you to select file";
      isValid = false;
    }
    if (this.state.filename === "") {
      errors.filename = "Request you to enter filename";
      isValid = false;
    } else {
      if (this.state.filename.length > 25) {
        errors.filename = "Filename cannot be more than 25 characters.";
        isValid = false;
      }
    }
    if (this.state.description === "") {
      errors.description = "Request you to enter description";
      isValid = false;
    }

    this.setState({ errors: errors });
    return isValid;
  }

  render() {
    const { user } = this.props.auth;
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
    const { errors } = this.state;
    const { success } = this.state;
    const { content, deviceWidth } = this.state;
    const uploadContentSectionAbove600 = (
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
                  style={{ marginLeft: "auto", padding: "4rem" }}
                >
                  <img
                    src={require("../images/UploadContent.png")}
                    alt="Upload Content"
                    id="imgUploadContent"
                    style={{ height: 120 }}
                  ></img>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="col-sm-10">
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-sm-3"
                    style={{ textAlign: "right", marginTop: "auto" }}
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
                  <div className="col-sm-3" style={{ marginTop: "auto" }}>
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
                    {/* {errors.batch && (
                              <label className="errorMsg">{errors.batch}</label>
                            )} */}
                  </div>
                  <div
                    className="col-sm-2"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                      }}
                    >
                      Select File
                    </span>
                  </div>
                  <div className="col-sm-4" style={{ marginTop: "auto" }}>
                    {/* <div className="form-group files"> */}
                    <input
                      type="file"
                      name="selectedFile"
                      onChange={this.onChangeFileHandler}
                    ></input>
                    {/* {errors.file && (
                              <label className="errorMsg">{errors.file}</label>
                            )} */}
                    {/* </div> */}
                  </div>
                </div>
                <div className="row" style={{ height: 20 }}>
                  <div
                    className="col-sm-3"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  ></div>
                  <div className="col-sm-3" style={{ marginTop: "auto" }}>
                    {errors.batch && (
                      <label className="errorMsg">{errors.batch}</label>
                    )}
                  </div>
                  <div
                    className="col-sm-2"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  ></div>
                  <div className="col-sm-4" style={{ marginTop: "auto" }}>
                    {/* <div className="form-group files"> */}
                    {errors.file && (
                      <label className="errorMsg">{errors.file}</label>
                    )}
                    {/* </div> */}
                  </div>
                </div>

                <div className="row" style={{ height: 20 }}></div>
                <div className="row">
                  <div
                    className="col-sm-3"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                      }}
                    >
                      Filename
                    </span>
                  </div>
                  <div className="col-sm-3" style={{ marginTop: "auto" }}>
                    <input
                      id="text"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Filename"
                      name="filename"
                      style={{ fontSize: 14 }}
                      onChange={this.onChange}
                      value={this.state.filename}
                      required
                    />
                    {/* {errors.filename && (
                              <label className="errorMsg">
                                {errors.filename}
                              </label>
                            )} */}
                  </div>
                  <div
                    className="col-sm-2"
                    style={{ textAlign: "right", marginTop: "auto" }}
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
                  <div className="col-sm-3" style={{ marginTop: "auto" }}>
                    <textarea
                      className="form-control rounded-0"
                      name="description"
                      onChange={this.onChange}
                      value={this.state.description}
                      placeholder="File Description"
                      rows="2"
                      required
                      style={{ fontSize: 14 }}
                    ></textarea>
                    {/* {errors.description && (
                              <label className="errorMsg">
                                {errors.description}
                              </label>
                            )} */}
                  </div>
                </div>
                <div className="row" style={{ height: "20px" }}>
                  <div
                    className="col-sm-3"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  ></div>
                  <div className="col-sm-3">
                    {errors.filename && (
                      <label className="errorMsg">{errors.filename}</label>
                    )}
                  </div>
                  <div
                    className="col-sm-2"
                    style={{ textAlign: "right", marginTop: "auto" }}
                  ></div>
                  <div className="col-sm-4" style={{ marginTop: "auto" }}>
                    {errors.description && (
                      <label className="errorMsg">{errors.description}</label>
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
                      value="Upload"
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
    const uploadContentSectionLess600 = (
      <div style={{ width: "100%" }}>
        <div className="row" style={{ margin: "auto" }}>
          <div
            className="card"
            style={{ backgroundColor: "#82B8D9", width: "100%" }}
          >
            <div className="text-center">
              <img
                src={require("../images/UploadContent.png")}
                alt="Upload Content"
                id="imgUploadContent"
                style={{ height: "4rem", padding: "0.5rem" }}
              ></img>
            </div>
            <div style={{ paddingLeft: "0.5rem" }}>
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
              </select>
            </div>
            <div style={{ height: "0.5rem" }}></div>
            <div style={{ marginLeft: "0.5rem", height: "0.5rem" }}>
              {errors.batch && (
                <label className="errorMsg">{errors.batch}</label>
              )}
            </div>
            <div style={{ height: "1rem" }}></div>
            <div style={{ marginLeft: "0.5rem" }}>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                }}
              >
                Select File
              </span>
            </div>
            <div style={{ marginLeft: "0.5rem" }}>
              <input
                type="file"
                name="selectedFile"
                onChange={this.onChangeFileHandler}
              ></input>
            </div>
            <div style={{ height: "0.5rem" }}></div>
            <div style={{ marginLeft: "0.5rem", height: "0.5rem" }}>
              {errors.file && <label className="errorMsg">{errors.file}</label>}
            </div>
            <div style={{ height: "1rem" }}></div>
            <div style={{ marginLeft: "0.5rem" }}>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                }}
              >
                Filename
              </span>
            </div>
            <div
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                width: "99%",
              }}
            >
              <input
                id="text"
                type="text"
                className="form-control form-control-lg"
                placeholder="Filename"
                name="filename"
                style={{ fontSize: 14 }}
                onChange={this.onChange}
                value={this.state.filename}
                required
              />
            </div>
            <div style={{ height: "1rem" }}></div>
            <div style={{ marginLeft: "0.5rem", height: "0.5rem" }}>
              {errors.filename && (
                <label className="errorMsg">{errors.filename}</label>
              )}
            </div>
            <div style={{ height: "1rem" }}></div>
            <div style={{ marginLeft: "0.5rem" }}>
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
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              <textarea
                className="form-control rounded-0"
                name="description"
                onChange={this.onChange}
                value={this.state.description}
                placeholder="File Description"
                rows="2"
                required
                style={{ fontSize: 14 }}
              ></textarea>
            </div>
            <div style={{ height: "0.5rem" }}></div>
            <div style={{ marginLeft: "0.5rem", height: "0.5rem" }}>
              {errors.description && (
                <label className="errorMsg">{errors.description}</label>
              )}
            </div>
            <div style={{ height: "1rem" }}></div>
            <div style={{ width: "30%", float: "left", marginLeft: "0.5rem" }}>
              <input
                type="submit"
                name="submit"
                className="btn btn-info btn-md"
                value="Upload"
                onClick={this.onSubmit}
              />
            </div>
            <div style={{ height: "0.5rem" }}></div>
            <div style={{ width: "70%", float: "right", marginLeft: "0.5rem" }}>
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
            <div style={{ height: "20px" }}></div>
          </div>
        </div>
      </div>
    );
    const gridviewContentHeading = (
      <h3 style={{ margin: "auto", fontWeight: "bold" }}>Study Material</h3>
    );
    return (
      <div id="content">
        <div className="container-fluid">
          <div className="row">
            <div id="verticalMenu" className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar deviceWidth={deviceWidth}></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div>
            <div className="col-sm-10" style={{ backgroundColor: "#F2F2F2" }}>
              {deviceWidth > 600 &&
                user.role == "T" &&
                uploadContentSectionAbove600}
              {deviceWidth <= 600 &&
                user.role == "T" &&
                uploadContentSectionLess600}
              {user.role == "S" && gridviewContentHeading}
              <div className="row" style={{ height: 20 }}></div>
              {content.length > 0 && (
                <Gridview data={content} comp="Content"></Gridview>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired,
  // content: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     "Batch Name": PropTypes.string,
  //     File: PropTypes.string,
  //     Description: PropTypes.string,
  //     Date: PropTypes.string,
  //   })
  // ),
  uploadContent: PropTypes.func.isRequired,
  getContentList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  content: state.content,
});

export default connect(mapStateToProps, { uploadContent, getContentList })(
  Content
);
