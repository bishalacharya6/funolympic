import React, { useEffect, useState } from 'react';

const GetUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/getusers');
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleBlockUser = (userId) => {
        setSelectedUserId(userId);
        setShowBlockModal(true);
    };

    const handleConfirmBlock = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/getusers/${users.find((user) => user._id === selectedUserId)?.blocked ? 'unblock' : 'block'}/${selectedUserId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                setShowBlockModal(false);
                fetchUsers();
            } else {
                console.error('Error blocking/unblocking user');
            }
        } catch (error) {
            console.error('Error blocking/unblocking user:', error);
        }
    };

    const handleCancelBlock = () => {
        setShowBlockModal(false);
    };

    const handleDeleteUser = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/getusers/delete/${selectedUserId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setShowDeleteModal(false);
                fetchUsers();
            } else {
                console.error('Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="column-2 col-md-9">
            <div>
                <h2>Users</h2>
            </div>

            <div className="users p-3">
                <div className="credentials-value">
                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>EVerified</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.blocked ? 'Blocked' : 'Not Blocked'}</td>
                                        <td>{user.emailVerified ? 'Verified' : 'Not Verified'}</td>
                                        <td>
                                            <button onClick={() => handleBlockUser(user._id)}>
                                                {user.blocked ? 'Unblock' : 'Block'}
                                            </button>
                                            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Block/Unblock Modal */}
            {showBlockModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">
                                    {users.find((user) => user._id === selectedUserId)?.blocked
                                        ? 'Confirmation to Unblock'
                                        : 'Confirmation to Block'}
                                </h1>
                                <button type="button" className="btn-close" onClick={handleCancelBlock}></button>
                            </div>
                            <div className="modal-body">
                                {users.find((user) => user._id === selectedUserId)?.blocked
                                    ? 'Are you sure you want to unblock this user?'
                                    : 'Are you sure you want to block this user?'}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleConfirmBlock}>
                                    {users.find((user) => user._id === selectedUserId)?.blocked ? 'Unblock' : 'Block'}
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCancelBlock}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Confirmation to Delete</h1>
                                <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this user?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                                    Delete
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCancelDelete}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetUser;
