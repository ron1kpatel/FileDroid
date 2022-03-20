import React, { useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'

function MainLogo() {
  const navigate = useNavigate();
  function handleGoHome(){
    navigate('/');
  }
  return (

    <div className="brand"  onClick={handleGoHome}>
      <h1 className="logo-main">FileDroid</h1>
      <h4 className="logo-text">Online File Sharing Platform</h4>
    </div>
  )
}

export default MainLogo