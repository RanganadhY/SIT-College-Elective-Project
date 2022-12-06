import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from "react-router-dom"

//importing the style sheet
import "../css/adminLogin.css";
//importing background image
import loginIllustration from "../assets/images/undraw_terms_re_6ak4.svg"

function AdminLogin() {
    const navigate = useNavigate();
    // const userNameRef = useRef();

    // const [adminUserName, setadminUserName] = useState("");
    // const [adminPassword, setadminPassword] = useState("")

    // useEffect(()=>{
    //     userNameRef.current.focus()
    // },[]);
    // const handleLoginClick = async(e)=>{
    //     e.preventDefault();
    //     navigate("/student-management")
    // }
    const handleAdminLogin = async(e)=>{
        e.preventDefault();
        navigate("/student-management")
    }
    return (
        <>
            <div className="loginPage-main-wrapper">
                <div className="loginPage-main-container">
                    <div className="loginPage-col0-container">
                        <h2>Siddaganga Institue of Technology, Tumakuru</h2>
                    </div>
                    <div className="loginPage-col12-container">
                        <div className="loginPage-col1-container">
                            <div className="loginPage-credential-wrapper">
                                <div className="loginPage-credential-container">
                                    <div className="loginPage-login-header">
                                        <div>
                                            <h3>Admin Login</h3>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="loginPage-feilds-wrapper">
                                        <input type="text" />
                                        <span>User Name</span>
                                    </div>
                                    <div className="loginPage-feilds-wrapper">
                                        <input 
                                            type="password" />
                                        <span>Password</span>
                                    </div>
                                    
                                    <div className="loginPage-login-button-container">
                                        <div>
                                            <button onClick={handleAdminLogin}>Login</button>
                                        </div>
                                        
                                    </div>
                                    <div className="loginPage-login-result-container">
                                        {/* <p>Wrong Details</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loginPage-col2-container">
                            <img src={loginIllustration} alt="" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AdminLogin