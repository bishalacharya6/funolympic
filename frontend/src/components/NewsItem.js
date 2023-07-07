import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({maxItems}) => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            // Fetch news data from the backend
            const response = await fetch('http://localhost:5000/admin/getnews');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching newsData:', error);
        }
    };


    return (
        <>
            <div className="row m-3 p-3">
                {news.slice(0, maxItems).map((news) => (
                    <div className="col-md-3" key={news._id}>
                        <div className="card my-3" style={{ width: "18rem" }}>
                            <img src={`http://localhost:5000/${news.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{news.title.slice(0, 40)}...</h5>
                                <p className="card-text">{news.description.slice(0, 50)}...</p>
                                {/* <p className="card-text">{news.content.slice(0, 20)}....</p> */}

                                <Link
                                    to={`/news/articles/${news._id}`}
                                    className="btn btn-primary"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NewsItem;
