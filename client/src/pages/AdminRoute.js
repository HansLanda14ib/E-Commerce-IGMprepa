import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAppContext} from '../context/user_context';

const AdminRoute = ({children}) => {
    const {user} = useAppContext();
    if (user && user.role !== 'admin') {
        return <Navigate to='/'/>;
    }
    return children;
};
export default AdminRoute;
