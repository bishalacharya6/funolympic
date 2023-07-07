import React, { useState } from 'react';

const UploadGame = () => {
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
    formData.append('gameTitle', event.target.gameTitle.value);
    formData.append('gameDescription', event.target.gameDescription.value);
    formData.append('gameImage', event.target.gameImage.files[0]);

    try {
      const response = await fetch(`${host}/admin/uploadgame`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setUploadMessage('Game uploaded successfully!');
      // Handle the response from the server
    } catch (error) {
      console.error('Error uploading game:', error);
      // Handle the error
    }

    // Clear the form after submission
    event.target.reset();

    // Remove the upload message after 1 second
    setTimeout(() => {
      setUploadMessage('');
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-3 p-3">
      <form
        className="m-3 p-3"
        onSubmit={handleSubmit}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
        }}
      >
        <h1 className="fw-bold">Upload Game</h1>
        <br />
        <div className="mb-3">
          <label htmlFor="gameTitle" className="form-label">
            Game Title
          </label>
          <input type="text" className="form-control" id="gameTitle" name="gameTitle" required />
        </div>
        <div className="mb-3">
          <label htmlFor="gameDescription" className="form-label">
            Game Description
          </label>
          <textarea type="text" className="form-control" rows="4" id="gameDescription" name="gameDescription" required />
        </div>
        <div className="mb-3">
          <label htmlFor="gameImage" className="form-label">
            Game Image
          </label>
          <input type="file" className="form-control" id="gameImage" name="gameImage" accept="image/*" required />
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

export default UploadGame;
