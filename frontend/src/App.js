import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq"
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NewsItem from "./components/NewsItem";
import Sports from "./components/Sports";
import Live from "./components/Live";
import NoteState from "./context/notes/NoteState";
import Atheletes from "./components/Atheletes";
import News from "./components/News";
import PlayerDetails from "./components/PlayerDetails";
import Admin from "./components/admin/Admin";
import EmailVerification from "./components/EmailVerification";
import Gallery from "./components/Gallery";
import UploadImage from "./components/admin/UploadImage";
import EmailVerified from "./components/EmailVerified";
import UploadGame from "./components/admin/UploadGame";
import GameSchedule from "./components/GameSchedule";
import UploadNews from "./components/admin/UploadNews";
import UploadPlayer from "./components/admin/UploadPlayer";
import UploadSchedule from "./components/admin/UploadSchedule";
import Highlights from "./components/Highlights";
import UploadHighlights from "./components/admin/UploadHighlights";
import RequestLogin from "./components/RequestLogin";
import SportDetails from "./components/SportDetails";
import AllLIve from "./components/AllLIve";
import SecondLive from "./components/SecondLive";



function App() {

  return (

    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/live" element={<Live />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/livevideos" element={<AllLIve/>} />
          <Route path="/secondlive" element={<SecondLive/>} />




          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/sportsdetails/:id" element={<SportDetails/>} />
          <Route path="/sports" element={<Outlet/>} />


          <Route path="/atheletes" element={<Atheletes />} />
          <Route path="/atheletes/player/:id" element={<PlayerDetails />} />
          <Route path="/atheletes" element={<Outlet />} />

          <Route path="/news" element={<NewsItem />} />
          <Route path="/news/articles/:id" element={<News />} />
          <Route path="/news" element={<Outlet />} />


          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/uploadimage" element={<UploadImage />} />
          <Route path="/admin/uploadgame" element={<UploadGame />} />
          <Route path="/admin/uploadplayer" element={<UploadPlayer />} />
          <Route path="/admin/uploadnews" element={<UploadNews />} />
          <Route path="/admin/uploadschedule" element={<UploadSchedule />} />
          <Route path="/admin/uploadhighlights" element={<UploadHighlights />} />
          <Route path="/admin" element={<Outlet />} />


          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gameschedule" element={<GameSchedule />} />
          <Route path="/highlights" element={<Highlights />} />


          <Route path="/email" element={<EmailVerification />} />
          <Route path="/emailverified" element={<EmailVerified />} />

          <Route path="/loginrequest" element={<RequestLogin />} />

        </Routes>
        <Footer />
      </Router>
    </NoteState>
  );
}

export default App;
