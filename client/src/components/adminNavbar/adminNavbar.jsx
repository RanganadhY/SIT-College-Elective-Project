import React, {useState} from 'react'
import {NavLink, useNavigate} from "react-router-dom"

//importing stylesheet
import "../adminNavbar/adminnavbar.css"

import axios from "../../axios/axios";
import { AdminLoader } from '../loading component/loader';

function AdminNavbar() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    let status;

    const getSubjectSelectionStatus = async() => {
        setLoading(true);
        const res = await axios.get("/admin/get-status")
                                .catch((err)=>{
                                    console.log(err);
                                    alert("something went wrong. Please try again later.");
                                });
        if(res.data){
            if(res.data.message === "successfull"){
                navigate("/selection-enable-disable",{state:{status:res.data.status}})
                status=res.data.status;
            }else{
                alert(res.data.message);
            }
        }
        setLoading(false);
    }

    const getReportData = async()=>{
        setLoading(true);
        const res = await axios.get("/admin/generate-report")
                                .catch((err)=>{
                                    console.log(err);
                                    alert("Something went wrong. Please try again later");
                                });
        if(res.data){
            console.log(res.data);
            if(res.data.message==="successfull"){
                navigate("/report",{state:{"reportData":res.data.reportData}});
            }else{
                alert("Something went wrong. Please try again");
            }
        }
        setLoading(false);
    }


    return (
        <>
        {
            loading && <AdminLoader/>
        }
            <div className="adminNavabar-main-conatiner">
                <div className="adminNavbar-collage-heading">
                    <h2>Siddaganga Institute Of Technology</h2>
                </div>
                <ul className='adminnavbar-navlink-list'>
                    <li><NavLink to="/student-management">Student Mgmt</NavLink></li>
                    <li><NavLink to="/modify-subjects">Subject Mgmt</NavLink></li>
                    <li><NavLink to="/mapping">Mapping</NavLink></li>
                    <li onClick={getReportData}><a>Report</a></li>
                    <li onClick={getSubjectSelectionStatus}> <a>Settings</a></li>
                </ul>
            </div>
            
        </>
    )
}

export default AdminNavbar