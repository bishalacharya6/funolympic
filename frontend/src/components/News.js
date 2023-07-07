import React, {useEffect, useState} from 'react';
import '../styles/news.scss';
import { useParams } from 'react-router-dom';

const News = () => {

    const [news, setNews] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchNewsDetails();
    }, []);

    const fetchNewsDetails = async () => {
        try {
            // Fetch news details from the backend
            const response = await fetch(`http://localhost:5000/admin/getnews/${id}`);
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error({ message: 'Error fetching News details:', error });
        }
    };

    const contentLines = news.content ? news.content.split('\\n\\n') : [];


    return (
        <div className='container m-3 p-3 row'>

            <div className="col-md-2">
            </div>
            <div className="news col-md-9 text-justify mt-3">

                <img src={`http://localhost:5000/${news.image}`} alt="Article" className="img-fluid mx-auto d-block" /> <br /><br />

                <h2>{news.title}</h2><br /><br />

                <h4> {news.description}</h4><br /><br />

                {/* <p>{article.content}</p> */}


                {contentLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}

            </div>
            <div className="col-md-1">

            </div>



        </div>
    );
};

export default News;
