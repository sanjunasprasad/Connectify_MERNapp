import React from 'react'
import "./LeftSide.css"
import Sidebar from '../Sidebar/Sidebar'
import LogoSearch from '../LogoSearch/LogoSearch'
function LeftSide() {
  return (
    <div className='ProfileSide'>
        <LogoSearch/>
       <Sidebar />
    </div>
  )
}

export default LeftSide
