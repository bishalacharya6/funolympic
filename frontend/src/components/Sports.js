import React, { useState, useEffect } from 'react';
import "../styles/home.scss";
import { Link } from 'react-router-dom';

const Sports = ({maxSports}) => {
    const host = "http://localhost:5000";
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await fetch(`${host}/admin/getgames`);
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };
    return (
        <div className="" style={{ marginTop: "6rem", backgroundColor: "#222831" }}>
            <div className="container d-flex justify-content-center mt-3 pt-3">
                <h1 className='text-white'>All Sports</h1>
            </div>
            <div className="row">
                {games.slice(0, maxSports).map((game) => (
                    <div className="col-md-3" key={game._id}>
                        <div className="games">
                            <Link to={`/sports/sportsdetails/${game._id}`}>
                                <img src={`${host}/uploads/${game.image}`} alt="" />
                            </Link>
                            <Link className='game-name' to={`/sports/sportsdetails/${game._id}`}>{game.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sports
