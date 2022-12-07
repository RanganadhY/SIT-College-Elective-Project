import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import { AdminLoader } from '../../components/loading component/loader';
import axios from "../../axios/axios";

//import css
import "../../css/adminCss/enableDisable.css";

export default function EnableDisable() {

    const data = useLocation().state;

    const [status, setStatus] = useState(data.status);
    const [isLoading, setisLoading] = useState(false);
    
    const handleChange = async(e) => {
        setisLoading(true);
        const res = await axios.post("/admin/set-status", {status: !status})
                                .catch((err)=>{
                                    setisLoading(true);
                                    console.log(err);
                                    alert("Something went wrong. Please try again later.");
                                });
        if(res.data){
            if(res.data.message === "successfull"){
                alert("Successfully updated the status");
                setStatus(!status);
            }else{
                alert("Something went wrong. Please try again later.");
            }
        }
        setisLoading(false);
    }

    return (
        <>
            <AdminNavbar/>
            {
                isLoading&&<AdminLoader/>
            }
            {
                !isLoading && <div className="switch-main-container">
                <div className="container">
                    <span className="heading">
                        Subject Selection
                    </span>
                    <div className="toggle-switch">
                        <input type="checkbox" defaultChecked={status} onChange={handleChange} className="checkbox" name="Subject Selection" id="Subject Selection" />
                        <label className="label" htmlFor="Subject Selection">
                            <span className="inner" />
                            <span className="switch" />
                        </label>
                    </div>
                </div>
            </div>
            }
        </>
    )
}
