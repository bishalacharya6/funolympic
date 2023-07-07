import React from 'react';
import "../styles/home.scss";
import Thumbnail from '../images/Thumbnail.jpg';
import NewsItem from './NewsItem';
import Football from '../images/Thumbnail.jpg';
import Swimming from '../images/Thumbnail.jpg';
import Basketball from '../images/Thumbnail.jpg';
import Tennis from '../images/Thumbnail.jpg';
import { Link } from 'react-router-dom';
import Sports from './Sports';



const Home = () => {
  return (
    <>
      <div className="container m-3 p-3">
        <div className="container mx-3 px-3 d-flex">
          <div className="container d-flex align-content-center fun-olympic">
            FunOlympic <br />Games
          </div>
          <div className='container d-flex align-content-center fun-olympic2'>
            The Olympic Games are the world's only truly global, multi-sport, celebratory athletics competition. With more than 200 countries participating in over 400 events across the Summer and Winter Games, the Olympics are where the world comes to compete, feel inspired, and be together.
          </div>
        </div>
      </div>

      <div className="live mt-3 pt-3">
        <div className="container d-flex justify-content-between">
          <h2 className='text-white'>Live Games</h2>
          <h5> <Link className='text-white' to="/livevideos">View All <i class="fa-solid fa-arrow-right" style={{color: "#EEEEEE"}}></i></Link></h5>
        </div>
        <div className=" p-3 m-3 row">
          <div className="overflow  col-md-5 d-flex flex-column align-items-start">
            <Link to="/live">
              <img className='football-1' src={Thumbnail} alt="" />
            </Link>
            <Link className='live-anchor' to="/live">🔴 | Men's 20km Race Walk </Link>
          </div>
          {/* <div className="overflow  col-md-5 d-flex flex-column align-items-start">
            <a href="/">
              <img className='football-1' src={Football1} alt="" />
            </a>
            <a className='live-anchor' href="/">Most goals in international football: Know the top scorers </a>
          </div> */}
        </div>
      </div>

      <div className="container newitem" >
        <div className="latestnews">
          Latest News
            <h5><Link to="/news">View All <i class="fa-solid fa-arrow-right" ></i></Link></h5>
        </div>
        <div className="container">

          <NewsItem maxItems={4}  />

        </div>
      </div>

      <div className="mt-3" style={{ backgroundColor: "#222831" }}>
        <div className="container d-flex justify-content-between mt-3 pt-3">
          <h2 className='text-white'>Sports</h2>
          <h5> <Link className='text-white' to="/sports">View All</Link></h5>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="games">
              <a href="/"><img src={Football} alt="" /></a>
              <a className='game-name' href="/">Football</a>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="games">
              <a href="/"><img src={Swimming} alt="" /></a>
              <a className='game-name' href="/">Swimming</a>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="games">
              <a href="/"><img src={Basketball} alt="" /></a>
              <a className='game-name' href="/">BasketBall</a>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="games">
              <a href="/"><img src={Tennis} alt="" /></a>
              <a className='game-name' href="/">Tennis</a>
            </div>
          </div>
        </div>
        {/* <Sports maxSports={4}/> */}
      </div>

    </>
  )
}

export default Home
