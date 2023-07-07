import React, { useRef, useState, useEffect } from 'react';
import "../styles/signup.scss";
import Flame from '../images/flame.png';
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";


const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "", cpassword: "" });
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    let navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (errorModalOpen && ref.current) {
            ref.current.click();
        }
    }, [errorModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.cpassword) {
            setErrorModalOpen(true);
            return (setErrorMsg("Passwords do not match"));
            // return;
        }

        if (!isCaptchaValid) {
            setErrorModalOpen(true);
            return( setErrorMsg("Please complete the reCAPTCHA verification"));
            // Prevent form submission
          }

        const { name, username, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, username, email, password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            // localStorage.setItem('token', json.authtoken);
            navigate("/email", { state: { email: email } });

            console.log("The email in the signup : ", email)
        }
        else {
            setErrorModalOpen(true);
            setErrorMsg(json.error);

            if (ref.current) {
                ref.current.click();
            }
        }

    }

    const onCaptchaChange = (value) => {
        if (value) {
            setIsCaptchaValid(true);
        } else {
            setIsCaptchaValid(false);
        }
    };


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="container m-3 p-3">
                <div className="signup container d-flex">
                    <div className="login-form container d-flex justify-content-center align-content-center flex-wrap" >
                        <form className='signupform' onSubmit={handleSubmit}>
                            <div className="container nbsp">&nbsp</div>
                            <h3 className='text-center my-2 py-1 fw-bold fs-2'>Sign Up Here</h3>
                            <div className="form-group px-1 d-flex">
                                <div className="label">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control my-2 px-1" id="name" name="name" onChange={onChange} value={credentials.name} required placeholder="@Name" />
                                </div>
                                <div className="lable mx-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control my-2 px-1" id="username" name="username" onChange={onChange} value={credentials.username} required placeholder="@Username" />
                                </div>
                            </div>
                            <div className="form-group px-1">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control my-2 px-3" id="email" name="email" onChange={onChange} value={credentials.email} required placeholder="@Email" />
                            </div>
                            <div className="form-group px-1">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control my-2 px-3" id="password" name="password" onChange={onChange} value={credentials.password} required minLength={8} placeholder="@Password" />
                            </div>
                            <div className="form-group px-1">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" className="form-control my-2 px-3" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={8} required placeholder="@ConfirmPassword" />
                            </div> <br />
                            <div className='d-flex justify-content-center'>
                                <ReCAPTCHA
                                    sitekey="6LcqcgEnAAAAANUfMHAI_uuv-4g2FPoxahX7SDLF"
                                    onChange={onCaptchaChange}
                                />
                            </div>

                            <div className="d-flex justify-content-center align-items-center my-2 mb-2">
                                <button type="submit" className="btn btnsignup">
                                    Sign Up
                                </button>
                            </div>
                            <div className="container login-account">
                                Already have an account?&nbsp;<Link to="/login">LogIn&nbsp;</Link>Here
                            </div>
                        </form>
                    </div>
                    <div className="img">
                        <img src={Flame} alt="" />
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
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Sign-In Error</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Invalid Credentials <br /><br />
                                    {errorMsg}
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
    )
}

export default Signup
