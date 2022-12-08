    import React,{useState} from 'react'
import {useNavigate, useLocation} from "react-router-dom"
//importing style sheet
import "../../css/studentCss/optingSubjects.css"
//importing loading
import {StudentLoader} from "../../components/loading component/loader"
import axios from "../../axios/axios"

function OptingSubjects() {

    const {state} = useLocation();
    // console.log(state)
    const navigate = useNavigate()

    const [isLoading, setisLoading] = useState(false);

    const [escSubState, setescSubState] = useState("NA");
    const [isEscSaved, setisEscSaved] = useState(false);
    const [escResultMsg, setescResultMsg] = useState("");

    const [electiveSubState, setelectiveSubState] = useState("NA");
    const [isElectiveSubSaved, setisElectiveSubSaved] = useState(false)
    const [electiveMsg, setelectiveMsg] = useState("");

    const [errMsg, seterrMsg] = useState("");

    // console.log(state.possibleESCSubsTotake)

    //handling ESC save
    const handleEscSave = async()=>{
        setisLoading(true);
        const userDetails = {
            "usn":state.USN,
            "subjectCode":escSubState
        }
        console.log(userDetails)
        if(escSubState ==="NA"){
            alert("Please Select a Subject");
            setisLoading(false)
        }
        else{
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
                        if(response.status ===200){
                            if(response.data.code === 608){
                                setescResultMsg(response.data.message);//saved sucessfully
                                setisEscSaved(true)
                                alert(response.data.message)
                            }
                            else if(response.data.code === 607){
                                setescResultMsg(response.data.message); //you have 
                                setescSubState(true);
                                setisEscSaved(true)
                                alert(response.data.message)
                            }
                            else if(response.data.code === 606){
                                setescResultMsg(response.data.message);//subject is full no one can take it
                                setescSubState(true)
                                setisEscSaved(false)
                                alert(response.data.message) 
                            }
                            else{
                                setescResultMsg(false);
                                setescResultMsg(response.data.message)
                                alert(response.data.message)
                            }
                        }
                    })
                    .catch((error)=>{
                        throw(error)
                    })
            }catch(error){
                setisLoading(false);
                setescResultMsg(error.message);
                alert(error.data.message)
            }
            finally{
                setisLoading(false);
            }
        }
        
    }
    const handleElectiveSave = async()=>{
        setisLoading(true);
        const userDetails = {
            "usn":state.USN,
            "subjectCode":electiveSubState
        }
        console.log(userDetails);
        if(electiveSubState ==="NA"){
            alert("Please Select a Subject");
            setisLoading(false)
        }
        else{
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
                        if(response.status ===200){
                            if(response.data.code === 608){
                                setelectiveMsg(response.data.message);//saved sucessfully
                                setisElectiveSubSaved(true)
                                alert(response.data.message);
                                navigate("/")

                            }
                            else if(response.data.code === 607){
                                setelectiveMsg(response.data.message); //you have 
                                setisElectiveSubSaved(true);
                                alert(response.data.message)
                            }
                            else if(response.data.code === 606){
                                setelectiveMsg(response.data.message);//subject is full no one can take it
                                setisElectiveSubSaved(false);
                                alert(response.data.message) 
                            }
                            else{
                                setelectiveMsg(false);
                                setelectiveMsg(response.data.message)
                                alert(response.data.message)
                            }
                        }
                    })
                    .catch((error)=>{
                        throw(error)
                    })
            }catch(error){
                setisLoading(false);
                setelectiveMsg(error.message);
                alert(error.data.message)
            }
            finally{
                setisLoading(false);
            }
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
                
                    <div className="os-selection-selection">
                    <div className="os-Esc-selection" disabled={true}>
                        <div className="os-esc-heading">
                            <h3>Engineering Science Course:</h3>
                        </div>
                        <div className="os-esc-subject-select-option">
                                <select 
                                    name="" 
                                    id=""
                                    disabled={isEscSaved}
                                    value={escSubState}
                                    onChange={(e)=>setescSubState(e.target.value)}
                                    >
                                    
                                    <option   value="NA">-SELECT-</option>
                                    {state.possibleESCSubsTotake&&state.possibleESCSubsTotake.map((key,index)=>{
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
                                        disabled={isEscSaved}
                                        className={isEscSaved?"os-esc-save-button-disabled":'os-esc-save-button'}
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
                                    disabled={!isEscSaved || isElectiveSubSaved}
                                    value={electiveSubState}
                                    onChange={(e)=>setelectiveSubState(e.target.value)}
                                    >
                                    <option hidden={true} value="NA">-SELECT-</option>
                                    {state.possibleSlectiveSubsTotake.map((key,index)=>{
                                        return(
                                            <option 
                                                value={state.possibleSlectiveSubsTotake[index].code}>
                                                    {state.possibleSlectiveSubsTotake[index].name}</option>
                                        )
                                        
                                    })}
                                </select>
                                <div className="os-esc-save-option">
                                    <button
                                        disabled={!isEscSaved}
                                        className={!isEscSaved?"os-button-disabled":'os-esc-save-button'}
                                        onClick={handleElectiveSave}
                                    >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default OptingSubjects