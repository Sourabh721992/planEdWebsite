import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";

function Website() {
  const [deviceWidth, setDeviceWidth] = useState(-1);
  const [deviceHeight, setDeviceHeight] = useState(-1);
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setDeviceWidth($(window).width());
    //Mobile Screen rotation code
    let mql = window.matchMedia("(orientation: portrait)");
    // If there are matches, we're in portrait
    if (mql.matches) {
      // Portrait orientation
      setDeviceWidth($(window).width());
      setDeviceHeight($(window).height());
    } else {
      // Landscape orientation
      setDeviceWidth($(window).width());
      setDeviceHeight($(window).height());
    }

    // Add a media query change listener
    mql.addListener(
      function (m) {
        if (m.matches) {
          // Changed to portrait
          setDeviceWidth($(window).width());
          setDeviceHeight($(window).height());
        } else {
          // Changed to landscape
          setDeviceWidth($(window).width());
          setDeviceHeight($(window).height());
        }
      }.bind(this)
    );

    window.addEventListener("resize", () => {
      setDeviceWidth($(window).width());
      setDeviceHeight($(window).height());
    });
  });

  const onSubmit = (e) => {
    e.preventDefault();
    let objQuery = {
      nm: name,
      cNo: contactNo,
      email: email,
      query: query,
    };

    axios.post("https://planed.in/api/common/query", objQuery).then((res) => {
      alert(res.data.msg);
      setName("");
      setEmail("");
      setContactNo("");
      setQuery("");
    });
  };

  const webForm = (
    <div id="website" className="flex" style={{ width: deviceWidth }}>
      <div id="divDescription" className="row">
        <div className="col-sm-12" style={{ display: "flex" }}>
          <div className="col-sm-11">
            <img
              id="mainBG_img"
              src={require("../images/website/mainImg.png")}
              alt="mainBG_img"
              style={{
                width: (deviceWidth * 9) / 10,
                height: (deviceHeight * 7) / 10,
                marginLeft: "-20px",
              }}
            ></img>
          </div>
          <div className="col-sm-1">
            <div id="divFb">
              <a href="https://www.facebook.com/planEd2.0" target="_blank">
                <img
                  src={require("../images/fb.png")}
                  style={{
                    height: "30px",
                    backgroundColor: "transparent",
                    marginTop: "150px",
                  }}
                ></img>
              </a>
            </div>
            <div id="divLinkedin">
              <a href="#" target="_blank">
                <img
                  src={require("../images/linkedin.png")}
                  style={{
                    height: "30px",
                    backgroundColor: "transparent",
                    marginTop: "20px",
                  }}
                ></img>
              </a>
            </div>
            <div id="divTwitter">
              <a href="#" target="_blank">
                <img
                  src={require("../images/twitter.png")}
                  style={{
                    height: "30px",
                    backgroundColor: "transparent",
                    marginTop: "20px",
                  }}
                ></img>
              </a>
            </div>
          </div>
        </div>
        <div
          id="divPlanEdDescription"
          style={{
            marginLeft: (deviceWidth * 2) / 5,
            height: "auto",
            width: (deviceWidth * 2.3) / 5,
            marginTop: (deviceHeight * 2) / 5,
            backgroundColor: "white",
          }}
        >
          <label id="lblAIPowered">
            AI Powered platform for Education Academies
          </label>
          <div>
            <label id="lblDescription">
              PlanEd enables educational academies to cut on ancillary
              activities, and help them to manage administration work digitally
            </label>
          </div>
        </div>
      </div>
      <div id="divServiceStart"></div>
      <div id="divServices" className="row">
        <div
          id="blueRectangle"
          className="row"
          style={{
            width: deviceWidth,
            height: "auto",
            marginTop: "120px",
          }}
        >
          <label className="col-sm-12" id="OurServices">
            Our Services
          </label>
          <div className="col-sm-12">
            <label id="lblServices">
              Our fully functional app comes with all the requisite features as
              standard
            </label>
          </div>
        </div>
        <div
          className="container row"
          style={{ width: deviceWidth, display: "flex" }}
        >
          <div className="col-sm-2"></div>
          <div className="col-sm-2 divServiceBox" style={{ marginTop: -30 }}>
            <label className="lblService">Attendance & Test Management</label>
            <div>
              <label className="lblServiceDescription">
                Manage Attendance, take tests, create a performance report and
                Track student progress
              </label>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-2 divServiceBox" style={{ marginTop: -30 }}>
            <label className="lblService">Fees Bot</label>
            <div>
              <label className="lblServiceDescription">
                Get notified regularly about Due fees and fees submitted
              </label>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-2 divServiceBox" style={{ marginTop: -30 }}>
            <label className="lblService">Cloud Storage</label>
            <div>
              <label className="lblServiceDescription">
                Large expandable Cloud Space for assignments and other
                educational resources
              </label>
            </div>
          </div>
        </div>
        <div className="container row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div
          className="container row"
          style={{ width: deviceWidth, display: "flex" }}
        >
          <div className="col-sm-2"></div>
          <div className="divServiceBox col-sm-2">
            <label className="lblService">Live Sessions</label>
            <div>
              <label className="lblServiceDescription">
                Web Based Live sessions in Ultra High definition with all ZOOM
                like features
              </label>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="divServiceBox col-sm-2">
            <label className="lblService ">Real-time Admin Dashboard</label>
            <div>
              <label className="lblServiceDescription">
                Revenue Analysis and control of all the important activities,
                embedded in a single Dashboard
              </label>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="divServiceBox col-sm-2">
            <label className="lblService">AI Driven Analysis</label>
            <div>
              <label className="lblServiceDescription">
                Performance assessment Engine which provide deep insight of each
                students progress
              </label>
            </div>
          </div>
        </div>
      </div>
      <div id="divAppStart" style={{ height: "5rem" }}></div>
      <div id="divAppInfo" className="row">
        <div
          style={{
            width: deviceWidth,
            height: "auto",
            padding: "30px",
            backgroundColor: "rgb(35,41,112)",
            display: "flex",
          }}
          className="col-sm-12"
        >
          <div className="col-sm-8" style={{ marginTop: "30px" }}>
            <img
              id="mainBG_img"
              src={require("../images/website/app.png")}
              alt="mainBG_img"
              style={{
                width: "80%",
                // marginRight: "50px",
                marginLeft: "50px",
                backgroundColor: "transparent",
                height: (deviceHeight * 3) / 5,
              }}
            ></img>
          </div>
          <div
            className="col-sm-4"
            style={{
              textAlign: "center",
            }}
          >
            <label
              id="lblAppBrief"
              style={{
                marginTop: (deviceHeight * 3) / 10 - 10,
                marginLeft: "0",
                marginRight: "50px",
              }}
            >
              Manage your education Institute Easily & Efficiently
            </label>
          </div>
        </div>
      </div>
      <div id="divConatctStart" style={{ height: "5rem" }}></div>
      <div id="divContact" style={{ textAlign: "center" }}>
        <div id="divContactHd">
          <label
            id="lblContactHd"
            style={{
              color: "rgb(15,97,128)",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            Interested?
          </label>
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "2rem" }}
          >
            &nbsp;Request A Demo
          </label>
        </div>
        <div id="" style={{ height: "2rem" }}></div>
        <div id="divContactForm" style={{ display: "flex" }}>
          <div id="divForm" style={{ width: "50%", marginTop: "20px" }}>
            <div
              style={{ marginLeft: "auto", marginRight: "auto", width: "80%" }}
            >
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your name"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setContactNo(e.target.value)}
                  value={contactNo}
                  required
                  placeholder="Enter your contact number"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="email"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="Enter your email address"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <textarea
                  className="form-control rounded-1"
                  name="description"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  placeholder="Write your message here"
                  rows="3"
                  required
                  style={{ fontSize: 14 }}
                ></textarea>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md"
                  value="Send Message"
                />
              </div>
            </div>
          </div>
          <div id="divFormImg" style={{ width: "50%" }}>
            <img
              id="imgHelp"
              src={require("../images/Help.png")}
              alt="Help"
              style={{
                width: (deviceWidth * 2) / 10,
                height: (deviceHeight * 5.5) / 10,
              }}
            ></img>
          </div>
          <div style={{ height: "6rem" }}></div>
        </div>
        <div style={{ height: "6rem" }}></div>
      </div>
    </div>
  );
  const mobileForm = (
    <div id="website" className="flex" style={{ width: deviceWidth }}>
      <div id="divDescription" className="row">
        <div className="col-sm-12" style={{ display: "flex" }}>
          <div className="col-sm-11">
            <img
              id="mainBG_img"
              src={require("../images/website/mainImg.png")}
              alt="mainBG_img"
              style={{
                width: (deviceWidth * 9) / 10,
                height: (deviceHeight * 4) / 10,
                marginLeft: "-20px",
              }}
            ></img>
          </div>
          <div className="col-sm-1">
            <div id="divFb">
              <a href="https://www.facebook.com/planEd2.0" target="_blank">
                <img
                  src={require("../images/fb.png")}
                  style={{
                    height: "20px",
                    backgroundColor: "transparent",
                    marginTop: "110px",
                    marginLeft: "-20px",
                  }}
                ></img>
              </a>
            </div>
            <div id="divLinkedin">
              <a href="#" target="_blank">
                <img
                  src={require("../images/linkedin.png")}
                  style={{
                    height: "20px",
                    backgroundColor: "transparent",
                    marginTop: "20px",
                    marginLeft: "-20px",
                  }}
                ></img>
              </a>
            </div>
            <div id="divTwitter">
              <a href="#" target="_blank">
                <img
                  src={require("../images/twitter.png")}
                  style={{
                    height: "20px",
                    backgroundColor: "transparent",
                    marginTop: "20px",
                    marginLeft: "-20px",
                  }}
                ></img>
              </a>
            </div>
          </div>
        </div>
        <div
          id="divPlanEdDescription"
          style={{
            marginLeft: (deviceWidth * 2) / 5,
            height: "auto",
            width: (deviceWidth * 2.3) / 5,
            marginTop: (deviceHeight * 1) / 5,
            backgroundColor: "white",
          }}
        >
          <label id="lblAIPoweredMobile">
            AI Powered platform for Education Academies
          </label>
          <div>
            <label id="lblDescriptionMobile">
              PlanEd enables educational academies to cut on ancillary
              activities, and help them to manage administration work digitally
            </label>
          </div>
        </div>
      </div>
      <div id="divServiceStart"></div>
      <div id="divServices" className="row">
        <div
          id="blueRectangle"
          className="row"
          style={{
            width: "105%",
            height: "auto",
            marginTop: "120px",
          }}
        >
          <label className="col-sm-12" id="OurServicesMobile">
            Our Services
          </label>
          <div className="col-sm-12">
            <label id="lblServicesMobile">
              Our fully functional app comes with all the requisite features as
              standard
            </label>
          </div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="col-sm-12 divServiceBox" style={{ marginTop: -30 }}>
            <label className="lblService">Attendance & Test Management</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Manage Attendance, take tests, create a performance
                report and Track student progress
              </label>
            </div>
          </div>
        </div>
        <div className="flex row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="col-sm-12 divServiceBox">
            <label className="lblService">Fees Bot</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Get notified regularly about Due fees and fees
                submitted
              </label>
            </div>
          </div>
        </div>
        <div className="flex row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="col-sm-12 divServiceBox">
            <label className="lblService">Cloud Storage</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Large expandable Cloud Space for assignments and
                other educational resources
              </label>
            </div>
          </div>
        </div>
        <div className="flex row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="divServiceBox col-sm-12">
            <label className="lblService">Live Sessions</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Web Based Live sessions in Ultra High definition
                with all ZOOM like features
              </label>
            </div>
          </div>
        </div>
        <div className="flex row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="divServiceBox col-sm-12">
            <label className="lblService ">Real-time Admin Dashboard</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Revenue Analysis and control of all the important
                activities, embedded in a single Dashboard
              </label>
            </div>
          </div>
        </div>
        <div className="flex row">
          <div className="col-sm-12" style={{ height: "3rem" }}></div>
        </div>
        <div className="flex row" style={{ width: "105%", display: "flex" }}>
          <div className="divServiceBox col-sm-12">
            <label className="lblService">AI Driven Analysis</label>
            <div>
              <label className="lblServiceDescription">
                &nbsp;&nbsp;Performance assessment Engine which provide deep
                insight of each students progress
              </label>
            </div>
          </div>
        </div>
      </div>
      <div id="divAppStart" style={{ height: "5rem" }}></div>
      <div id="divAppInfo" className="row">
        <div
          style={{
            width: "105%",
            // height: "auto",
            padding: "30px",
            backgroundColor: "rgb(35,41,112)",
            display: "flex",
          }}
          className="col-sm-12"
        >
          <div className="col-sm-9" style={{ marginTop: "30px" }}>
            <img
              id="mainBG_img"
              src={require("../images/website/app.png")}
              alt="mainBG_img"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                height: "100%",
              }}
            ></img>
          </div>
          <div
            className="col-sm-3"
            style={{
              textAlign: "center",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <label
              id="lblAppBriefMobile"
              style={{
                marginRight: "50px",
                width: "100%",
              }}
            >
              Manage your education Institute Easily & Efficiently
            </label>
          </div>
        </div>
      </div>
      <div id="divConatctStart" style={{ height: "5rem" }}></div>
      <div id="divContact" style={{ textAlign: "center" }}>
        <div id="divContactHd">
          <label
            id="lblContactHd"
            style={{
              color: "rgb(15,97,128)",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Interested?
          </label>
          <label
            style={{ color: "black", fontWeight: "bold", fontSize: "1rem" }}
          >
            &nbsp;Request A Demo
          </label>
        </div>
        <div id="" style={{ height: "2rem" }}></div>
        <div id="divContactForm" style={{ display: "flex" }}>
          <div id="divForm" style={{ width: "100%", marginTop: "20px" }}>
            <div
              style={{ marginLeft: "auto", marginRight: "auto", width: "95%" }}
            >
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your name"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setContactNo(e.target.value)}
                  value={contactNo}
                  required
                  placeholder="Enter your contact number"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="text"
                  name="email"
                  className="form-control form-control-lg"
                  style={{
                    fontSize: 14,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="Enter your email address"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <textarea
                  className="form-control rounded-1"
                  name="description"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  placeholder="Write your message here"
                  rows="3"
                  required
                  style={{ fontSize: 14 }}
                ></textarea>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md"
                  value="Send Message"
                />
              </div>
            </div>
          </div>

          <div style={{ height: "6rem" }}></div>
        </div>
        <div style={{ height: "6rem" }}></div>
      </div>
    </div>
  );
  return (
    <code>
      <form onSubmit={onSubmit}>
        {deviceWidth > 1000 && webForm}
        {deviceWidth <= 1000 && mobileForm}
      </form>
    </code>
  );
}

export default Website;
