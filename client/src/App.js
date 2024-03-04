import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserRoutes from './routes/User/UserRoutes'
import AdminRoutes from './routes/Admin/AdminRoutes'


import UserHomePage from "./pages/Home/UserHomePage";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore"
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
            {/* <Route path={'/*'} element = {<UserRoutes/>}/> */}
            {/* <Route path={'/admin*'} element = {<AdminRoutes/>}/> */}







            <Route element={<UserLogin />} path="/" />
            <Route element={< UserSignup />} path="/signup" />
            <Route element={<VerifyOtp />} path="/otp" />
            <Route element={<UserHomePage />} path="/feedhome" />
            <Route element={<Profile />} path="/username" />
            <Route element={<Explore />} path="/Explore" />


            <Route element={<AdminLogin />} path="/admin" />
            <Route element={<AdminPage />} path="/dashboard" /> 
            <Route element={<UserManage />} path="/users" /> 

       </Routes>
      
    </>
  )
}

export default App
