import React, { useState } from 'react';
import '../../styles/admin.scss';
import { Link } from 'react-router-dom';
import GetUser from './GetUser';
import Dashboard from './Dashboard';

const Admin = () => {
    const [selectedOption, setSelectedOption] = useState('dashboard');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderPanel = () => {
        if (selectedOption === 'dashboard') {
            return (
               <Dashboard/>
            );
        } else if (selectedOption === 'users') {
            return (
                <GetUser/>
            );
        } else if (selectedOption === 'upload') {
            return (
                <div className="column-2 col-md-9">
                    <div>
                        <h2>Upload</h2>
                        <br />

                    </div>

                    <div className=" upload">
                        <div className="m-3 d-flex justify-content-between">
                            <h5>Add Game </h5>
                            <button className="btn btn-primary"> <Link to="/admin/uploadgame"> Add Game </Link></button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Upload News </h5>
                            <button className="btn btn-primary"><Link to="/admin/uploadnews"> Add News </Link></button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Add Athletes </h5>
                            <button className="btn btn-primary"><Link to="/admin/uploadplayer"> Add Players </Link></button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Add Game Schedule </h5>
                            <button className="btn btn-primary"><Link to="/admin/uploadschedule"> Add Schedule </Link></button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Upload Image </h5>
                            <button className="btn btn-primary">  <Link to="/admin/uploadimage"> Add Image </Link></button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Upload Highlights </h5>
                            <button className="btn btn-primary">  <Link to="/admin/uploadhighlights"> Add Highlights </Link></button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div className="m-3 p-3">
                <div className="admin">
                    <div className="row admin-row">
                        <div className="column-1 col-md-3">
                            <h4>Admin Panel</h4>

                            <br />
                            <br />
                            <br /><br />

                            <h5 className={selectedOption === 'dashboard' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOptionClick('dashboard'); }}>
                                <a href="/"><i className=" mx-3 fa-solid fa-table-columns"></i>Dashboard</a>
                            </h5>
                            <h5 className={selectedOption === 'users' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOptionClick('users'); }}>
                                <a href="/"> <i className="mx-3 fa-solid fa-users"></i> Users</a>
                            </h5>
                            <h5 className={selectedOption === 'upload' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOptionClick('upload'); }}>
                                <a href=""> <i className="mx-3 fa-solid fa-upload"></i> Upload</a>
                            </h5>
                        </div>

                        {renderPanel()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
