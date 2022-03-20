import React from 'react'
import './Modal.css'
import {MdDone} from 'react-icons/md'
import {MdError} from 'react-icons/md'
function ShowResult({ result }) {
    if (result.error === true) {
        return (
            <div className="showSendResult_wrapper">
            <div><MdError className='result-icon error-icon'/></div>
            <div className="result-text">{result.message}</div>
        </div>
        )
    }
    else{
        return (
            <div className="showSendResult_wrapper">
                <div><MdDone className='result-icon'/></div>
                <div className="result-text">{result.message}</div>
            </div>
        )
    }
}

export default ShowResult