import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailVerification = () => {
    const [ootp, setOotp] = useState({ otp: ""});
    const [timer, setTimer] = useState(30);
    const [verificationStatus, setVerificationStatus] = useState('');

    let navigate = useNavigate();

    const location = useLocation(); // Access the email 

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {

            const { otp } = ootp;
            const email = location.state.email;
            // setOotp({...ootp,  email });

            // console.log(ootp)
            console.log(otp)
            console.log("Sending request with:", JSON.stringify({ otp, email }));
            
            // console.log("the email in the everify", email)

            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, email }),
            });

            const data = await response.json();

            if (data.success) {
                setVerificationStatus('Email verified successfully');
                navigate("/emailverified")
            } else {
                setVerificationStatus('Invalid OTP');
            }
        } catch (error) {
            console.error(error);
            setVerificationStatus('Error occurred during verification');
        }
    };


    const handleOtpChange = (e) => {
        setOotp({ otp: e.target.value });
    };


    const handleResendOtp = async () => {
        try {
            await fetch('/resend-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTimer(30);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let countdown;

        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(countdown);
        };
    }, [timer]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <form onSubmit={handleVerifyOtp}>
                        <h3>Email Verification</h3>
                        {verificationStatus && <p>{verificationStatus}</p>}
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                id="otp"
                                name="otp"
                                value={ootp.otp}
                                onChange={handleOtpChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary">Verify</button>
                            {timer === 0 ? (
                                <button className="btn btn-link" onClick={handleResendOtp}>Resend OTP</button>
                            ) : (
                                <button className="btn btn-link" disabled>Resend OTP ({timer}s)</button>
                            )}
                        </div>
                    </form>

{/* 
                        <div className="container">
                            <h2>Please check your mail for email confirmation</h2>
                            <h1>Thank You</h1>
                        </div> */}

                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
