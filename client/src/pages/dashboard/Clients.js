import React, {useEffect, useState} from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import axios from "axios";

const Clients = () => {
    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/v1/users');
            //console.log(response.data.users)
            setUsers(response.data.users); // Assuming response.data is the array of users
        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();


    return (
        <Wrapper>
            <div>
                <h1>Clients</h1>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.name} {user.email}</li>

                    ))}
                </ul>
            </div>
        </Wrapper>
    );
};

export default Clients;
