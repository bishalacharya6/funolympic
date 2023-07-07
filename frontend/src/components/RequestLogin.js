import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/login.scss";

const RequestLogin = () => {
  return (
    <div className=" m-3 p-3 d-flex align-items-center justify-content-center">
      <div className=" m-3 p-3 container text-center">
        <h1><b>Access Denied</b></h1>
        <div>
          <h4>Please Login to View Live Streams and Highlights Videos.</h4>
        </div>
        <button className='btn btnlogin text-white'>
          <Link className='' to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}

export default RequestLogin;
