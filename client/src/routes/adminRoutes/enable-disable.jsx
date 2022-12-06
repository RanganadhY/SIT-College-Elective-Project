import React, {useState, useEffect} from 'react';

//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
import axios from "../../axios/axios";

//import css
import "../../css/adminCss/enableDisable.css";

export default function EnableDisable() {

    const [status, setStatus] = useState();
    
    const handleChange = async(e) => {
        console.log("hi")
        const res = await axios.post("/admin/set-status", {status: !status})
                                .catch((err)=>{
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
    }

    const getSubjectSelectionStatus = async() => {
        const res = await axios.get("/admin/get-status")
                                .catch((err)=>{
                                    console.log(err);
                                    alert("something went wrong. Please try again later.");
                                });
        if(res.data){
            if(res.data.message === "successfull"){
                setStatus(res.data.status);
            }
        }
    }

    useEffect(()=>{
        async function fetchStatus(){
            await getSubjectSelectionStatus();
        }
        fetchStatus();
    }, [])

    return (
        <>
            <AdminNavbar/>
            <div className="switch-main-container">
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
        </>
    )
}
