import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = ({ status, msg, altMessage }) => {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>{status ? status : "404"}</h1>
        </div>
        <h2>{msg ? msg : "Something Went Wrong!"}</h2>
        <p>{altMessage ? altMessage : "Don't panic, Please sign in or refresh to try again"}</p>
        <Link to="/login" className="signUpButton">
          sign in
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
