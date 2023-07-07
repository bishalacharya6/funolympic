import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Highlights = () => {
    const [highlights, setHighlights] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchHighlights();
        }
        else {
            navigate("/loginrequest");
        }
    }, []);

    const fetchHighlights = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/gethighlights');
            const data = await response.json();
            setHighlights(data);
        } catch (error) {
            console.error('Error fetching game highlights:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center m-3 p-3">
            <div>
                <h1 className='text-center fw-bold'>Highlights</h1><br />
                <div className="row">
                    {highlights.map((highlight) => (
                        <div className="col-md-4 " key={highlight._id}>
                            <div className="mb-4">
                                <video height={"250px"} width={"fit-content"} controls>
                                    <source src={`http://localhost:5000/${highlight.video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <h5>{highlight.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Highlights;
