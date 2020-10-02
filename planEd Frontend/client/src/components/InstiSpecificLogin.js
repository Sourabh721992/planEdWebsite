import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";
import axios from "axios";

class InstiSpecificLogin extends Component {
  constructor() {
    super();
    this.state = {
      insId: "",
      insNm: "",
      insAddress: "",
      teacherNm: "",
      subject: "",
      tagline: "",
      mobile: "",
      email: "",
      number: "",
      password: "",
      imgPath: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let userDetails = {
      uid: this.state.number,
      pwd: this.state.password,
    };

    this.props.loginUser(userDetails);
  }

  componentDidMount() {
    //Get Insti advertising details
    let insId = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    let data = {};
    data["insId"] = insId;
    axios.post("https://planed.in/api/others/insitinfo", data).then((res) => {
      if (res.data.flag == 1) {
        let data = res.data.data;
        this.setState({
          ["insId"]: data._id,
          ["insNm"]: data.insNm,
          ["insAddress"]: data.insAddress,
          ["subject"]: data.subject,
          ["teacherNm"]: data.teacherNm,
          ["tagline"]: data.tagline,
          ["mobile"]: data.mobile,
          ["email"]: data.email,
          ["imgPath"]: data.image,
        });
      } else {
        alert("An error has occured. Request you to try after sometime.");
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.user.role.search("T") >= 0
    ) {
      this.props.history.push("/teacher");
    } else if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.user.role.search("S") >= 0
    ) {
      this.props.history.push("/student");
    } else if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.user.role.search("A") >= 0
    ) {
      this.props.history.push("/batch");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="insLogin">
        <div
          className="col-sm-8"
          style={{
            height: "300vh",
            backgroundColor: "#0d345a",
            marginTop: "-25px",
            float: "left",
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: 5 }}>
            <span style={{ fontSize: 26, color: "#2cd5a6" }}>
              {this.state.insNm}
            </span>{" "}
            <span style={{ fontSize: 26, color: "#ffffff" }}>
              &nbsp; - &nbsp; {this.state.insAddress}
            </span>
          </div>
          <div>
            <span style={{ fontSize: 26, color: "#ffffff" }}>
              {" "}
              by &nbsp; {this.state.teacherNm}
            </span>
          </div>
          <div>
            <span style={{ fontSize: 26, color: "#ffffff" }}>&#124;</span>
            <span style={{ fontSize: 20, color: "#ffffff" }}>
              &nbsp; {this.state.subject}&nbsp;
            </span>
            <span style={{ fontSize: 26, color: "#ffffff" }}>&#124;</span>
          </div>
          <div style={{ fontSize: 20, color: "#ffffff" }}>
            {this.state.tagline}
          </div>
          <div style={{ height: "0.5rem" }}></div>
          <div>
            <img
              src={
                "https://planed.in/api/others/instibanner?path=" +
                this.state.imgPath
              }
              style={{ width: "40rem", height: "" }}
            ></img>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <i
              className="fa fa-phone-alt fa-1g"
              style={{ color: "#2cd5a6" }}
            ></i>
            &nbsp;
            <span style={{ fontSize: 20, color: "#ffffff" }}>
              {this.state.mobile}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i
              className="fa fa-envelope fa-1g"
              style={{ color: "#2cd5a6" }}
            ></i>
            <span style={{ fontSize: 20, color: "#ffffff" }}>
              &nbsp;{this.state.email}
            </span>
          </div>
        </div>
        <div
          className="col-sm-4"
          style={{ float: "left", textAlign: "center" }}
        >
          <div style={{ fontSize: 40, color: "#1c1b22", marginTop: 15 }}>
            Welcome :)
          </div>
          <div style={{ height: "2rem" }}></div>
          <div style={{ fontSize: 26, color: "#37586e" }}>
            {this.state.insNm}
          </div>
          <br></br>
          <div style={{ fontSize: 24, color: "#37586e" }}>Login</div>
          <br></br>
          <div
            className="input-icons"
            style={{ width: "100%", marginBottom: "8px" }}
          >
            <i
              className="fas fa-user icon"
              style={{
                position: "absolute",
                color: "#11c5d9",
                padding: "15px",
                marginLeft: "-45%",
                width: "45px",
              }}
            ></i>
            <input
              type="number"
              className="form-control form-control-lg input-field"
              placeholder="Mobile Number"
              name="number"
              onChange={this.onChange}
              value={this.state.number}
              style={{ paddingLeft: "45px" }}
            />
          </div>
          <div className="input-icons">
            <i
              className="fas fa-key icon"
              style={{
                position: "absolute",
                color: "#11c5d9",
                padding: "15px",
                marginLeft: "-45%",
                width: "45px",
              }}
            ></i>
            <input
              type="password"
              className="form-control form-control-lg input-field"
              //placeholder="Password"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
              style={{ paddingLeft: "45px" }}
            />
          </div>
          <div style={{ height: "1rem" }}></div>
          <div className="form-group">
            <input
              type="submit"
              name="submit"
              className="btn btn-md"
              value="Login"
              style={{
                backgroundColor: "#1d3b80",
                color: "#ffffff",
                fontSize: 18,
                float: "left",
              }}
              onClick={this.onSubmit}
            />
            <span className="align-bottom float-right mr-3">
              <label style={{ color: "#1c1b22", fontSize: 18 }}>
                Forgot Password?&nbsp;
              </label>
              <Link
                to="/password"
                style={{
                  fontSize: 16,
                  color: "#11c5d9",
                }}
              >
                Click Here
              </Link>
            </span>
          </div>
          <div style={{ height: "2rem" }}></div>
          <div style={{}}>
            {errors.msg && (
              <label className="alert alert-danger">{errors.msg}</label>
            )}
          </div>
          <div className="alert alert-info" style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: 20, color: "#1c1b22" }}>
              In order to use features (refer About page) free of cost, contact
              us.
            </span>
            <br></br>
            <i
              className="fa fa-envelope fa-1g"
              style={{ color: "#2cd5a6" }}
            ></i>{" "}
            <span style={{ fontSize: 15, color: "#0000FF" }}>
              Connectplaned@gmail.com
            </span>
          </div>
        </div>
      </div>
    );
  }
}

InstiSpecificLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(
  withRouter(InstiSpecificLogin)
);
