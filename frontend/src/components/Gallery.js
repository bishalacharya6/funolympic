import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const host = 'http://localhost:5000';


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${host}/admin/getimages`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="m-3 p-3">
      <div className="row">
        {images.map((image) => (
          <div className="col-md-3 mb-3" key={image._id}>
            <div className="card" style={{ width: '18rem' }}>
              <img src={`${host}/uploads/${image.file}`} className="card-img-top" alt="..." />
              {console.log(`${host}/uploads/${image.file}`)}
              <div className="card-body">
                <h5 className="card-title">{image.title}</h5>
                <p className="card-text">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
