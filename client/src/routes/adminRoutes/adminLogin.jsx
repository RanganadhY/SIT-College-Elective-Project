import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"

//importing the style sheet
import "../../css/adminCss/adminLogin.css";
//importing axios
import axios from "../../axios/axios"
//importing background image
import loginIllustration from "../../assets/images/undraw_terms_re_6ak4.svg"

//importing loader
import {AdminLoader} from "../../components/loading component/loader";

function AdminLogin() {
    const navigate = useNavigate();
    // const userNameRef = useRef();

    const [adminEmail, setadminEmail] = useState("");
    const [adminPassword, setadminPassword] = useState("");

    const [errorMessage, seterrorMessage] = useState("");
    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
        seterrorMessage("")
    },[adminEmail,adminPassword]);

    const handleAdminLogin = async(e)=>{
        e.preventDefault();
        var adminEnteredDetails = {
            'email':adminEmail,
            "password":adminPassword
        }
        try{
            setisLoading(true);
            if(window.navigator.onLine){
                const adminLoginresponce = await axios.post("/authentication/admin-login",adminEnteredDetails,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                .then((loginResponse)=>{
                    setisLoading(false)
                    const authInfo = {"role":loginResponse.data.roles,"token":loginResponse.data.token};
                    window.localStorage.setItem("authInfo",JSON.stringify(authInfo))
                    navigate("/student-management");
                    
                })
                .catch((error)=>{
                    throw(error)
                })
            }
            else{
                seterrorMessage("Please connect to Internet")
            }
        }catch(error){
                setisLoading(false)
                seterrorMessage(error.response.data.message)
        }
        finally{
            setisLoading(false)
        }
    }
    return (
        <>
            {
                isLoading&&<AdminLoader/>
            }
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
                                        <input 
                                            type="text"
                                            required="true"
                                            value={adminEmail}
                                            onChange={(e)=>setadminEmail(e.target.value)}
                                            />
                                        <span>User Name</span>
                                    </div>
                                    <div className="adminloginPage-feilds-wrapper">
                                        <input 
                                            type="password"
                                            required="true"
                                            value={adminPassword}
                                            onChange={(e)=>setadminPassword(e.target.value)}
                                            />
                                        <span>Password</span>
                                    </div>
                                    
                                    <div className="adminloginPage-login-button-container">
                                        <div>
                                            <button onClick={handleAdminLogin}>Login</button>
                                        </div>
                                        
                                    </div>
                                    <div className={errorMessage?"loginPage-login-result-container":".loginPage-login-result-display-none-container"}>
                                        {errorMessage&&<p className=''>{errorMessage}</p>}
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