import React from 'react'

//importing shtylesheet
import "../css/mapping.css";

//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'
import CycleMapping from '../components/cycleMapping/cycleMapping';


function Mapping() {
    const CollageBarnches = [
        {
            "branchname":"Artificial Intelligence & Data Science",
            "cycle":"P",
            "branchCode":"AD"
        },
        {
            "branchname":"Biotechnology",
            "cycle":"P",
            "branchCode":"BT"
        },
        {
            "branchname":"Chemical Engineering",
            "cycle":"P",
            "branchCode":"CH"
        },
        {
            "branchname":"Civil Engineering",
            "cycle":"C",
            "branchCode":"CV"
        },
        {
            "branchname":"Computer Science and Engineering",
            "cycle":"P",
            "branchCode":"CS"
        },
        {
            "branchname":"Computer Science and Engineering(AI&ML)",
            "cycle":"P",
            "branchCode":"ML"
        },
        {
            "branchname":"Electrical and Electronics Engineering",
            "cycle":"C",
            "branchCode":"EE"
        },
        {
            "branchname":"Electronics and Communication Engineering",
            "cycle":"P",
            "branchCode":"EC"
        },
        {
            "branchname":"Electronics and Instrumentation Engineering",
            "cycle":"P",
            "branchCode":"EI"
        },
        {
            "branchname":"Electronics & Telecommunication Engineering",
            "cycle":"C",
            "branchCode":"ET"
        },
        {
            "branchname":"Industrial Engineering and Management",
            "cycle":"P",
            "branchCode":"IM"
        },
        {
            "branchname":"Information Science and Engineering",
            "cycle":"P",
            "branchCode":"IS"
        },
        {
            "branchname":"Mechanical Engineering",
            "cycle":"C",
            "branchCode":"ME"
        },
    ]
    return (
        <>
            <AdminNavbar/>
            <div className="mapping-main-wrapper">
                <div className="mapping-main-container">
                    <div className="mapping-lables-conatiner">
                        <p className='mapping-labels-branch-p-tag'>Branch</p>
                        <p className='mapping-labels-cycle-p-tag'>P-Cycle</p>
                        <p className='mapping-labels-cycle-p-tag'>C-Cycle</p>
                    </div>
                    {
                        CollageBarnches.map((key,index)=>{
                            return(
                            
                                <CycleMapping
                                    branchName = {CollageBarnches[index].branchname}
                                    cycle= {CollageBarnches[index].cycle}
                                    name = {CollageBarnches[index].branchCode}
                                />
                            )
                        })
                    }
                    <div className="mapping-save-button-container">
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mapping