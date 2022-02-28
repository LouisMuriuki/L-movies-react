import React from 'react'
import {Link} from 'react-router-dom'

function Error() {
  return (
    <div><h1>Error</h1>
    <Link to="/">
    <h3>Back to home</h3>
    </Link>
    </div>
  )
}

export default Error