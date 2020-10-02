import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    //alert(window.location.href);
  }

  onSubmit(e) {
    e.preventDefault();
    let userDetails = {
      uid: this.state.number,
      pwd: this.state.password,
    };

    this.props.loginUser(userDetails);
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
      <div className="loginboard">
        <div id="login">
          <div className="container">
            <div
              id="login-row"
              className="row justify-content-center align-items-center"
            >
              <div id="login-column" className="col-sm-6">
                <div id="login-box" className="col-sm-12">
                  <form
                    id="login-form"
                    className="form"
                    action=""
                    method="post"
                  >
                    <h3 id="loginHeading" className="text-center  text-white">
                      Login
                    </h3>
                    <div className="form-group">
                      <label className="text-white">Username</label>
                      <br />
                      <div className="input-icons">
                        <i className="fas fa-user icon"></i>
                        <input
                          type="number"
                          className="form-control form-control-lg input-field"
                          placeholder="Mobile Number"
                          name="number"
                          onChange={this.onChange}
                          value={this.state.number}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-white">Password</label>
                      <br />
                      <div className="input-icons">
                        <i className="fas fa-key icon"></i>
                        <input
                          type="password"
                          className="form-control form-control-lg input-field"
                          //placeholder="Password"
                          name="password"
                          onChange={this.onChange}
                          value={this.state.password}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        name="submit"
                        className="btn btn-info btn-md"
                        value="Login"
                        onClick={this.onSubmit}
                      />
                      <span className="align-bottom float-right mr-3">
                        <label className="text-white">
                          Forgot Password?&nbsp;
                        </label>
                        <Link
                          to="/password"
                          style={{
                            fontSize: 15,
                            color: "#11c5d9",
                            // borderBottom: "1px solid #11c5d9",
                          }}
                        >
                          Click Here
                        </Link>
                      </span>
                    </div>
                    {errors.msg && (
                      <div className="form-group">
                        <label className="alert alert-danger">
                          {errors.msg}
                        </label>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
