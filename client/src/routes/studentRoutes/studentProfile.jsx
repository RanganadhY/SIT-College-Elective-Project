import React,{useState} from 'react'

import {useLocation, useNavigate} from "react-router-dom"

import {AdminLoader} from "../../components/loading component/loader"

function VeiwElidgleSubjects() {

    //using useLocation hook to get the state that has 
    //been passed down from the student login page
    const {state} = useLocation()
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
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default VeiwElidgleSubjects 