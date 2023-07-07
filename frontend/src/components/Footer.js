import React from "react";
import "../styles/footer.scss";
import footerLogo from "../images/logo-b2p-white-v2.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="background mt-5">
                <div className="d-flex container border-bottom">
                    <div className="m-3 p-3">
                        <img src={footerLogo} alt="" />
                    </div>
                    <div className="container mt-3 p-3">
                        <div className="row">
                            <div className="col-lg-3 footer_about">
                                <ul>
                                    <li>
                                        <h5>
                                            <Link to="/">FunOlympic Games</Link>
                                        </h5>
                                    </li>
                                    <li>
                                        <a href="https://www.paris2024.org/en/" target="_blank" rel="noopener noreferrer">Paris 2024</a>
                                    </li>
                                    <li>
                                        <Link to="/highlights">Replays & Highlights</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 footer_about">
                                <ul>
                                    <li>
                                        <h5>
                                            <Link to="/">FunOlympic Games Live</Link>
                                        </h5>
                                    </li>
                                    <li>
                                        <Link to="/livevideos">Live Events</Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/">Original Series</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Corporate</Link>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-lg-3 footer_about">
                                <ul>
                                    <li>
                                        <h5>
                                            <Link to="/">News</Link>
                                        </h5>
                                    </li>
                                    {/* <li>
                                        <Link to="/">Podcast</Link>
                                    </li> */}
                                    <li>
                                        <Link to="/news">Topic</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 footer_about">
                                <ul>
                                    <li>
                                        <h5>
                                            <Link to="/" className="no-Pointer">Explore</Link>
                                        </h5>
                                    </li>
                                    <li>
                                        <Link to="/atheletes">Athletes</Link>
                                    </li>
                                    <li>
                                        <Link to="/sports">Sports</Link>
                                    </li>
                                    <li>
                                        <Link to="/gallery">Gallery</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-3 p-3 d-flex border-bottom">
                    <div className="container text-center m-3">
                        <div className="footer_two">
                            <Link to="/">International FunOlympic Committee</Link>
                            <Link to="/aboutus">About Us</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/faq">FAQ</Link>
                        </div>
                    </div>
                </div>

                <div className="container text-center mt-3 py-3 text-white">
                    TM © 2023 – International FunOlympic Committee – All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
