import React, { useState } from 'react';
import '../styles/admin.scss';

const Admin = () => {
    const [selectedOption, setSelectedOption] = useState('dashboard');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const renderPanel = () => {
        if (selectedOption === 'dashboard') {
            return (
                <div className="column-2 col-md-9">
                    <div>
                        <h2>Dashboard</h2>
                        <br />
                        <br />
                    </div>

                    <div className="dashboard p-3 d-flex justify-content-evenly">
                        <div className='style'>
                            <i class="mx-3 fa-solid fa-users"></i>
                            <div className="left">
                                <h4>100 Users</h4>
                                <p>Number of Users</p>
                            </div>
                        </div>

                        <div className='style'>
                            <i class="mx-3 fa-solid fa-upload"></i>
                            <div className="left">
                                <h4>150 Uploads</h4>
                                <p>Uploads On Website</p>
                            </div>
                        </div>

                        <div className='style'>
                            <i class="fa-sharp fa-solid fa-user-minus"></i>
                            <div className="left">
                                <h4>5 BlockList</h4>
                                <p>Blocked Users</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (selectedOption === 'users') {
            return (
                <div className="column-2 col-md-9">
                    <div>
                        <h2>Users</h2>

                    </div>

                    <div className="users p-3">
                        <div className="credentials-value">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John Doe</td>
                                        <td>johndoe</td>
                                        <td>johndoe@example.com</td>
                                        <td>
                                            <button>Block</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jane Smith</td>
                                        <td>janesmith</td>
                                        <td>janesmith@example.com</td>
                                        <td>
                                            <button>Block</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mike Johnson</td>
                                        <td>mikejohnson</td>
                                        <td>mikejohnson@example.com</td>
                                        <td>
                                            <button>Block</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sarah Williams</td>
                                        <td>sarahwilliams</td>
                                        <td>sarahwilliams@example.com</td>
                                        <td>
                                            <button>Block</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>David Brown</td>
                                        <td>davidbrown</td>
                                        <td>davidbrown@example.com</td>
                                        <td>
                                            <button>Block</button>
                                            <button>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                            <button className="btn btn-primary">Add Game</button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Upload News </h5>
                            <button className="btn btn-primary">Add News</button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Add Athletes </h5>
                            <button className="btn btn-primary">Add Players</button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Add Game Schedule </h5>
                            <button className="btn btn-primary">Add Schedule</button>
                        </div>
                        <div className="m-3  d-flex justify-content-between">
                            <h5>Upload Image </h5>
                            <button className="btn btn-primary">Add Image</button>
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
                                <a href="/"><i class=" mx-3 fa-solid fa-table-columns"></i>Dashboard</a>
                            </h5>
                            <h5 className={selectedOption === 'users' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOptionClick('users'); }}>
                                <a href="/"> <i class="mx-3 fa-solid fa-users"></i> Users</a>
                            </h5>
                            <h5 className={selectedOption === 'upload' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleOptionClick('upload'); }}>
                                <a href=""> <i class="mx-3 fa-solid fa-upload"></i> Upload</a>
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
