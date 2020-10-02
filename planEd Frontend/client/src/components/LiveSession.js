import React, { Component } from "react";
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
      api: null,
    };
    this.onChange = this.onChange.bind(this);
    this.EndCall = this.EndCall.bind(this);
    this.handleClick.bind(this);
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
      //This indicates that teacher has initiated the session.
      if (this.props.auth.user.role == "T") {
        if (typeof this.props.location.aboutProps != "undefined") {
          //Loading Jitsi Meet Script
          const script = document.createElement("script");
          script.src = "https://meet.jit.si/external_api.js";
          script.async = true;
          script.onload = () => this.scriptLoaded();
          document.body.appendChild(script);

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

  scriptLoaded() {
    const domain = "meet.jit.si";
    const options = {
      roomName: this.state.room,
      width: "100%",
      height: this.state.deviceHeight - 70,
      parentNode: document.querySelector("#meet"),
      userInfo: {
        displayName: this.state.name,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          // "embedmeeting",
          "fullscreen",
          "fodeviceselection",
          // "hangup",
          // "profile",
          "chat",
          "recording",
          "livestreaming",
          "etherpad",
          // "sharedvideo",
          //"settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          //"invite",
          "feedback",
          "stats",
          //"shortcuts",
          "tileview",
          //"videobackgroundblur",
          "download",
          //"help",
          "mute-everyone",
          // "security",
        ],
        DEFAULT_REMOTE_DISPLAY_NAME: this.state.name,
        SHOW_PROMOTIONAL_CLOSE_PAGE: true,
      },
      configOverwrite: {
        enableNoAudioDetection: true,
        enableNoisyMicDetection: true,
        startWithVideoMuted: false,
        fileRecordingsEnabled: false,
        liveStreamingEnabled: false,
        disableThirdPartyRequests: true,
        disableRemoteMute: true,
        disableDeepLinking: true,
        enableCalendarIntegration: false,
      },
    };
    this.state.api = new window.JitsiMeetExternalAPI(domain, options);

    // this.state.api.executeCommand("displayName", this.state.name);

    this.state.api.on("readyToClose", () => {
      this.state.api.dispose();
      this.setState({ call: false });
      //Once call ends refresh page for student
      if (this.props.auth.user.role == "S") {
        window.location.reload();
      }
    });

    // if (this.props.auth.user.role == "S") {
    //   this.state.api.addEventListener("passwordRequired", () => {
    //     this.state.api.executeCommand("password", this.state.password);
    //   });

    //   // when local user has joined the video conference
    //   this.state.api.addEventListener("videoConferenceJoined", (response) => {
    //     this.state.api.executeCommand("password", this.state.password);
    //   });
    // } else {
    //   setTimeout(() => {
    //     this.state.api.addEventListener("passwordRequired", () => {
    //       this.state.api.executeCommand("password", this.state.password);
    //     });

    //     // when local user has joined the video conference
    //     this.state.api.addEventListener("videoConferenceJoined", (response) => {
    //       this.state.api.executeCommand("password", this.state.password);
    //     });
    //   }, 10);
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated == false) {
      let loginUrl = this.props.loginUrl.url.toString();
      if (loginUrl.indexOf("login") > -1) {
        this.props.history.push(loginUrl);
      } else {
        this.props.history.push("/default");
      }
    }
  }

  EndCall() {
    if (this.state.api != null) {
      this.state.api.dispose();
      if (this.props.auth.user.role == "T") {
        this.props.history.push("/teacher");
      } else this.props.history.push("/student");
    }
  }

  componentWillUnmount() {
    if (this.state.api != null) {
      this.state.api.dispose();

      //Once call ends refresh page for student
      //if (this.props.auth.user.role == "S") {
      //window.location.reload();
      //}
    }
  }

  StartLiveSession = (room, password) => {
    this.setState({ name: this.props.auth.user.sNm });
    this.setState({ room: room });
    this.setState({
      password: password,
    });
    this.setState({ call: true });

    //Loading Jitsi Meet Script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.room && this.state.name) this.setState({ call: true });
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
        {studentSession.length == 0 && (
          <span className="alert alert-info">
            No live sessions exist as of now.
          </span>
        )}
      </div>
    );
    const StudentJitsiHTML = <div id="meet"></div>;
    const TeacherJitsiHTML = <div id="meet"></div>;

    return this.state.call ? (
      <div id="liveSession">
        <div style={{ backgroundColor: "#FFFFFF", marginTop: -25 }}>
          <div style={{ height: deviceHeight, width: "100%" }}>
            {user.role == "T" && TeacherJitsiHTML}
            {user.role == "S" && StudentJitsiHTML}
          </div>
        </div>
        <div>
          <input
            type="submit"
            name="submit"
            // className="btn btn-info btn-md"
            value="End Call"
            style={{
              marginTop: 0 - this.state.deviceHeight - 52,
              marginLeft: this.state.deviceWidth - 350,
              position: "absolute",
              color: "red",
              backgroundColor: "transparent",
              zIndex: 999,
              borderColor: "red",
              borderRadius: "1rem",
              padding: "10px",
              letterSpacing: "0.1rem",
              borderWidth: "1px",
              borderColor: "red",
              fontWeight: "bold",
            }}
            onClick={this.EndCall}
          />
        </div>
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
  loginUrl: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loginUrl: state.loginUrl,
});

export default connect(mapStateToProps, {
  getLiveSessionList,
})(LiveSession);
