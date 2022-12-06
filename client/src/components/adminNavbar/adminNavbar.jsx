import React from 'react'
import {NavLink,Link} from "react-router-dom"

//importing stylesheet
import "../adminNavbar/adminnavbar.css"

function AdminNavbar() {
    return (
        <>
            <div className="adminNavabar-main-conatiner">
                <div className="adminNavbar-collage-heading">
                    <h2>Siddaganga Institute Of Technology</h2>
                </div>
                <ul className='adminnavbar-navlink-list'>
                    <li><NavLink to="/student-management">Student Mngt</NavLink></li>
                    <li><NavLink to="/modify-subjects">Subject Mngt</NavLink></li>
                    <li><NavLink to="/mapping">Mapping</NavLink></li>
                    <li><NavLink to="/report">Report</NavLink></li>

                </ul>
            </div>
            
        </>
    )
}

export default AdminNavbar