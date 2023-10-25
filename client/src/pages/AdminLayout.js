// AdminLayout.js
import React from 'react';
import {SharedLayout} from "./dashboard";
import {PrivateRoute} from "./index";
import './admin-style.module.css'

const AdminLayout = ({children}) => {
    return <div>
        <PrivateRoute>
            <SharedLayout/>
        </PrivateRoute>


        {children}
    </div>;
};

export default AdminLayout;
