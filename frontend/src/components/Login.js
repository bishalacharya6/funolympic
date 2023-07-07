import React, { useState, useRef, useEffect } from 'react';
import Recaptcha from 'react-google-recaptcha';
import "../styles/login.scss";
import Flame from '../images/flame.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setIsAdmin}) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    let history = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (errorModalOpen && ref.current) {
            ref.current.click();
        }
    }, [errorModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
            }),
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history("/");
            window.location.reload(false);
        } else {
            setErrorModalOpen(true);

            if (ref.current) {
                ref.current.click();
            }
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="container m-3 p-3">
                <div className="login container d-flex">
                    <div className="img">
                        <img src={Flame} alt="" />
                    </div>
                    <div className="login-form container d-flex justify-content-center align-content-center flex-wrap">
                        <form className='loginform' onSubmit={handleSubmit}>
                            <div className="container nbsp">&nbsp;</div>
                            <h3 className='text-center my-3 py-3 fw-bold fs-2'>Login Here</h3>
                            <div className="form-group px-2">
                                <label htmlFor="username">User-Name</label>
                                <input type="text" className="form-control my-3 px-3" id="username" name='username' onChange={onChange} minLength={3} value={credentials.username} placeholder="Enter UserName" />
                            </div>
                            <div className="form-group px-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control my-3 px-3" id="password" name="password" onChange={onChange} minLength={8} value={credentials.password} placeholder="Password" />
                            </div>
                            <div className="d-flex mt-2 justify-content-center align-items-center">
                                <button type="submit" className="btn btnlogin">
                                    Login
                                </button>
                            </div>
                            <p className="forget-password text-center mt-3"><a href="/">Forget Your Password?</a></p>
                            <div className="container account">
                                Don't have an account?&nbsp;<Link to="/signup">Sign Up&nbsp;</Link>Here
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Error Modal */}
            {errorModalOpen && (
                <div>
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" className="btn btn-primary d-none" ref={ref} onClick={() => { }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Launch static backdrop modal
                    </button>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered ">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Login Error</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Invalid Credentials <br /><br />
                                    Please Try Again
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
