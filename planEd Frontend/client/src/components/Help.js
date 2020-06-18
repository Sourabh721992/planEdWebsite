import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

function Help() {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [deviceWidth, setDeviceWidth] = useState(-1);

  useEffect(() => {
    setDeviceWidth($(window).width());
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
    <div id="help">
      <div
        className="row align-items-center"
        style={{ height: "1.5rem" }}
      ></div>
      <div
        // className=".d-flex"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "14rem",
          marginRight: "14rem",
          marginTop: "3rem",
        }}
      >
        <div className="card" style={{ backgroundColor: "#3a648a" }}>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-sm-12">
            <div className="col-sm-6" style={{ textAlign: "center" }}>
              <img
                src={require("../images/Help.png")}
                style={{ height: "17rem" }}
              ></img>
            </div>
            <div className="col-sm-6">
              <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  style={{ fontSize: 14 }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your name"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control form-control-lg"
                  style={{ fontSize: 14 }}
                  onChange={(e) => setContactNo(e.target.value)}
                  value={contactNo}
                  required
                  placeholder="Enter your contact number"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="row col-sm-12" style={{ marginLeft: 0 }}>
                <input
                  type="text"
                  name="email"
                  className="form-control form-control-lg"
                  style={{ fontSize: 14 }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="Enter your email address"
                ></input>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="col-sm-12">
                <textarea
                  className="form-control rounded-1"
                  name="description"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                  placeholder="Write your query here"
                  rows="3"
                  required
                  style={{ fontSize: 14 }}
                ></textarea>
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
              <div className="col-sm-3">
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-info btn-md"
                  value="Submit Query"
                />
              </div>
              <div className="row" style={{ height: "1.5rem" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const mobileForm = (
    <div id="help">
      <div
        className="row align-items-center"
        style={{ height: "1.5rem" }}
      ></div>
      {/* <div
        // className=".d-flex"
        style={{
          
          

         
        }}
      > */}
      <div
        className="card"
        style={{
          backgroundColor: "#3a648a",
          marginLeft: "1rem",
          marginRight: "1rem",
          marginTop: "3rem",
          // justifyContent: "center",
          // flexDirection: "column",
          // display: "flex",
          // textAlign: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-sm-12" style={{}}>
            <img
              src={require("../images/Help.png")}
              style={{
                height: "10rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></img>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-xs-12" style={{ marginLeft: 0 }}>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              style={{ fontSize: 14, width: "96%" }}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your name"
            ></input>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-xs-12" style={{ marginLeft: 0 }}>
            <input
              type="text"
              name="contactNumber"
              className="form-control form-control-lg"
              style={{ fontSize: 14, width: "96%" }}
              onChange={(e) => setContactNo(e.target.value)}
              value={contactNo}
              required
              placeholder="Enter your contact number"
            ></input>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-xs-12" style={{ marginLeft: 0 }}>
            <input
              type="text"
              name="email"
              className="form-control form-control-lg"
              style={{ fontSize: 14, width: "96%" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Enter your email address"
            ></input>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="col-xs-12">
            <textarea
              className="form-control rounded-1"
              name="description"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              value={query}
              placeholder="Write your query here"
              rows="3"
              required
              style={{ fontSize: 14 }}
            ></textarea>
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
          <div className="row col-xs-12">
            <input
              type="submit"
              name="submit"
              className="btn btn-info btn-md"
              value="Submit Query"
              style={{ marginRight: "auto", marginLeft: "auto" }}
            />
          </div>
          <div className="row" style={{ height: "1.5rem" }}></div>
        </div>
      </div>
    </div>
  );
  return (
    <form onSubmit={onSubmit}>
      {deviceWidth > 600 && webForm}
      {deviceWidth <= 600 && mobileForm}
    </form>
  );
}

export default Help;
