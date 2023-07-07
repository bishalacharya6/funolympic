import React, { useState } from 'react';

const UploadSchedule = () => {
  const [schedule, setSchedule] = useState({
    sport: '',
    date: '',
    time: '',
    location: '',
    teamA: '',
    teamB: ''
  });
  const [uploadMessage, setUploadMessage] = useState('');
  const [error, setError] = useState('');
  const [buttonText, setButtonText] = useState("Upload");
  const updateButton = () => {
      setButtonText("Uploaded");
      setTimeout(() => {
        setButtonText("Upload");
      }, 1500);
    };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateButton();

    try {
      const response = await fetch('http://localhost:5000/admin/uploadschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
      });

      const data = await response.json();

      if (response.ok) {
        setUploadMessage(data.message);
        setSchedule({
          sport: '',
          date: '',
          time: '',
          location: '',
          teamA: '',
          teamB: ''
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error uploading game schedule');
      console.error('Error uploading game schedule:', error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="text-center">Upload Schedule</h1>
          <form onSubmit={handleSubmit} className='p-3' style={{ "box-shadow": "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
            <div className="mb-3">
              <label htmlFor="sport" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="sport"
                name="sport"
                value={schedule.sport}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={schedule.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                name="time"
                value={schedule.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={schedule.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="teamA" className="form-label">
                Team A
              </label>
              <input
                type="text"
                className="form-control"
                id="teamA"
                name="teamA"
                value={schedule.teamA}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="teamB" className="form-label">
                Team B
              </label>
              <input
                type="text"
                className="form-control"
                id="teamB"
                name="teamB"
                value={schedule.teamB}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                {buttonText}
              </button>
            </div>
          </form>
          {uploadMessage && <div className="alert alert-success mt-3">{uploadMessage}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default UploadSchedule;
