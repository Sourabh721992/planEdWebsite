import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VerticalNavbar from "./layout/VerticalNavbar";
import Gridview from "./layout/Gridview";
import { GetCurrentDate } from "../Common";
import $ from "jquery";

class StudentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      currentDate: "",
      deviceWidth: -1,
    };
  }
  componentDidMount() {
    if (
      this.props.auth.isAuthenticated == false ||
      this.props.auth.user.role.search("S") < 0
    ) {
      this.props.history.push("/");
    } else {
      GetCurrentDate().then((date) => {
        this.setState({ currentDate: date });
      });
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
    if (
      props.auth.isAuthenticated == false ||
      props.auth.user.role.search("S") < 0
    ) {
      props.history.push("/");
    } else {
    }
    return null;
  }

  render() {
    const { user } = this.props.auth;
    const { currentDate, deviceWidth } = this.state;

    const noClassExistToday = (
      <h6 className="card-subtitle mb-2 text-muted">
        <br></br>
        You don't have classes today.
      </h6>
    );
    const classExistToday = (
      <Gridview data={user.studentTodayClasses}></Gridview>
    );

    const liveSessionExistToday = (
      <Gridview data={user.studentTodaySessions}></Gridview>
    );
    const noLiveSessionExistToday = (
      <h6 className="card-subtitle mb-2 text-muted">
        <br></br>
        You don't have live sessions today.
      </h6>
    );
    return (
      <div id="student">
        <div className="container-fluid">
          <div className="row">
            <div id="verticalMenu" className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar deviceWidth={deviceWidth}></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div>
            <div
              className="col-sm-10"
              style={{ backgroundColor: "#F2F2F2", marginTop: -25 }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <h3 style={{ marginTop: 15 }}>
                      {user.sNm} - {user.insNm}
                    </h3>
                  </div>
                  <div
                    className="col-sm-6"
                    style={{ textAlign: "right", marginTop: 15 }}
                  >
                    <h5>{deviceWidth > 600 && currentDate}</h5>
                  </div>
                </div>

                <div
                  className="row"
                  style={{
                    height: 20,
                  }}
                >
                  <hr className="divider"></hr>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div
                      className="card"
                      style={{ backgroundColor: "#C4F9FF" }} //#FF8AF9
                    >
                      <div className="card-body">
                        <h5 className="card-title"> {user.batchCount}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Current Batches
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div
                      className="card"
                      style={{ backgroundColor: "#B3E8DF" }} //FFEA96
                    >
                      <div className="card-body">
                        <h5 className="card-title">{user.studentCount}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Classmates
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div
                      className="card"
                      style={{ backgroundColor: "#D1FFEA" }} //BC7DFF
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {this.props.auth.isAuthenticated == true
                            ? user.studentTodayClasses.length
                            : 0}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Classes Today
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div
                      className="card"
                      style={{ backgroundColor: "#B3E8C1" }} //94FF63
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {this.props.auth.isAuthenticated == true
                            ? user.studentTodaySessions.length
                            : 0}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Live Sessions Today
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ height: 20 }}></div>
                <div className="row">
                  <div className="col-sm-6">
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#829FD9",
                        overflow: "auto",
                        height: 200,
                      }}
                    >
                      <div className="card-body">
                        <h5 id="h5TodaySchedule" className="card-title">
                          {" "}
                          Today's Schedule
                        </h5>
                        {this.props.auth.isAuthenticated == true
                          ? user.studentTodayClasses.length > 0
                            ? classExistToday
                            : noClassExistToday
                          : noClassExistToday}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#82B8D9",
                        overflow: "auto",
                        height: 200,
                      }}
                    >
                      <div className="card-body">
                        <h5 id="h5TodaySchedule" className="card-title">
                          {" "}
                          Live Sessions
                        </h5>
                        {this.props.auth.isAuthenticated == true
                          ? user.studentTodaySessions.length > 0
                            ? liveSessionExistToday
                            : noLiveSessionExistToday
                          : noLiveSessionExistToday}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ height: 20 }}></div>
                <div className="row">
                  <div className="col-sm-12">
                    {this.props.auth.isAuthenticated == true ? (
                      <Gridview data={user.studentBatches}></Gridview>
                    ) : (
                      "No Data"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(StudentDashboard);
