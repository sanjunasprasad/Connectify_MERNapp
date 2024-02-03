import React from 'react'
import { useNavigate } from 'react-router-dom';

function FeedHome() {

    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('token')
        navigate('/');
    }
  return (
    <div>
      <h1>this is feed home</h1>
      <button      onClick={signOut} type="button">signout</button>
      <button>click me</button>
    </div>
  )
}

export default FeedHome
