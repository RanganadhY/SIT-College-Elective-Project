import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from "react-router-dom"

//importing the style sheet
import "../../css/adminCss/adminLogin.css";
//importing background image
import loginIllustration from "../../assets/images/undraw_terms_re_6ak4.svg"

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
            <div className="adminloginPage-main-wrapper">
                <div className="adminloginPage-main-container">
                    <div className="adminloginPage-col0-container">
                        <h2>Siddaganga Institue of Technology, Tumakuru</h2>
                    </div>
                    <div className="adminloginPage-col12-container">
                        <div className="adminloginPage-col1-container">
                            <div className="adminloginPage-credential-wrapper">
                                <div className="adminloginPage-credential-container">
                                    <div className="adminloginPage-login-header">
                                        <div>
                                            <h3>Admin Login</h3>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="adminloginPage-feilds-wrapper">
                                        <input type="text" />
                                        <span>User Name</span>
                                    </div>
                                    <div className="adminloginPage-feilds-wrapper">
                                        <input 
                                            type="password" />
                                        <span>Password</span>
                                    </div>
                                    
                                    <div className="adminloginPage-login-button-container">
                                        <div>
                                            <button onClick={handleAdminLogin}>Login</button>
                                        </div>
                                        
                                    </div>
                                    <div className="adminloginPage-login-result-container">
                                        {/* <p>Wrong Details</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="adminloginPage-col2-container">
                            <img src={loginIllustration} alt="" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default AdminLogin