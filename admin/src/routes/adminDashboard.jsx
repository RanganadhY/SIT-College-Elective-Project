import React from 'react';

//importing the style sheet
import "../css/adminDashboard.css";

import AdminNavbar from '../components/adminNavbar/adminNavbar';

function AdminDashboard() {
    return (
        <>
            <div className="adminDashboard-main-wrapper">
                <div className="adminDashboard-main-container">
                    <div className="adminDashbaord-navigation-bar">
                        <AdminNavbar/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard