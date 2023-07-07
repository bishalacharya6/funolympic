import React, { useState } from 'react';

const UploadHighlight = () => {
    const [highlightData, setHighlightData] = useState({
        title: '',
        video: null,
    });
    const [alert, setAlert] = useState(null);
    const [buttonText, setButtonText] = useState("Upload");
    const updateButton = () => {
        setButtonText("Uploaded");
        setTimeout(() => {
          setButtonText("Upload");
        }, 2000);
      };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setHighlightData((prevData) => ({
            ...prevData,
            [name]: name === 'video' ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        updateButton();

        const formData = new FormData();
        formData.append('title', highlightData.title);
        formData.append('highlightVideo', highlightData.video);

        try {
            const response = await fetch('http://localhost:5000/admin/highlights', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setAlert({ type: 'success', message: 'Highlight uploaded successfully' });
                setHighlightData({
                    title: '',
                    video: null,
                });
            } else {
                setAlert({ type: 'error', message: 'Error uploading highlight' });
            }

            event.target.reset();

            setTimeout(() => {
                setAlert(null);
            }, 1000); 
            
        } catch (error) {
            setAlert({ type: 'error', message: 'Network error' });
        }
    };

    return (
        <div className="container mt-5" style={{ "box-shadow": "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
            <h1 className="text-center">Upload Highlight</h1>
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={highlightData.title} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="highlightVideo" className="form-label">Video</label>
                            <input type="file" className="form-control" id="highlightVideo" name="video" onChange={handleChange} required />
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

export default UploadHighlight;
