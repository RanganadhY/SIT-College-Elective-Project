import React ,{useState}from 'react'
import {json, useNavigate} from "react-router-dom"
//importing style sheet
import "../css/studentLoginPage.css"
//importing background image
import loginIllustration from "../assets/images/undraw_mobile_login_re_9ntv.svg"
//importing axios
import axios from "../axios/axios"

//importing auth hook
import useAuth from '../hooks/useAuth';

function StudentLoginPage() {

    //auth hook
    const {auth,setAuth} = useAuth();

    const [studentUsn, setstudentUsn] = useState("");
    const [studentPassword, setstudentPassword] = useState("");
    const [errorMessage, seterrorMessage] = useState("")

    const navigate = useNavigate();
    const handleStudentLogin = async(e)=>{
        e.preventDefault();
        var studentEnteredDetails = {
            studentUsn,
            "password":studentPassword
        }
        try{
        
            const studentLoginresponce = await axios.post("/authentication/student-login",studentEnteredDetails,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then((loginResponse)=>{
                const authInfo = {"role":loginResponse.data.roles,"token":loginResponse.data.token};
                window.localStorage.setItem("authInfo",JSON.stringify(authInfo))
                navigate("/existing-subjects");

                
            })
            .catch((error)=>{
                throw(error)
            })
            // console.log(studentLoginresponce)
            // if(studentLoginresponce.data.token){
            //     navigate("/existing-subjects")
            // }
            
            
        }catch(error){
                seterrorMessage(error.response.data.message)
                console.log(error.response.data.message)
        }
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
                                                <h3>Student Login</h3>
                                            </div>
                                            
                                        </div>
                                        <div className="loginPage-feilds-wrapper">
                                            <input 
                                                type="text"
                                                value={studentUsn}
                                                onChange={(e)=>setstudentUsn(e.target.value)}
                                                required="true"
                                                />
                                            <span>USN</span>
                                        </div>
                                        <div className="loginPage-feilds-wrapper">
                                            <input 
                                                type="text"
                                                value={studentPassword}
                                                onChange={(e)=>setstudentPassword(e.target.value)}
                                                required="true"
                                                />
                                            <span>Password</span>
                                        </div>
                                        
                                        
                                        <div className="loginPage-login-button-container">
                                            <div>
                                                <button
                                                    onClick={handleStudentLogin}
                                                    >Login</button>
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

export default StudentLoginPage