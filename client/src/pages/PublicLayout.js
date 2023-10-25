// PublicLayout.js
import React from 'react';
import {Navbar, Sidebar} from '../components/';
import {Outlet} from "react-router-dom";


const PublicLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div>
                <Outlet/>
            </div>
        </div>
    );
};

export default PublicLayout;
