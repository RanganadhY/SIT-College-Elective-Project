import React,{useState} from 'react'
//importing th estylesheet
import "../cycleMapping/cycleMapping.css"
//Representation codes for Cycle
const cycleCodes = {
    "cCycle":18901,
    "pCycle":21334
}
function CycleMapping(props) {
    
    const handleSave = async(req,res,next)=>{}

    return (
        <>
            <div className="cycleMapping-main-container">
                <div className="cycleMapping-branch-input-container">
                    <input 
                        type="text"
                        value={props.branchName}
                        readOnly="true"
                        />
                </div>
                <div className="cycleMapping-cycles-container">

                    <label htmlFor={props.name}></label>
                    <input 
                        type="radio"
                        name={props.name}
                        value="Physics"
                        />
                    <input 
                        type="radio"
                        name={props.name}
                        value="Chemistry"
                        />
                </div>
            </div>
        </>
    )
}

export default CycleMapping