import React from 'react'
//importing style sheet
import "../css/loginPage.css"
//importing background image
import loginIllustration from "../assets/images/undraw_mobile_login_re_9ntv.svg"

function LoginPage() {
    return (
        <>
            <div className="loginPage-main-wrapper">
                <div className="loginPage-main-container">
                    <div className="loginPage-col0-container">
                        <h2>Siddaganga Institue of Technology, Tumkuru</h2>
                    </div>
                    <div className="loginPage-col12-container">
                        <div className="loginPage-col1-container">
                            <div className="loginPage-credential-wrapper">
                                <div className="loginPage-credential-container">
                                    <div className="loginPage-login-header">
                                        <div>
                                            <h3>Student Login</h3>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="loginPage-feilds-wrapper">
                                        <input type="text" />
                                        <span>USN</span>
                                    </div>
                                    <div className="loginPage-feilds-wrapper">
                                        <input 
                                            type="password" />
                                        <span>Password</span>
                                    </div>
                                    
                                    <div className="loginPage-login-button-container">
                                        <div>
                                            <button>Login</button>
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

export default LoginPage