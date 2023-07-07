import React, { useState } from 'react';

const UploadPlayer = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [buttonText, setButtonText] = useState("Upload");
  const updateButton = () => {
      setButtonText("Uploaded");
      setTimeout(() => {
        setButtonText("Upload");
      }, 1500);
    };

  const [playerData, setPlayerData] = useState({
    image: '',
    name: '',
    sports: '',
    olympicMedals: '',
    team: '',
    gameParticipants: '',
    firstOlympicGames: '',
    yearOfBirth: '',
    bio: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateButton();

    // Create a new FormData object
    const formData = new FormData();

    // Append player data to the FormData object
    formData.append('name', event.target.name.value);
    formData.append('sports', event.target.sports.value);
    formData.append('olympicMedals', event.target.olympicMedals.value);
    formData.append('team', event.target.team.value);
    formData.append('gameParticipants', event.target.gameParticipants.value);
    formData.append('firstOlympicGames', event.target.firstOlympicGames.value);
    formData.append('yearOfBirth', event.target.yearOfBirth.value);
    formData.append('bio', event.target.bio.value);

    // Append the image file to the FormData object
    formData.append('playerImage', event.target.playerImage.files[0]);

    try {
      // Send a POST request to the backend route for uploading player data
      const response = await fetch('http://localhost:5000/admin/player', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Player data uploaded successfully
        setAlertMessage('Player data uploaded successfully');
        console.log('Player data uploaded successfully');
        // Reset the form
        setPlayerData({
          image: '',
          name: '',
          sports: '',
          olympicMedals: '',
          team: '',
          gameParticipants: '',
          firstOlympicGames: '',
          yearOfBirth: '',
          bio: '',
        });
      } else {
        // Error uploading player data
        setAlertMessage('Error uploading player data');
        console.error('Error uploading player data:', response.statusText);
      }

      setTimeout(() => {
        setAlertMessage('');
      }, 1000);

      event.target.reset();

    } catch (error) {
      setAlertMessage('Error uploading player data');
      console.error('Error uploading player data:', error);

      setTimeout(() => {
        setAlertMessage('');
      }, 1000);

    }
  };


  return (
    <div className="container mt-5" >

      <h1 className="text-center">Upload Player</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className='p-3' onSubmit={handleSubmit} style={{ "box-shadow": "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="playerImage" className="form-label">Image</label>
                <input type="file" className="form-control" id="playerImage" name="playerImage" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="sports" className="form-label">Sports</label>
                <input type="text" className="form-control" id="sports" name="sports" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="olympicMedals" className="form-label">Olympic Medals</label>
                <input type="number" className="form-control" id="olympicMedals" name="olympicMedals" onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="team" className="form-label">Team</label>
                <input type="text" className="form-control" id="team" name="team" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="gameParticipants" className="form-label">Game Participted</label>
                <input type="number" className="form-control" id="gameParticipants" name="gameParticipants" onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstOlympicGames" className="form-label">First Olympic Games</label>
                <input type="number" className="form-control" id="firstOlympicGames" name="firstOlympicGames" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="yearOfBirth" className="form-label">Year of Birth</label>
                <input type="number" className="form-control" id="yearOfBirth" name="yearOfBirth" onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea className="form-control" id="bio" name="bio" rows="4" onChange={handleChange} required></textarea>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">{buttonText}</button>
            </div>
          </form>
          {alertMessage && (
            <div className={`alert ${alertMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPlayer;
