import React from 'react'
import Verified from "../images/emailverified.jpg"
import { Link } from 'react-router-dom'

const EmailVerified = () => {
    return (
        <div className='container m-3 p-3'>
        <div className='d-flex flex-column align-items-center'>
          <h3>Congratulations</h3><br />
          <div className='card'>
            <img src={Verified} alt='' />
          </div><br />
          <h5>Your Email Has Been Verified</h5><br />
          <h5>Please Proceed to Login</h5>
          <Link to='/login'>
            <button className='btn btn-primary'>Log In</button>
          </Link>
        </div>
      </div>
      
    )
}

export default EmailVerified
