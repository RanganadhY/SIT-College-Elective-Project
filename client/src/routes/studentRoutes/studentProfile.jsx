import React,{useState} from 'react'

import "../../css/studentCss/studentProfile.css"

import {useLocation, useNavigate} from "react-router-dom"

import {AdminLoader} from "../../components/loading component/loader"

function VeiwElidgleSubjects() {

    //using useLocation hook to get the state that has 
    //been passed down from the student login page
    const {state} = useLocation()
    const studentProfile = state.studentProfile
    console.log(state)

const [isLoading, setisLoading] = useState(false)

    return (
        <>
            {
                isLoading&&<AdminLoader/>
            }
            <div className="sp-main-wrapper">
                <div className="sp-main-container">
                    <div className="sp-student-profile-container">
                        <div className="sp-student-profile-col1">
                            <div className="sp-student-profile-name sp-student-profile-detail">
                                <h2>{studentProfile.name}</h2>
                            </div>
                            <div className="sp-student-profile-branch sp-student-profile-detail">
                                <h3>{studentProfile.branch}</h3>
                            </div>
                            <div className="sp-student-profile-sem-details sp-student-profile-detail">
                                <div className="sp-student-semester">
                                    <h4>Semester</h4>
                                    <p>1st</p>
                                </div>
                                <div className="sp-student-cycle">
                                    <h4>Cycle</h4>
                                    <p>{studentProfile.cycle}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="sp-student-profile-col2">
                            
                            <div className="sp-student-profile-button-actions-container">
                                <div className='veiw-opted-subjects'>
                                    <button className='veiw-opted-subjects-button'>Veiw Opted Subjects</button>
                                </div>
                                <div>
                                    <button className='veiw-opted-subjects-button'>Opt Subjects</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sp-student-eligible-subjects">

                    </div>
                </div>
            </div>
        </>
    )
}

export default VeiwElidgleSubjects 