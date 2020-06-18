import React, { Component } from "react";
import $ from "jquery";
import axios from "axios";
// import "datatables.net-bs4";
import DataTable from "datatables.net";
import { Link } from "react-router-dom";

class Gridview extends Component {
  constructor() {
    super();
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }

  componentDidMount() {
    if (
      this.props.comp === "Content" ||
      this.props.comp === "Message" ||
      this.props.comp === "Session" ||
      this.props.comp === "LiveSession"
    )
      $("#info").DataTable({
        lengthMenu: [
          [5, 10, 15],
          [5, 10, 15],
        ],
        ordering: false,
      });
  }

  getKeys = function () {
    return Object.keys(this.props.data[0]);
  };

  getHeader = function () {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      if (this.props.comp == "Content") {
        if (key == "Path")
          return (
            <th key={key} style={{ display: "none" }}>
              {key.toUpperCase()}
            </th>
          );
      } else if (this.props.comp == "Session") {
        if (key == "sessionId")
          return (
            <th key={key} style={{ display: "none" }}>
              {key.toUpperCase()}
            </th>
          );
      } else if (this.props.comp == "LiveSession") {
        if (key == "sessionId")
          return (
            <th key={key} style={{ display: "none" }}>
              {key.toUpperCase()}
            </th>
          );
      }
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  getRowsData = function () {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow
            key={index}
            data={row}
            keys={keys}
            comp={this.props.comp}
            func={this.props.func}
          />
        </tr>
      );
    });
  };

  render() {
    return (
      <div id="gridview" className="table-responsive">
        <table className="table table-striped table-hover" id="info">
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

const RenderRow = (props) => {
  return props.keys.map((key, index) => {
    if (key == "File") {
      return (
        <td key={index}>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              // display: "inline",
              minWidth: "13rem",
              maxWidth: "13rem",
              minHeight: "1rem",
              maxHeight: "2rem",
              backgroundColor: "#1d3b80",
              fontSize: "0.9rem",
            }}
            onClick={DownloadFile(props.data["Path"])}
            title={"Click here to download file " + props.data[key]}
          >
            {props.data[key]}{" "}
          </button>
        </td>
      );
    } else if (key == "Path") {
      return (
        <td key={index} style={{ display: "none" }}>
          {props.data[key]}
        </td>
      );
    } else if (key == "sessionId" && props.comp == "Session") {
      return (
        <td key={index} style={{ display: "none" }}>
          {props.data[key]}
        </td>
      );
    } else if (key == "Action" && props.comp == "Session") {
      //check whether we have surprassed end time for the day
      let dt = new Date();
      let time = dt.getHours() + ":" + dt.getMinutes();
      let nowMinutes = getTimeAsNumberOfMinutes(time);
      let endMinutes = getTimeAsNumberOfMinutes(
        String(props.data["Timings"].split("-")[1]).trim()
      );
      let startMinutes = getTimeAsNumberOfMinutes(
        String(props.data["Timings"].split("-")[0]).trim()
      );
      if (endMinutes < nowMinutes && props.data[key] == false) {
        return (
          <td key={index}>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                // display: "inline",
                minWidth: "10rem",
                maxWidth: "10rem",
                minHeight: "1rem",
                maxHeight: "2rem",
                backgroundColor: "#DC143C",
                fontSize: "0.9rem",
              }}
              disabled
              title={"Session has expired"}
            >
              Session Expired
            </button>
          </td>
        );
      } else if (endMinutes < nowMinutes && props.data[key] == true) {
        return (
          <td key={index}>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                // display: "inline",
                minWidth: "10rem",
                maxWidth: "10rem",
                minHeight: "1rem",
                maxHeight: "2rem",
                backgroundColor: "#117864",
                fontSize: "0.9rem",
              }}
              disabled
              title={"You have taken the session from " + props.data["Timings"]}
            >
              Session Taken
            </button>
          </td>
        );
      } else {
        if (
          props.data[key] == false &&
          nowMinutes >= startMinutes - 5 &&
          nowMinutes < endMinutes
        ) {
          return (
            <td key={index}>
              <Link
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#3CB371",
                  fontSize: "0.9rem",
                }}
                // onClick={StartSession(props.data["sessionId"])}
                title={"Click here to start session"}
                to={{
                  pathname: "/livesession",
                  aboutProps: {
                    room: "ClassSession - " + props.data["sessionId"],
                    password: props.data["sessionId"],
                    joinSession: 0,
                  },
                }}
              >
                Start Session
              </Link>
            </td>
          );
        } else if (
          props.data[key] == true &&
          nowMinutes >= startMinutes - 5 &&
          nowMinutes < endMinutes
        ) {
          return (
            <td key={index}>
              <Link
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#228B22",
                  fontSize: "0.9rem",
                }}
                // disabled
                title={"Session is active"}
                to={{
                  pathname: "/livesession",
                  aboutProps: {
                    room: "ClassSession - " + props.data["sessionId"],
                    password: props.data["sessionId"],
                    joinSession: 1,
                  },
                }}
              >
                Join Session
              </Link>
            </td>
          );
        } else if (nowMinutes < startMinutes) {
          return (
            <td key={index}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#1d3b80",
                  fontSize: "0.9rem",
                }}
                disabled
                title={
                  "Session will become active from " + props.data["Timings"]
                }
              >
                Upcoming Session
              </button>
            </td>
          );
        }
      }
    } else if (key == "sessionId" && props.comp == "LiveSession") {
      return (
        <td key={index} style={{ display: "none" }}>
          {props.data[key]}
        </td>
      );
    } else if (key == "Action" && props.comp == "LiveSession") {
      //check whether we have surprassed end time for the day
      let dt = new Date();
      let time = dt.getHours() + ":" + dt.getMinutes();
      let nowMinutes = getTimeAsNumberOfMinutes(time);
      let endMinutes = getTimeAsNumberOfMinutes(
        String(props.data["Timings"].split("-")[1]).trim()
      );
      let startMinutes = getTimeAsNumberOfMinutes(
        String(props.data["Timings"].split("-")[0]).trim()
      );
      if (endMinutes < nowMinutes) {
        return (
          <td key={index}>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                // display: "inline",
                minWidth: "10rem",
                maxWidth: "10rem",
                minHeight: "1rem",
                maxHeight: "2rem",
                backgroundColor: "#DC143C",
                fontSize: "0.9rem",
              }}
              disabled
              title={"Session has expired"}
            >
              Session Expired
            </button>
          </td>
        );
      } else {
        if (nowMinutes < startMinutes) {
          return (
            <td key={index}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#1d3b80",
                  fontSize: "0.9rem",
                }}
                disabled
                title={
                  "Session will become active from " + props.data["Timings"]
                }
              >
                Upcoming Session
              </button>
            </td>
          );
        } else if (
          props.data[key] == true &&
          nowMinutes >= startMinutes &&
          nowMinutes < endMinutes
        ) {
          return (
            <td key={index}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#228B22",
                  fontSize: "0.9rem",
                }}
                // disabled
                title={"Session is active"}
                onClick={StartSession(
                  "ClassSession - " + props.data["sessionId"],
                  props.data["sessionId"],
                  props.func
                )}
              >
                Join Session
              </button>
            </td>
          );
        } else if (
          props.data[key] == false &&
          nowMinutes >= startMinutes &&
          nowMinutes < endMinutes
        ) {
          return (
            <td key={index}>
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  // display: "inline",
                  minWidth: "10rem",
                  maxWidth: "10rem",
                  minHeight: "1rem",
                  maxHeight: "2rem",
                  backgroundColor: "#228B22",
                  fontSize: "0.9rem",
                }}
                disabled
                title={"Waiting for teacher to start session"}
              >
                About to Active
              </button>
            </td>
          );
        }
      }
    } else return <td key={index}>{props.data[key]}</td>;
  });
};

const getTimeAsNumberOfMinutes = (time) => {
  let timeParts = time.split(":");
  let timeInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  return timeInMinutes;
};

const DownloadFile = (path) => (e) => {
  e.preventDefault();
  let data = {
    path: path,
  };
  axios
    .post("https://planed.in/api/common/downloadcontent", data, {
      responseType: "blob",
      timeout: 30000,
    })
    .then((response) => {
      var blob = new Blob([response.data]);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = String(path).substring(String(path).lastIndexOf("/") + 1);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
};

const StartSession = (room, password, func) => (e) => {
  func(room, password);
};

export default Gridview;
