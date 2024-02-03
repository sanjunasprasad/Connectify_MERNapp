// import React from "react";
// import Navbar from "./components/Admin/navbar";
// import UserSignup from "./components/User/UserSignup";
// import UserLogin from "./components/User/UserLogin";
// import AdminLogin from "./components/Admin/AdminLogin";
// import Sidebar from "./components/Admin/Sidebar";
// import UserManage from "./components/Admin/UserManage";
// function App() {
//   return (
//     <>
//       <AdminLogin />
//       <Sidebar />
//       <Navbar />
//       <UserManage />
//       <UserSignup />
//       <UserLogin />
//     </>
//   );
// }
// export default App;







import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserSignup from "./components/User/UserSignup";



function App() {
  return (
    <>
       <Routes>

            <Route element={< UserSignup />} path="/signup" />

       </Routes>
      
    </>
  )
}

export default App
