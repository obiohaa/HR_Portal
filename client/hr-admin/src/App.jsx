import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Junction from "./Junction.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import Reset_Password from "./Pages/Reset_Password/Reset_Password.jsx";
import Confirm_Password from "./Pages/Reset_Password/Confirm_Password.jsx";
import Verify_email from "./Pages/Login/Verify-email.jsx";
import Dashboard from "./Pages/Body/Dashboard/EmployeeDash/EmployeeMainDash.jsx";
import AdminDashboard from "./Pages/Body/Dashboard/AdminDash/AdminMainDash.jsx";
import User from "./Pages/Body/User/Tracker.jsx";
import GuarantorMainForm from "./Pages/Body/User/GuarantorMainForm.jsx";
import BioDataProfile from "./Pages/Body/Profile/Bio Data/BioData.jsx";
import NokProfile from "./Pages/Body/Profile/NOK/NOK.jsx";
import MyUserProfile from "./Pages/Body/Profile/MyUser/MyUser.jsx";
import NdaProfile from "./Pages/Body/Profile/NDA/NDA.jsx";
import JobOpening from "./Pages/Body/JobOpening/JobOpen.jsx";
import BDJSONpdf from "../src/Components/PDF/BDJSONpdf.jsx";
import NOKJSON from "../src/Components/PDF/NOKJSON.jsx";
import ErrorPage from "./Pages/Error/ErrorPage.jsx";
import RegisterAdmin from "./Pages/Register/RegisterAdmin.jsx";
import AddAdmin from "./Pages/Body/Admin/AdminSide/AddAdmin.jsx";
import AdminBioData from "./Pages/Body/Admin/AdminBioData/AddAdmin.jsx";
import AdminNOK from "./Pages/Body/Admin/AdminNOK/EmployeeNOK.jsx";
import Employee from "./Pages/Body/Admin/AdminEmployee/Employee.jsx";
import Resumed from "./Pages/Body/Admin/AdminEmployee/Resumed.jsx";
import Terminated from "./Pages/Body/Admin/AdminEmployee/Terminated.jsx";
import AdminGuarantor from "./Pages/Body/Admin/AdminGuarantor/AdminGua.jsx";
import AdminJob from "./Pages/Body/Admin/AdminJobOpen/AdminJobOpening.jsx";
import OutletLocations from "./Pages/Body/Admin/OutletLocations/OutletLocations.jsx";
import AdminNDA from "./Pages/Body/Admin/AdminNDA/EmployeeNDA.jsx";
import AdminBioPDF from "./Components/PDF/AdminPDF/BIOPDF.jsx";
import AdminNOKPDF from "./Components/PDF/AdminPDF/NOKPDF.jsx";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerAdmin" element={<RegisterAdmin />} />
        <Route path="/user/verify_email" element={<Verify_email />} />
        <Route path="/admin/verify_email" element={<Verify_email />} />
        <Route path="/forgot_password" element={<Reset_Password />} />
        <Route path="/user/reset_password" element={<Confirm_Password />} />
        <Route path="/employee_guarantor" element={<GuarantorMainForm />} />
        <Route path="/pdfPagebioDATA" element={<BDJSONpdf />} />
        <Route path="/pdfPagenok" element={<NOKJSON />} />
        <Route path="/adminBIOPDF" element={<AdminBioPDF />} />
        <Route path="/adminNOKPDF" element={<AdminNOKPDF />} />
        {/* Protected Routes (sidebar-wrapped) */}
        <Route element={<Junction />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Admin_dashboard" element={<AdminDashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/biodata" element={<BioDataProfile />} />
          <Route path="/nextofkin" element={<NokProfile />} />
          <Route path="/my_user" element={<MyUserProfile />} />
          <Route path="/admin-user" element={<MyUserProfile />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/admin-bioData" element={<AdminBioData />} />
          <Route path="/admin-NOK" element={<AdminNOK />} />
          <Route path="/Registered-employee" element={<Employee />} />
          <Route path="/Resumed-employee" element={<Resumed />} />
          <Route path="/exited-employee" element={<Terminated />} />
          <Route path="/nda" element={<NdaProfile />} />
          <Route path="/job_opening" element={<JobOpening />} />

          <Route path="/admin-guarantor" element={<AdminGuarantor />} />
          <Route path="/admin_jobs" element={<AdminJob />} />
          <Route path="/Outlet-locations" element={<OutletLocations />} />
          <Route path="/admin-bioDataG_One" element={<AdminNDA />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
