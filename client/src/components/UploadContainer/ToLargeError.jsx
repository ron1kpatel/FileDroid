import React from 'react'
import {MdError} from 'react-icons/md'

function ToLargeError() {
  return (
    <div className='toLargeWrapper'>
      <span className='toLargeError'><MdError className='toLarge-error-icon'/> File Should Less Than 400 Mb</span>
    </div>
  )
}

export default ToLargeError