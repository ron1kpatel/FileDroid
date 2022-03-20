import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'


function NotFound() {
    const navigate = useNavigate();
    function handleGoHome() {
        navigate('/')
    }
    return (
        <div className='notFound_wrapper'>
            <h1 className='error-heading-1'>404: Page Not Found</h1>
            <button className='btn btn-error' onClick={handleGoHome}>Go Home!</button>
        </div>
    )
}

export default NotFound