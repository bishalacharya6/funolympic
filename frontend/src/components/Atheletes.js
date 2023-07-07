import React, { useState, useEffect } from 'react'
import "../styles/atheletes.scss";
import { Link } from 'react-router-dom';


const Atheletes = () => {
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        fetchAthletes();
    }, []);

    const fetchAthletes = async () => {
        try {
            // Fetch athlete data from the backend
            const response = await fetch('http://localhost:5000/admin/getplayers');
            const data = await response.json();
            setAthletes(data);
        } catch (error) {
            console.error('Error fetching athletes:', error);
        }
    };

    return (
        <>
            <h1 className='fw-bold text-center mt-3 p-3'>Atheletes</h1>
            <div className="player-row row">
                {athletes.map((player) => {
                    return (
                        <div className="col-md-2 mb-3" key={player._id}>
                            <div className="card" style={{ width: "10rem", height: "16rem" }}>
                                <div>
                                    <Link to={`/atheletes/player/${player._id}`} >
                                        <img src={`http://localhost:5000/${player.image}`} className="card-img-top" alt="..." />
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{player.name}</h5>
                                    <div>
                                        <p>{player.team} || {player.sports}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Atheletes
