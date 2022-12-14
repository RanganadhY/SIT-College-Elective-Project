import React,{useState,useEffect} from 'react'

import "../../css/studentCss/studentProfile.css"

import {useLocation, useNavigate} from "react-router-dom"

import axios from "../../axios/axios"


function VeiwElidgleSubjects() {

    //using useLocation hook to get the state that has 
    //been passed down from the student login page
    const {state} = useLocation();
    console.log(state)
    const navigate = useNavigate();

    const studentUsn = state[1]
    

    const [escSubjectState, setescSubjectState] = useState();
    const [electiveSubjectState, setelectiveSubjectState] = useState();

    const studentProfile = state[0].studentProfile

    var EscEligbleSubjectsArray = state[0].eligibleSubjects[0].esc
    var electiveEligbleSubjectsArray = state[0].eligibleSubjects[1].cyc

    var EscEligbleSubjectscodes =[];
    var electiveEligbleSubjectsCodes = [];

    for (let i=0;i<EscEligbleSubjectsArray.length;i++){
        EscEligbleSubjectscodes.push(EscEligbleSubjectsArray[i].code)
    }
    for(let i =0;i<electiveEligbleSubjectsArray.length;i++){
        electiveEligbleSubjectsCodes.push(electiveEligbleSubjectsArray[i].code)
    }
    
    //useEffcet for getting the status of ESC subjects
    useEffect(()=>{
        async function getEscStatus(){
            try{
                await axios.post("/admin/get-subjects-status",
                {
                    "eligibleSubjectCodes":EscEligbleSubjectscodes
                },
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                        },
                        withCredentials: true
                    }).then((response)=>{
                        setescSubjectState(response.data.subjectsCount);
                    }).catch((error)=>{
                        throw(error);
                    })
            }
            catch(error){
                console.log(error)
            }
            
        } 
        getEscStatus()
    },[])
    //useEffcet for getting the status of Cycle subjects
    useEffect(()=>{
        async function getCycleStatus(){
            try{
                await axios.post("/admin/get-subjects-status",
                {
                    "eligibleSubjectCodes":electiveEligbleSubjectsCodes
                },
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                        },
                        withCredentials: true
                    }).then((response)=>{
                        setelectiveSubjectState(response.data.subjectsCount)
                    }).catch((err)=>{
                        throw(err)
                    })
            }catch(error){
                console.log(error)
            }
            
        }
        getCycleStatus()
    },[]);

    

    const handleOptSubjects = async()=>{
        try{
            const possibleESCSubsTotake = [];
            const possibleSlectiveSubsTotake = []
            var statusOfOptingSubs;
            
            await axios.post("/admin/get-subjects-status",
                    {
                        "eligibleSubjectCodes":EscEligbleSubjectscodes
                    },
                        {
                            headers: { 
                                'Content-Type': 'application/json',
                                "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                            },
                            withCredentials: true
                        }
                ).then((response)=>{
                    // console.log(response.data.subjectsCount.length)
                    for(let i=0;i<response.data.subjectsCount.length;i++){
                        // console.log(response)
                        // console.log(((response.data.subjectsCount[i].maxCount) -(response.data.subjectsCount[i].enrolledCount))>0)
                        if(((response.data.subjectsCount[i].maxCount) -(response.data.subjectsCount[i].enrolledCount))>0){
                            // console.log("hello")
                            // console.log("hello")
                            possibleESCSubsTotake.push({"name":response.data.subjectsCount[i].name,"code":response.data.subjectsCount[i].code}); 
                            // console.log(possibleESCSubsTotake)
                        }
                        else{
                            continue
                        }
                    }
                }).catch((error)=>{
                    // console.log(error)
                    throw(error)
                })

                await axios.post("/admin/get-subjects-status",
                {
                    "eligibleSubjectCodes":electiveEligbleSubjectsCodes
                },
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                        },
                        withCredentials: true
                    }
            ).then((response)=>{
                
                for(let i=0;i<response.data.subjectsCount.length;i++){

                    if(((response.data.subjectsCount[i].maxCount)-(response.data.subjectsCount[i].enrolledCount))>0){
                        possibleSlectiveSubsTotake.push({"name":response.data.subjectsCount[i].name,"code":response.data.subjectsCount[i].code});
    
                    }
                    else{
                        continue
                    }
                }
            }).catch((error)=>{
                // console.log(error)
                throw(error)
            })
            
            if(state[0].studentProfile.subjectSelection[0]&&state[0].studentProfile.subjectSelection[1]){
                statusOfOptingSubs=0;
            }
            else if(state[0].studentProfile.subjectSelection[0]){
                statusOfOptingSubs = 2;
            }
            else {
                statusOfOptingSubs = 1;
            }
            var studentStateofOpting = 
            {
                possibleESCSubsTotake,
                possibleSlectiveSubsTotake,
                statusOfOptingSubs,
                "USN":state[1],
                "studentProfile":{
                    "name":studentProfile.name,
                    "cycle":studentProfile.cycle,
                    "branch":studentProfile.branch,
                    "semester":studentProfile.semester
                }
            }
            console.log(studentStateofOpting);
            navigate("/opting-subjects",{state:studentStateofOpting})
        }catch(err){
            console.log(err)
        }
        
        
    }

    const handleVeiwOpetedSubs = async()=>{
        try{
            await axios.post("/student/registered-subjects",
                {
                    "usn":studentUsn
                },
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        "authorization":"Bearer "+String(localStorage.getItem("authToken"))
                    },
                    withCredentials: true
                }
            ).then((response)=>{
                if(response.data.studiedSubjects.length===0){
                    alert("You haven't opted any subjects yet")
                }
                else{
                    navigate("/veiw-opted-subjects",
                    {state:{
                        "studentDetails":{
                            "studentUsn":studentUsn,
                            "name":studentProfile.name,
                            "branch":studentProfile.branch,
                            "semester":studentProfile.semester,
                            "cycle":studentProfile.cycle
                        },
                        "optedSubjects":response.data.studiedSubjects}})
                }
            }).catch((err)=>{
                throw(err)
            })
        }
        catch(err){
            console.log(err)
            alert(err.message)
        }
        
    }


    return (
        <>
            <div className="sp-main-wrapper">
                <div className="sp-main-container">
                    <div className="sp-student-profile-container">
                        {/* <div className="sp-student-profile-col1">
                            <div className="sp-student-profile-name sp-student-profile-detail">
                                <h2>{studentProfile.name}</h2>
                            </div>
                            <div className="sp-student-profile-branch sp-student-profile-detail">
                                <h3>{studentProfile.branch}</h3>
                            </div>
                            <div className="sp-student-profile-sem-details sp-student-profile-detail">
                                <div className="sp-student-semester">
                                    <h4>Sem</h4>
                                    <p>{studentProfile.semester}</p>
                                </div>
                                <div className="sp-student-cycle">
                                    <h4>Cycle</h4>
                                    <p>{studentProfile.cycle}</p>
                                </div>
                            </div>
                            
                            
                        </div> */}
                        <div className="sp-student-info">
                            <div className="sp-student-name">
                                <p>{studentProfile.name}</p>
                            </div>
                            <div className="sp-student-branch">
                                <p>{studentProfile.branch}</p>
                            </div>
                            <div className="sp-student-sem">
                                <p>Sem:</p>
                                <p>{studentProfile.semester}</p>
                            </div>
                            <div className="sp-student-semester">
                                <p>Cycle:</p>
                                <p>{studentProfile.cycle}</p>
                            </div>
                        </div>
                        
                        <div className="sp-student-profile-col2">
                            
                            <div className="sp-student-profile-button-actions-container">
                                <div className='veiw-opted-subjects'>
                                    <button 
                                        onClick={handleVeiwOpetedSubs}
                                        className='veiw-opted-subjects-button'>Opted Subjects</button>
                                </div>
                                <div className='opting-subjects-button'>
                                    <button 
                                        disabled={state[0].studentProfile.subjectSelection[0]&&state[0].studentProfile.subjectSelection[1]}
                                        onClick={handleOptSubjects}
                                        className={state[0].studentProfile.subjectSelection[0]&&state[0].studentProfile.subjectSelection[1]?'veiw-opted-subjects-display-none-button':"veiw-opted-subjects-button"}>Select Subjects</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sp-student-eligible-subjects">
                        
                        <div className="sp-student-ESC-container">
                            <div className="sp-ESC-heading">
                                <h2>Engineering Sciences Courses</h2>
                            </div>
                            <div className="sp-ESC-subjects-container">
                                <table  
                                className='sp-Esc-subject-table'>
                                    <thead>
                                        <tr>
                                            <th>Subject Code</th>
                                            <th>Subject Name</th>
                                            <th>Max Limit</th>
                                            <th>Vacancies Left</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {escSubjectState&&escSubjectState.map((key, index)=>{
                                            return(
                                                <tr>
                                                    <td>{escSubjectState[index].code}</td>
                                                    <td>{escSubjectState[index].name}</td>
                                                    <td>{escSubjectState[index].maxCount}</td>
                                                    <td>{escSubjectState[index].maxCount-escSubjectState[index].enrolledCount}</td>
                                                </tr>
                                            )
                                            
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        
                        <div className="sp-student-ESC-container">
                            <div className="sp-ESC-heading">
                                <h2>Elective Courses</h2>
                            </div>
                            <div className="sp-ESC-subjects-container">
                                <table  
                                className='sp-Esc-subject-table'>
                                    <thead>
                                        <tr>
                                            <th>Subject Code</th>
                                            <th>Subject Name</th>
                                            <th>Max Limit</th>
                                            <th>Vacancies Left</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {electiveSubjectState&&electiveSubjectState.map((key, index)=>{
                                            return(
                                                <tr>
                                                    <td>{electiveSubjectState[index].code}</td>
                                                    <td>{electiveSubjectState[index].name}</td>
                                                    <td>{electiveSubjectState[index].maxCount}</td>
                                                    <td>{electiveSubjectState[index].maxCount-electiveSubjectState[index].enrolledCount}</td>
                                                </tr>
                                            )
                                            
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VeiwElidgleSubjects 