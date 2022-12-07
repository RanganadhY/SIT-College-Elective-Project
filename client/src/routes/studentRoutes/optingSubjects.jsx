import React,{useState} from 'react'
import {useLocation} from "react-router-dom"
//importing style sheet
import "../../css/studentCss/optingSubjects.css"
//importing loading
import {StudentLoader} from "../../components/loading component/loader"
import axios from "../../axios/axios"

function OptingSubjects() {

    const {state} = useLocation();

    const [isLoading, setisLoading] = useState(false);

    const [escSubState, setescSubState] = useState("NA");
    const [isEscSaved, setisEscSaved] = useState(false);

    const [electiveSubState, setelectiveSubState] = useState("NA");

    const [errMsg, seterrMsg] = useState("")

    //handling ESC save
    const handleEscSave = async()=>{
        setisLoading(true);
        const userDetails = {
            "usn":state.USN,
            "subjectCode":escSubState
        }
        console.log(userDetails)

        try{
            await axios.post("/student/opt-subject",userDetails,
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                    },
                    withCredentials: true
                }
                ).then((response)=>{
                    console.log(response)
                })
                .catch((error)=>{
                    throw(error)
                })
        }catch(error){
            setisLoading(false);
        }
        finally{
            setisLoading(false);
        }
    }

    return (
        <>
            {
                isLoading&&<StudentLoader/>
            }
            <div className="os-main-wrapper">
                <div className="os-main-container">
                    <div className="os-main-heading">
                        <h2>Select Your Subjects below</h2>
                    </div>
                    <div className="os-Esc-selection">
                        <div className="os-esc-heading">
                            <h3>Engineering Science Course:</h3>
                        </div>
                        <div className="os-esc-subject-select-option">
                            <select 
                                name="" 
                                id=""
                                value={escSubState}
                                onChange={(e)=>setescSubState(e.target.value)}
                                >
                                
                                <option value="NA">-SELECT-</option>
                                {state&&state.possibleESCSubsTotake.map((key,index)=>{
                                    return(
                                        <option 
                                            value={state.possibleESCSubsTotake[index].code}>
                                            {state.possibleESCSubsTotake[index].name}
                                        </option>
                                    )
                                    
                                })}
                            </select>
                            <div className="os-esc-save-option">
                                <button
                                    className='os-esc-save-button'
                                    onClick={handleEscSave}
                                >Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="os-elective-selection">
                        <div className="os-esc-heading">
                            <h3>Elective Course:</h3>
                        </div>
                        <div className="os-esc-subject-select-option">
                            <select 
                                name="" 
                                id=""
                                value={electiveSubState}
                                onChange={(e)=>setelectiveSubState(e.target.value)}
                                >
                                <option value="NA">-SELECT-</option>
                                {state&&state.possibleSlectiveSubsTotake.map((key,index)=>{
                                    return(
                                        <option 
                                            value={state.possibleSlectiveSubsTotake[index].code}>
                                                {state.possibleSlectiveSubsTotake[index].name}</option>
                                    )
                                    
                                })}
                            </select>
                            <div className="os-esc-save-option">
                                <button
                                    className='os-esc-save-button'
                                >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OptingSubjects