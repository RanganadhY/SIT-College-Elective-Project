import React,{useState} from 'react'
//importing th estylesheet
import "../cycleMapping/cycleMapping.css"
//Representation codes for Cycle
const cycleCodes = {
    "cCycle":18901,
    "pCycle":21334
}
function CycleMapping(props) {
    

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
                    <input 
                        type="radio"
                        name={props.name}
                        />
                    <input 
                        type="radio"
                        name={props.name}
                        />
                </div>
            </div>
        </>
    )
}

export default CycleMapping