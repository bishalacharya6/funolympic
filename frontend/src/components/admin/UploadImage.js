import React, { useState } from 'react';

const UploadImage = () => {
  const host = "http://localhost:5000";
  const [uploadMessage, setUploadMessage] = useState('');
  const [buttonText, setButtonText] = useState("Upload");
  const updateButton = () => {
      setButtonText("Uploaded");
      setTimeout(() => {
        setButtonText("Upload");
      }, 1500);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateButton();

    const formData = new FormData();
    formData.append('imageTitle', event.target.imageTitle.value);
    formData.append('imageDescription', event.target.imageDescription.value);
    formData.append('imageFile', event.target.imageFile.files[0]);

    try {
      const response = await fetch(`${host}/admin/uploadimage`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setUploadMessage('Image uploaded successfully!');
      event.target.reset(); // Clear the form inputs

      setTimeout(() => {
        setUploadMessage('');
      }, 1000);

      // Handle the response from the server
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-3 p-3">
      <form className='m-3 p-3' onSubmit={handleSubmit} style={{ "box-shadow": "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
        <h1 className="fw-bold">Upload Image</h1>
        <br />
        <div className="mb-3">
          <label htmlFor="imageTitle" className="form-label">
            Image Title
          </label>
          <input type="text" className="form-control" id="imageTitle" name="imageTitle" required />
        </div>
        <div className="mb-3">
          <label htmlFor="imageDescription" className="form-label">
            Image Description
          </label>
          <textarea className="form-control" id="imageDescription" name="imageDescription" required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">
            Image File
          </label>
          <input type="file" className="form-control" id="imageFile" name="imageFile" accept="image/*" required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
        </div>
        {uploadMessage && <div className="alert alert-success mt-3">{uploadMessage}</div>}
      </form>
    </div>
  );
};

export default UploadImage;
