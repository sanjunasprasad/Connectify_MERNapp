


// import Sidebar from "./components/Admin/Sidebar";
// import UserManage from "./components/Admin/UserManage";
// function App() {
//   return (
//     <>
//
//       <Sidebar />
//       <Navbar />
//       <UserManage />
//    
// 
//     </>
//   );
// }
// export default App;







import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserHomePage from "./pages/UserHomePage";
import AdminPage from "./pages/AdminPage";
import UserLogin from "./components/User/UserLogin";
import UserSignup from "./components/User/UserSignup";
import VerifyOtp from './components/User/VerifyOtp';
import AdminLogin from './components/Admin/AdminLogin'
import UserManage from './components/Admin/UserManage'


function App() {
  return (
    <>
       <Routes>
            <Route element={<UserLogin />} path="/" />
            <Route element={< UserSignup />} path="/signup" />
            <Route element={<VerifyOtp />} path="/otp" />
            <Route element={<UserHomePage />} path="/feedhome" />


            <Route element={<AdminLogin />} path="/admin" />
            <Route element={<AdminPage />} path="/dashboard" /> 
            <Route element={<UserManage />} path="/users" /> 

       </Routes>
      
    </>
  )
}

export default App
