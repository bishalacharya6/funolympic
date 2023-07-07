import React from 'react'
import FemaleHockey from "../images/football1.png"
import Thumbnail from '../images/Thumbnail.jpg';
import { Link } from 'react-router-dom';
import "../styles/all-live.scss";
import ImageLive from "../images/live-logo.png"



const AllLIve = () => {
    return (
        <div className='m-3 p-3'>
            <div className='mt-3 d-flex justify-content-center align-item-center'>
                <h1 className='fw-bold'>Current Live Games</h1>
            </div>

            <div className='mt-3 current-games'>
                <div className="row">
                    <div className="col-md-6 first-live">
                        <div className="image">
                            <Link to="/live"> <img src={Thumbnail} alt="" className='img-1' />
                                <img src={ImageLive} className="live-logo" alt="" />
                            </Link>
                        </div>
                        <div>
                            <Link to="/live">  <p> 🔴 Men's 20km Race Walk.
                            </p> </Link>
                        </div>
                    </div>
                    <div className="col-md-6 second-live">
                        <div className="image">
                            <Link to="/secondlive"> <img src={FemaleHockey} alt="" className='img-1' /> </Link>
                            <img src={ImageLive} className="live-logo" alt="" />
                        </div>
                        <Link to="">  <p> 🔴 Netherlands 🇳🇱 vs Argentina 🇦🇷 | Women's Hockey 🏑 🥇 Gold Medal Match </p> </Link>
                    </div>
                </div>
            </div>


            <br /><br /><br />


            <div className='mt-3 d-flex justify-content-center align-item-center'>
                <h1>UpComing Games</h1>
            </div>

            <div className='mt-3 upcoming-games'>
                <div className="row">
                    <div className="col-md-6 first-game">
                        <div className="image">
                            <img src={FemaleHockey} alt="" />
                        </div>
                        <p>Canada vs. USA | Full Game | Ice Hockey World Championship</p>
                    </div>
                    <div className="col-md-6 second-game">
                        <div className="image">
                            <img src={FemaleHockey} alt="" />
                        </div>
                        <p>Men’s FIH Hockey World Cup 2023 | India vs Spain | Highlights</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllLIve
