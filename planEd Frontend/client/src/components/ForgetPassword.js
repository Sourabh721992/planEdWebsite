import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [mobile, setMobile] = useState("");
  const [sendOtp, setSendOtpFlag] = useState(-1);
  const [otpReceived, setOtpReceivedFlag] = useState(0);
  const [otp, setOtp] = useState("");
  const [errors, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [responseId, setResponseId] = useState("");
  const [deviceWidth, setDeviceWidth] = useState(-1);
  const [emailPresent, setEmailPresent] = useState(-1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setDeviceWidth($(window).width());
  });

  const SaveEmail = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorMsg("Request you to enter Email.");
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      let data = {
        cNo: mobile,
        email: email,
      };
      //Update email Address of user
      axios
        .post("https://planed.in/api/users/updateemail", data)
        .then((response) => {
          if (response.data.flag == 1) {
            SendOTP(e);
          } else {
            setErrorMsg(response.data.msg);
          }
        });
    } else {
      setErrorMsg("Request you to enter valid Email.");
    }
  };
  const SendOTP = (e) => {
    e.preventDefault();
    if (/^\d{10}$/.test(mobile)) {
      //Post axios request for OTP
      let cNo = {
        cNo: mobile,
      };
      axios
        .post("https://planed.in/api/users/forgetpasswordotp", cNo)
        .then((response) => {
          if (response.data.flag == 1) {
            $("#password-box").height(480);
            setErrorMsg("");
            setSendOtpFlag(1);
            setOtpReceivedFlag(1);
            setResponseId(response.data.id);
            setEmailPresent(1);
          } else {
            if (response.data.msg.includes("Email")) {
              //Ask for Email Id
              setSendOtpFlag(0);
              setEmailPresent(0);
            } else {
              setErrorMsg(response.data.msg);
            }
          }
        });
    } else {
      setErrorMsg("Request you to enter registered mobile number");
    }
  };

  const ResendOTP = (e) => {
    e.preventDefault();
    let data = {
      id: responseId,
    };
    axios
      .post("https://planed.in/api/users/resendforgetpasswordotp", data)
      .then((response) => {
        if (response.data.flag == 1) {
          setResponseId(response.data.id);
          alert(response.data.msg);
        } else {
          setErrorMsg(response.data.msg);
        }
      });
  };

  const VerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "") {
      setErrorMsg("Request you to enter OTP");
      return;
    } else if (otp.length !== 4) {
      setErrorMsg("Request to enter 4 digit OTP number");
      return;
    } else if (password === "") {
      setErrorMsg("Request you to enter password");
      return;
    } else if (confirmPassword === "") {
      setErrorMsg("Request you to enter confirm password");
      return;
    } else if (password !== confirmPassword) {
      setErrorMsg("Confirm password should match with Password");
      return;
    } else {
      let changePasswordData = {
        id: responseId,
        pwd: password,
        otp: otp,
      };
      axios
        .post("https://planed.in/api/users/resetpassword", changePasswordData)
        .then((response) => {
          if (response.data.flag == 1) {
            alert(response.data.msg);
            setErrorMsg("");
            window.location.href = "https://planed.in";
          } else {
            setErrorMsg(response.data.msg);
          }
          setOtp("");
          setPassword("");
          setConfirmPassword("");
        });
    }
  };
  const emailNotPresent = (
    <div>
      <h3 id="passwordHeading" className="text-center  text-white">
        Enter Email Address
      </h3>
      <div className="form-group">
        <label className="text-white">Email</label>
        <br />
        <div className="input-icons">
          <i className="fas fa-envelope icon"></i>
          <input
            type="text"
            className="form-control form-control-lg input-field"
            placeholder="Request you to enter Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          name="submit"
          className="btn btn-info btn-md"
          value="Save Email"
          onClick={SaveEmail}
        />
      </div>
    </div>
  );
  const WebOtpNotSend = (
    <div>
      <h3 id="passwordHeading" className="text-center  text-white">
        Forgot Password
      </h3>
      <div className="form-group">
        <label className="text-white">Mobile Number</label>
        <br />
        <div className="input-icons">
          <i className="fas fa-mobile icon"></i>
          <input
            type="number"
            className="form-control form-control-lg input-field"
            placeholder="Request you to enter Mobile Number"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          name="submit"
          className="btn btn-info btn-md"
          value="Send OTP"
          onClick={SendOTP}
        />
      </div>
    </div>
  );

  const WebOtpReceivedHtml = (
    <div>
      <h3 id="passwordHeading" className="text-center  text-white">
        Change Password
      </h3>

      <div className="form-group">
        <label className="text-white"> OTP </label>
        <br />
        <div className="input-icons">
          <i className="fas fa-key icon"></i>
          <input
            type="number"
            className="form-control form-control-lg input-field"
            placeholder="Request you to enter OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="text-white">New Password</label>
        <br />
        <div className="input-icons">
          <i className="fas fa-key icon"></i>
          <input
            type="password"
            className="form-control form-control-lg input-field"
            placeholder="Request you to enter new password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="text-white">Confirm Password</label>
        <br />
        <div className="input-icons">
          <i className="fas fa-key icon"></i>
          <input
            type="password"
            className="form-control form-control-lg input-field"
            placeholder="Request you to enter password again"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="submit"
          name="submit"
          className="btn btn-info btn-md"
          value="Change Password"
          onClick={VerifyOtp}
        />
        <span className="align-bottom float-right mr-3">
          <Link
            style={{
              fontSize: 18,
              color: "#11c5d9",
              // borderBottom: "1px solid #11c5d9",
            }}
            onClick={ResendOTP}
          >
            Resend OTP
          </Link>
        </span>
      </div>
      <div style={{ height: "0.2rem" }}></div>
      <div className="form-group">
        <span id="passwordNote" className="alert alert-info">
          Request you to check OTP on your registered Email Id.
        </span>
      </div>
    </div>
  );
  return (
    <div className="passwordboard">
      <div id="password">
        <div className="container">
          <div
            id="password-row"
            className="row justify-content-center align-items-center"
          >
            <div id="password-column" className="col-sm-6">
              <div id="password-box" className="col-sm-12">
                <form
                  id="password-form"
                  className="form"
                  action=""
                  method="post"
                >
                  {sendOtp == -1 && WebOtpNotSend}
                  {otpReceived == 1 && WebOtpReceivedHtml}
                  {emailPresent == 0 && emailNotPresent}

                  {errors && (
                    <div className="form-group">
                      <label className="alert alert-danger">{errors}</label>
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

export default ForgetPassword;
