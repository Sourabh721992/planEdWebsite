import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";

function About() {
  const [deviceWidth, setDeviceWidth] = useState(-1);
  useEffect(() => {
    setDeviceWidth($(window).width());
  });

  const webFrom = (
    <div id="about">
      <div className="conatiner-fluid">
        <div
          // className=".d-flex"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "8rem",
            marginRight: "8rem",
          }}
        >
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <img
                src={require("../images/planEd.png")}
                style={{ height: "3rem" }}
              ></img>
            </div>
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div className="col-xs-12 col-sm-12 text-center">
              <span style={{ height: 10 }}></span>
              <span
                style={{
                  color: "#FFFFFF",
                  // borderBottom: "1px solid #F2F2F2",
                  padding: 10,
                  fontSize: 16,
                }}
              >
                The platform outshining smart all-in-one features and AI powered
                services to digitize coaching institutes and make teaching more
                effective in new era.
              </span>
            </div>
          </div>

          <div
            className="row"
            style={{
              height: "0.8rem",
            }}
          ></div>
          <div
            className="row"
            style={{
              height: "1.5rem",
              borderTop: "1px solid #F2F2F2",
              width: "99.5%",
              marginLeft: "0.1rem",
            }}
          ></div>

          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div className="card" style={{ backgroundColor: "#3a648a" }}>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 28,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Live Sessions</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        padding: 15,
                      }}
                    >
                      End to End encrypted interactive live sessions with HD
                      streaming quality and salient features to provide immersed
                      class like experience
                    </span>
                  </div>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/LiveSession.png")}
                      style={{ height: "8rem" }}
                    ></img>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/UploadContent.png")}
                      style={{ height: "8rem" }}
                    ></img>
                  </div>
                  <div className="col-sm-6 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Free Cloud Storage</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 17,
                        padding: 15,
                      }}
                    >
                      Upload all the important notes, assignments, study
                      materials &amp;, other important documents which students
                      can access anywhere anytime
                    </span>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Activity Logger</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 17,
                        padding: 15,
                      }}
                    >
                      Manage all the batch related activities such as
                      attendance, batch progress &amps;, track all subject
                      chapters/topics on your click.
                    </span>
                  </div>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Activity.png")}
                      style={{ height: "8rem" }}
                    ></img>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Broadcast.svg")}
                      style={{ height: "8rem" }}
                    ></img>
                  </div>
                  <div className="col-sm-6 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Broadcaster</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 17,
                        padding: 15,
                      }}
                    >
                      Convey important information to students anytime with just
                      a simple click. Fast, secure and dependable.
                    </span>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-12 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 28,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Your best companion in these tough times</b>
                    </span>
                  </div>
                </div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Corona.png")}
                      style={{ height: "9rem" }}
                    ></img>
                  </div>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Crowd.png")}
                      style={{ height: "9rem" }}
                    ></img>
                  </div>
                </div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-8 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 17,
                        letterSpacing: 2,
                      }}
                    >
                      Don't let time like these stop you from building bright
                      futures for your students
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Get studies back on track by going online</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="col-sm-12 text-center">
            <span style={{ color: "#11c5d9", fontSize: "30px" }}>
              <b>COMING SOON !!!</b>
            </span>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="col-sm-12 text-center">
            <img
              src={require("../images/planEd.png")}
              style={{ height: "2.5rem" }}
            ></img>{" "}
            &nbsp;
            <span
              style={{ color: "#FFFFFF", fontSize: "1.5rem", padding: "2px" }}
            >
              App
            </span>
            <div className="row" style={{ height: "0.5rem" }}></div>
            <span style={{ fontSize: "17px", color: "#FFFFFF" }}>
              AI powered mobile platform for Android and iOS
            </span>
            &nbsp;
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div>
              <img
                src={require("../images/android_iOS.png")}
                style={{ height: "8rem" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const mobileFrom = (
    <div id="about">
      <div className="conatiner-fluid">
        <div
          // className=".d-flex"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <img
                src={require("../images/planEd.png")}
                style={{ height: "3rem" }}
              ></img>
            </div>
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div className="col-xs-12 col-sm-12 text-center">
              <span style={{ height: 10 }}></span>
              <span
                style={{
                  color: "#FFFFFF",
                  // borderBottom: "1px solid #F2F2F2",
                  padding: 2,
                  fontSize: 10,
                }}
              >
                The platform outshining smart all-in-one features and AI powered
                services to digitize coaching institutes and make teaching more
                effective in new era.
              </span>
            </div>
          </div>

          <div
            className="row"
            style={{
              height: "0.8rem",
            }}
          ></div>
          <div
            className="row"
            style={{
              height: "1.5rem",
              borderTop: "1px solid #F2F2F2",
              width: "99.5%",
              marginLeft: "0.1rem",
            }}
          ></div>

          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <div className="card" style={{ backgroundColor: "#3a648a" }}>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="text-center" style={{ width: "60%" }}>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Live Sessions</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        padding: 5,
                      }}
                    >
                      End to End encrypted interactive live sessions with HD
                      streaming quality and salient features to provide immersed
                      class like experience
                    </span>
                  </div>
                  <div className="text-center" style={{ width: "40%" }}>
                    <img
                      src={require("../images/LiveSession.png")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="text-center" style={{ width: "40%" }}>
                    <img
                      src={require("../images/UploadContent.png")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                  <div className="text-center" style={{ width: "60%" }}>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Free Cloud Storage</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        padding: 15,
                      }}
                    >
                      Upload all the important notes, assignments, study
                      materials &amp;, other important documents which students
                      can access anywhere anytime
                    </span>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="text-center" style={{ width: "60%" }}>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Activity Logger</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        padding: 15,
                      }}
                    >
                      Manage all the batch related activities such as
                      attendance, batch progress &amps;, track all subject
                      chapters/topics on your click.
                    </span>
                  </div>
                  <div className="text-center" style={{ width: "40%" }}>
                    <img
                      src={require("../images/Activity.png")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="text-center" style={{ width: "40%" }}>
                    <img
                      src={require("../images/Broadcast.svg")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                  <div className="text-center" style={{ width: "60%" }}>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Broadcaster</b>
                    </span>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        padding: 15,
                      }}
                    >
                      Convey important information to students anytime with just
                      a simple click. Fast, secure and dependable.
                    </span>
                  </div>
                </div>
                <div className="row" style={{ height: "1.5rem" }}></div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-12 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Your best companion in these tough times</b>
                    </span>
                  </div>
                </div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Corona.png")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                  <div className="col-sm-6 text-center">
                    <img
                      src={require("../images/Crowd.png")}
                      style={{ height: "4rem" }}
                    ></img>
                  </div>
                </div>
                <div className="d-flex" style={{ padding: "1.2rem" }}>
                  {/* <div className="col-sm-2"></div> */}
                  <div className="col-sm-12 text-center">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 12,
                        letterSpacing: 2,
                      }}
                    >
                      Don't let time like these stop you from building bright
                      futures for your students
                    </span>
                    <br></br>
                    <br></br>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        letterSpacing: 2,
                      }}
                    >
                      <b>Get studies back on track by going online</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="col-sm-12 text-center">
            <span style={{ color: "#11c5d9", fontSize: "30px" }}>
              <b>COMING SOON !!!</b>
            </span>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="col-sm-12 text-center">
            <img
              src={require("../images/planEd.png")}
              style={{ height: "2.5rem" }}
            ></img>{" "}
            &nbsp;
            <span
              style={{ color: "#FFFFFF", fontSize: "1.5rem", padding: "2px" }}
            >
              App
            </span>
            <div className="row" style={{ height: "0.5rem" }}></div>
            <span style={{ fontSize: "12px", color: "#FFFFFF" }}>
              AI powered mobile platform for Android and iOS
            </span>
            &nbsp;
            <div className="row" style={{ height: "1.5rem" }}></div>
            <div>
              <img
                src={require("../images/android_iOS.png")}
                style={{ height: "6rem" }}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <code>
      {deviceWidth > 600 && webFrom}
      {deviceWidth <= 600 && mobileFrom}
    </code>
  );
}

export default About;
