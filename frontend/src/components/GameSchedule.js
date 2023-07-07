import React, { useEffect, useState } from 'react';
import "../styles/schedule.scss";

const GameSchedule = () => {
      const [games, setGames] = useState([]);

      useEffect(() => {
        fetchGames();
      }, []);

      const fetchGames = async () => {
        try {
          const response = await fetch(`http://localhost:5000/admin/getschedule`);
          const data = await response.json();
          setGames(data);
        } catch (error) {
          console.error('Error fetching games:', error);
          // Handle the error
        }
      };

    return (
        <div className="container schedule mt-3">
            <h1 className="text-center">Game Schedule</h1>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Team A</th>
                        <th>Team B</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game._id}>
                            <td>{game.sport}</td>
                            <td>{game.date}</td>
                            <td>{game.time}</td>
                            <td>{game.location}</td>
                            <td>{game.teamA}</td>
                            <td>{game.teamB}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameSchedule;
