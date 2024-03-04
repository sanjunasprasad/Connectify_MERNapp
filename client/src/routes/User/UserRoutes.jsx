import React from 'react'
import { Routes, Route } from "react-router-dom"; 

function UserRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<UserPublicRoutes component={SignUp} />} />
      
    </Routes>
  )
}

export default UserRoutes
