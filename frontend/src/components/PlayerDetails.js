import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PlayerDetails = () => {
    const [player, setPlayer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    const fetchPlayerDetails = async () => {
        try {
            // Fetch player details from the backend
            const response = await fetch(`http://localhost:5000/admin/getplayers/${id}`);
            const data = await response.json();
            setPlayer(data);
        } catch (error) {
            console.error({ message: 'Error fetching player details:', error });
        }
    };

    const contentLines = player.bio ? player.bio.split('\\n\\n') : [];

    return (
        <div className="container m-3 p-3 row">
            <div className="col-md-2"></div>
            <div className="news col-md-9 text-justify mt-3">
                <img src={`http://localhost:5000/${player.image}`} alt="Player" className="img-fluid mx-auto d-block" />
                <br />
                <br />
                <h2>{player.name}</h2>
                <br />
                <br />
                <h4>{player.sports}</h4>
                <br />
                <br />

                <h5>Olympic Medals: {player.olympicMedals}</h5>
                <br />
                <h5>Team: {player.team}</h5>
                <br />
                <h5>Games Participations: {player.gameParticipants}</h5>
                <br />
                <h5>First Olympic Games: {player.firstOlympicGames}</h5>
                <br />
                <h5>Year of Birth: {player.yearOfBirth}</h5>
                <br />

                {contentLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <div className="col-md-1"></div>
        </div>
    );
};

export default PlayerDetails;
