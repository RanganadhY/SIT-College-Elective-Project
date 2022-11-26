import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from "react-router-dom"

//importing the style sheet
import "../css/adminLogin.css";

function AdminLogin() {
    const navigate = useNavigate();
    const userNameRef = useRef();

    const [adminUserName, setadminUserName] = useState("");
    const [adminPassword, setadminPassword] = useState("")

    useEffect(()=>{
        userNameRef.current.focus()
    },[]);
    const handleLoginClick = async(e)=>{
        e.preventDefault();
        navigate("/student-management")
    }
    return (
        <>
            <form >
                <div className="adminlogin-main-wrapper">
                    <h2>Siddaganga Institute Of Technology</h2>
                    <div className="adminLogin-main-container">
                        <div className="adminLogin-credential-container">
                            <label htmlFor="">User Name</label>
                            <input 
                                placeholder='UserName'
                                ref={userNameRef}
                                type="text"
                                value={adminUserName}
                                onChange={(e)=>setadminUserName(e.target.value)}
                                required="true"
                                />
                        </div>
                        <div className="adminLogin-credential-container">
                            <label htmlFor="">Password</label>
                            <input
                                placeholder='Password'
                                value={adminPassword}
                                onChange={(e)=>setadminPassword(e.target.value)}
                                type="password" 
                                required="true"
                                />
                        </div>
                        <div className="adminLogin-login-button">
                            <button 
                                type='submit'
                                onClick={handleLoginClick}
                                >
                                    Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AdminLogin