import React, { useEffect, useState } from 'react'
import logo from '../images/logo_color.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
// import jwt from 'jsonwebtoken';


export default function Navbar() {
    let navigate = useNavigate();
    const {id} = useParams;
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        window.location.reload(false);
    }


    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });

            if (response.ok) {
                const data = await response.json();
                const { isAdmin } = data;
                console.log('isAdmin:', isAdmin);
                setIsAdmin(isAdmin);
            } else {
                throw new Error('Failed to fetch user');
            }
        } catch (error) {
            console.error('Error fetching isAdmin:', error);
        }
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#222831", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
                <div className="container-fluid" style={{ backgroundColor: "#222831" }}>
                    <Link className="navbar-brand px-2 m-3" to="/"> <img src={logo} alt="logo_color" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-3  mb-lg-0 mx-auto" >
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/" style={{ color: "#00ADB5" }}>FunOlympic Games</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/live" style={{ color: "#00ADB5" }}>Live Games</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/atheletes" style={{ color: "#00ADB5" }}>Atheletes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/sports" style={{ color: "#00ADB5" }}>Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/news" style={{ color: "#00ADB5" }}>News</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/admin" style={{ color: "#00ADB5" }}>Admin</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/gallery" style={{ color: "#00ADB5" }}>Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/gameschedule" style={{ color: "#00ADB5" }}>Schedule</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/highlights" style={{ color: "#00ADB5" }}>Highlights</Link>
                            </li>
                            {isAdmin && (
                                <li className="nav-item">
                                    <Link className="nav-link px-2 mx-3 fs-6 fw-bold" to="/admin" style={{ color: "#00ADB5" }}>Admin</Link>
                                </li>
                            )}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle px-2 mx-3 fs-6 fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#00ADB5" }}>
                                    About Us
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/aboutus">About FunOlympic</Link></li>
                                    <li><Link className="dropdown-item" to="/contact">Contact Us</Link></li>
                                    <li><Link className="dropdown-item" to="/faq">FAQ</Link></li>
                                </ul>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link to="/login" className="btn btn-outline-success mx-3 mt-2" type="submit">LogIn</Link>
                            <Link to="/signup" className="btn btn-outline-success mt-2" type="submit">SignUp</Link>
                        </form> : <button onClick={handleLogout} className='btn btn-outline-success mt-2 mx-3'>Logout</button>}
                    </div>
                </div>
            </nav>

        </div>
    )
}
