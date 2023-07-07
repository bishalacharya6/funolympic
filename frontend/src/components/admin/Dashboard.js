import React, {useState, useEffect} from 'react'

const Dashboard = () => {

    const [userCount, setUserCount] = useState(0);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [uploadCount, setUploadCount] = useState(0);



    useEffect(() => {
        fetchUserCount();
        fetchBlockedUsers();
        fetchUploadCount();

    }, []);

    const fetchUserCount = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/countusers');
            const data = await response.json();
            setUserCount(data.count);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };


    const fetchBlockedUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/blocked');
            const data = await response.json();
            setBlockedUsers(data.blockedUsers);
        } catch (error) {
            console.error('Error fetching blocked users:', error);
        }
    };

    const fetchUploadCount = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/uploads/count');
            const data = await response.json();
            setUploadCount(data.count);
        } catch (error) {
            console.error('Error fetching upload count:', error);
        }
    };



    return (
        <>
            <div className="column-2 col-md-9">
                <div>
                    <h2>Dashboard</h2>
                    <br />
                    <br />
                </div>

                <div className="dashboard p-3 d-flex justify-content-evenly">
                    <div className='style'>
                        <i className="mx-3 fa-solid fa-users"></i>
                        <div className="left">
                            <h4>{userCount} Users</h4>
                            <p>Number of Users</p>
                        </div>
                    </div>

                    <div className='style'>
                        <i className="mx-3 fa-solid fa-upload"></i>
                        <div className="left">
                            <h4>{uploadCount} Uploads</h4>
                            <p>Uploads On Website</p>
                        </div>
                    </div>

                    <div className='style'>
                        <i className="fa-sharp fa-solid fa-user-minus"></i>
                        <div className="left">
                            <h4>{blockedUsers.length} BlockList</h4>
                            <p>Blocked Users</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
