import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import Reset_Password from "./Pages/Reset_Password/Reset_Password.jsx";
import Confirm_Password from "./Pages/Reset_Password/Confirm_Password.jsx";
import Verify_email from "./Pages/Login/Verify-email.jsx";
import Dashboard from "./Pages/Body/Dashboard.jsx";
import User from "./Pages/Body/User.jsx";
import SideBarNav from "./Pages/SideBarNav/SideBarNav.jsx";
import GuarantorMainForm from "./Pages/Body/User/GuarantorMainForm.jsx";
import bioDataProfile from "./Pages/Body/Profile/Bio Data/index.jsx";
import nokProfile from "./Pages/Body/Profile/NOK/index.jsx";
import myUserProfile from "./Pages/Body/Profile/MyUser/index.jsx";
import ndaProfile from "./Pages/Body/Profile/NDA/index.jsx";
import jobOpening from "./Pages/Body/JobOpening/Index.jsx";
import BDJSONpdf from "../src/Components/PDF/BDJSONpdf.jsx";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <Route path="/user/verify_email" exact Component={Verify_email} />
        <Route path="/forgot_password" exact Component={Reset_Password} />
        <Route path="/user/reset_password" exact Component={Confirm_Password} />
        <Route path="/dashboard" exact Component={Dashboard} />
        <Route path="/user" exact Component={User} />
        <Route path="/employee_guarantor" exact Component={GuarantorMainForm} />
        <Route path="/biodata" exact Component={bioDataProfile} />
        <Route path="/nextofkin" exact Component={nokProfile} />
        <Route path="/my_user" exact Component={myUserProfile} />
        <Route path="/nda" exact Component={ndaProfile} />
        <Route path="/job_opening" exact Component={jobOpening} />
        <Route path="/pdfPage" exact Component={BDJSONpdf} />
      </Routes>
    </Router>
  );
}

export default App;
