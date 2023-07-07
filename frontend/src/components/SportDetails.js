import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SportDetails = () => {
    const [games, setGames] = useState({});
    const { id } = useParams();

    const parseContent = (content) => {
        const lines = content.split('\n');
        return lines.map((line, index) => <p key={index}>{line}</p>);
      };

    useEffect(() => {
        fetchNewsDetails();
    }, []);

    const fetchNewsDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/getgames/${id}`);
            const data = await response.json();
            setGames(data);
        } catch (error) {
            console.error({ message: 'Error fetching Games details:', error });
        }
    };

    const descriptionParagraphs = games.description ? parseContent(games.description) : [];

    // const descriptionLines = games.description ? games.description.split('\\n\\n') : [];

    return (
        <div className="container m-3 p-3 row">
            <div className="col-md-2"></div>
            <div className="news col-md-9 text-justify mt-3">
                <img src={`http://localhost:5000/${games.image}`} alt="Article" className="img-fluid mx-auto d-block" /> <br /><br />
                <h2>{games.title}</h2><br /><br />
                {/* {descriptionLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))} */} {descriptionParagraphs}
    
                
            </div>
            <div className="col-md-1"></div>
        </div>
    );
};

export default SportDetails;
