import React from 'react'
import "./Home.css"
import Sidebar from '../../components/User/Sidebar/Sidebar'
import Rightbar from '../../components/User/Rightbar/Rightbar'
 function UserHomePage() {
  return (
      <div>
          <div className='homesubcontainer'>
              <div className='homesidebar'>
                  <Sidebar />
              </div>
              <div className='homerightbar'>
                  <Rightbar />
              </div>
          </div>
      </div>
  )
}

export default UserHomePage