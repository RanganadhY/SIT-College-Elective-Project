import React ,{useState,useEffect}from 'react'
import {json, useNavigate} from "react-router-dom"
//importing style sheet
import "../css/studentLoginPage.css"
//importing background image
import loginIllustration from "../assets/images/undraw_mobile_login_re_9ntv.svg"
//importing axios
import axios from "../axios/axios"
//importing loader
import {StudentLoader,AdminLoader} from "../components/loading component/loader";


function StudentLoginPage() {

    //use location hook
    

    const [studentUsn, setstudentUsn] = useState("");
    const [studentPassword, setstudentPassword] = useState("");
    const [errorMessage, seterrorMessage] = useState("");
    const [isLoading, setisLoading] = useState(false);

    //useEffect so that if any invalid msg is hwon based on that if user 
    //is trying to enter the details again invalid mng will not be diplayed
    useEffect(()=>{
        seterrorMessage("")
    },[studentUsn,studentPassword])
    const navigate = useNavigate();
    const handleStudentLogin = async(e)=>{
        e.preventDefault();
        var studentEnteredDetails = {
            studentUsn,
            "password":studentPassword
        }
        try{
            setisLoading(true);
            if(window.navigator.onLine){
                const studentLoginresponce = await axios.post("/authentication/student-login",studentEnteredDetails,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                .then(async (loginResponse)=>{
                    setisLoading(false)

                    //storing the auth information {token,role} in the local storage 
                    //to mainatin a presistent state of logged in user
                    
                    window.localStorage.setItem("authToken",loginResponse.data.token);

                    const authInfo = {"role":loginResponse.data.roles,"token":loginResponse.data.token};
                    window.localStorage.setItem("authInfo",JSON.stringify(authInfo));

                    //making a request to the students elidigle subjects
                    var loggedStudentDetail = {
                        "usn":studentUsn
                    }
                    const fetchStudentSubDetail = await axios.post("/student/student-details",loggedStudentDetail,
                        {
                            headers: { 
                                'Content-Type': 'application/json',
                                "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                            },
                            withCredentials: true
                        }
                    ).then((res)=>{
                        
                    })
                    
                    navigate("/existing-subjects");
                    
                })
                .catch((error)=>{
                    throw(error)
                })
            }
            else{
                seterrorMessage("Please connect to Internet")
            }
            // console.log(studentLoginresponce)
            // if(studentLoginresponce.data.token){
            //     navigate("/existing-subjects")
            // }
            
            
        }catch(error){
                setisLoading(false)
                seterrorMessage(error.response.data.message)
                
        }
        finally{
            // seterrorMessage("Something Went Wrong")
            setisLoading(false)
        }
    }

    
    return (
        <>
            {
                isLoading&&<StudentLoader/>
            }
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
                                                type="password"
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
                                        <div className={errorMessage?"loginPage-login-result-container":".loginPage-login-result-display-none-container"}>
                                            {errorMessage&&<p className=''>{errorMessage}</p>}
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