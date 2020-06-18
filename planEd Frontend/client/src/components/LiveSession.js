import React, { Component } from "react";
import Jitsi from "react-jitsi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VerticalNavbar from "./layout/VerticalNavbar";
import axios from "axios";
import { getLiveSessionList } from "../actions/liveSessionAction";
import Gridview from "./layout/Gridview";
import $ from "jquery";

class LiveSession extends Component {
  constructor() {
    super();
    this.state = {
      room: "",
      name: "",
      call: false,
      password: "",
      studentSession: [],
      deviceWidth: -1,
      deviceHeight: -1,
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated == false) {
      this.props.history.push("/");
    } else {
      //This indicates that teacher has initiated the session.
      if (this.props.auth.user.role == "T") {
        if (typeof this.props.location.aboutProps != "undefined") {
          this.setState({ name: this.props.auth.user.tNm });
          this.setState({ room: this.props.location.aboutProps["room"] });
          this.setState({
            password: this.props.location.aboutProps["password"],
          });
          this.setState({ call: true });

          //Now update the session started, store th activity in activity logger of batch
          let data = {
            sessionId: this.props.location.aboutProps["password"],
          };
          if (Number(this.props.location.aboutProps["joinSession"]) == 0) {
            axios
              .post("https://planed.in/api/teachers/startlivesession", data)
              .then((response) => {
                //Refresh the Teacher Session grid data
                this.props.getLiveSessionList(String(this.props.auth.user.tId));
              });
          }
        }
      } else if (this.props.auth.user.role == "S") {
        //Fetch the sessions for student -- we won't store this in reducer
        //Reason is I want the join button to active as soon as teacher starts session.

        let data = {
          sId: this.props.auth.user.sId,
          insId: this.props.auth.user.insId,
        };

        axios
          .post("https://planed.in/api/common/livesession", data)
          .then((res) => {
            if (res.data.flag == 1) {
              this.setState({ studentSession: res.data.data });
            }
          });
      }

      //Mobile Screen rotation code
      let mql = window.matchMedia("(orientation: portrait)");
      // If there are matches, we're in portrait
      if (mql.matches) {
        // Portrait orientation
        this.setState({ deviceWidth: $(window).width() });
        this.setState({ deviceHeight: $(window).height() });
      } else {
        // Landscape orientation
        this.setState({ deviceWidth: $(window).width() });
        this.setState({ deviceHeight: $(window).height() });
      }

      // Add a media query change listener
      mql.addListener(
        function (m) {
          if (m.matches) {
            // Changed to portrait
            this.setState({ deviceWidth: $(window).width() });
            this.setState({ deviceHeight: $(window).height() });
          } else {
            // Changed to landscape
            this.setState({ deviceWidth: $(window).width() });
            this.setState({ deviceHeight: $(window).height() });
          }
        }.bind(this)
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated == false) {
      this.props.history.push("/");
    }
  }

  StartLiveSession = (room, password) => {
    this.setState({ name: this.props.auth.user.sNm });
    this.setState({ room: room });
    this.setState({
      password: password,
    });
    this.setState({ call: true });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.room && this.state.name) this.setState({ call: true });
  };

  handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.addEventListener("readyToClose", () => {
      // alert(JitsiMeetAPI.getNumberOfParticipants());
      JitsiMeetAPI.dispose();
      this.setState({ call: false });
      //Once call ends refresh page for student
      if (this.props.auth.user.role == "S") {
        window.location.reload();
      }
    });
    JitsiMeetAPI.addEventListener("videoConferenceJoined", () => {
      // console.log($("#leftwatermark"));
    });
    // if (this.props.auth.user.role == "S") {
    JitsiMeetAPI.addEventListener("passwordRequired", () => {
      JitsiMeetAPI.executeCommand("password", this.state.password);
    });
    // }
  };

  render() {
    const { user } = this.props.auth;
    const { studentSession, deviceWidth, deviceHeight } = this.state;
    const TeacherHTML = (
      <h5 style={{ margin: "auto", fontWeight: "bold" }}>
        You can schedule and start live session from Schedule Session option
      </h5>
    );
    const StudentHTML = (
      <div>
        <h3 style={{ margin: "auto", fontWeight: "bold" }}>
          Live Sessions Today
        </h3>
        <div style={{ height: "2rem" }}></div>
        {studentSession.length > 0 && (
          <Gridview
            data={studentSession}
            comp="LiveSession"
            func={this.StartLiveSession}
          ></Gridview>
        )}
      </div>
    );
    return this.state.call ? (
      <div id="liveSession">
        {/* <div className="container-fluid"> */}
        {/* <div className="row"> */}
        {/* <div className="col-sm-2">
              <div className="verticalbar">
                <VerticalNavbar></VerticalNavbar>
              </div>
              <div className="verticalbarextradiv"></div>
            </div> */}
        <div
          // className="col-sm-12"
          style={{ backgroundColor: "#FFFFFF", marginTop: -25 }}
        >
          {/* <div style={{ height: "2rem" }}></div> */}
          <div style={{ height: deviceHeight, width: "100%" }}>
            <Jitsi
              roomName={this.state.room}
              displayName={this.state.name}
              password={this.state.password}
              // loadingComponent={<p>Loading ...</p>}
              containerStyle={{ width: "100%", height: deviceHeight }}
              config={{
                startWithVideoMuted: true,
                liveStreamingEnabled: false,
                fileRecordingsEnabled: false,
                fileRecordingsServiceEnabled: false,
                fileRecordingsServiceSharingEnabled: false,
                disableThirdPartyRequests: true,
                disableRemoteMute: true,
                disableDeepLinking: true,
                enableCalendarIntegration: false,
                // SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                // SHOW_BRAND_WATERMARK: false,
                // SHOW_DEEP_LINKING_IMAGE: false,
                // SHOW_CHROME_EXTENSION_BANNER: false,
              }}
              // interfaceConfig={{
              //   SHOW_PROMOTIONAL_CLOSE_PAGE: false,
              //   SHOW_BRAND_WATERMARK: false,
              //   SHOW_CHROME_EXTENSION_BANNER: false,
              //   SHOW_DEEP_LINKING_IMAGE: false,
              // }}
              onAPILoad={this.handleAPI}
            ></Jitsi>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    ) : (
      <div id="liveSession">
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
              style={{ backgroundColor: "#FFFFFF", marginTop: -25 }}
            >
              <div style={{ height: "2rem" }}></div>
              {user.role == "T" && TeacherHTML}
              {user.role == "S" && StudentHTML}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LiveSession.propTypes = {
  auth: PropTypes.object.isRequired,
  getLiveSessionList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLiveSessionList,
})(LiveSession);
