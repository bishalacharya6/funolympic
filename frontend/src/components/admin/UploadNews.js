import React, { useState } from 'react';

const UploadNews = () => {
  const [newsData, setNewsData] = useState({
    image: '',
    title: '',
    description: '',
    content: '',
  });
  const [alert, setAlert] = useState(null);
  const [buttonText, setButtonText] = useState("Upload");

  const updateButton = () => {
    setButtonText("Uploaded");
    setTimeout(() => {
      setButtonText("Upload");
    }, 1500);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateButton();

    // Create a new FormData object
    const formData = new FormData();

    // Append news data to the FormData object
    formData.append('newsImage', event.target.newsImage.files[0]);
    formData.append('title', event.target.title.value);
    formData.append('description', event.target.description.value);
    formData.append('content', event.target.content.value);

    try {
      // Send a POST request to the backend route for uploading news data
      const response = await fetch('http://localhost:5000/admin/news', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // News data uploaded successfully
        setAlert({ type: 'success', message: 'News data uploaded successfully' });
        // Reset the form
        setNewsData({
          image: '',
          title: '',
          description: '',
          content: '',
        });

        // Remove the alert message after 1 second
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      } else {
        // Error uploading news data
        setAlert({ type: 'error', message: 'Error uploading news data' });
      }

      // Clear the form after submission
      event.target.reset();

    } catch (error) {
      // Network error
      setAlert({ type: 'error', message: 'Network error' });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Upload News</h1>
      <div className="row justify-content-center">
        <div className="col-md-7">
          <form onSubmit={handleSubmit} className="p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
            <div className="mb-3">
              <label htmlFor="newsImage" className="form-label">Image</label>
              <input type="file" className="form-control" id="newsImage" name="newsImage" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="description" rows="4" onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea className="form-control" id="content" name="content" rows="8" onChange={handleChange} required></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>
          </form>
          <br />
          {alert && (
            <div className={`alert alert-${alert.type === 'success' ? 'success' : 'danger'}`} role="alert">
              {alert.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadNews;
