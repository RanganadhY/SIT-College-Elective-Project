import React,{useState,useEffect} from 'react'

//importing sytylesheet
import "./Subject.css"

export function AddESCsubject() {
    //defining states for storing input data
    const [subjectCodeState, setsubjectCodeState] = useState("");
    const [subjectNameState, setsubjectNameState] = useState("");
    const [subjectMaxLimit, setsubjectMaxLimit] = useState("");
    const [subjectExcludedbranches, setsubjectExcludedbranches] = useState([])
    return (
        <div className='addESCSubject-main-wrapper'>
            <div className='addESCSubject-input-feilds-wrapper'>
                <input 
                    type="text"
                    placeholder='Subject Code'
                    className='addESCSubject-input-subject-code-container'
                    value={subjectCodeState}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input 
                    type="text" 
                    placeholder='Subject Name'
                    className='addESCSubject-input-subject-name-container'
                    value={subjectNameState}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Max Limit'
                    className='addESCSubject-input-subject-max-limit-container'
                    value={subjectMaxLimit}
                    onChange={(e)=>setsubjectMaxLimit(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Excluded Branches'
                    className='addESCSubject-input-subject-excluding-branches-container'
                    value={subjectExcludedbranches}
                    onChange={(e)=>setsubjectExcludedbranches(e.target.value)}
                    />
                
            </div>
            <div className='addESCSubject-add-button-container'>
                <button>Add</button>
            </div>
        </div>
    )
}

export function AddCyclesubject() {

    const [subjectCodeState, setsubjectCodeState] = useState("");
    const [subjectNameState, setsubjectNameState] = useState("");
    const [subjectMaxLimit, setsubjectMaxLimit] = useState("");
    const [subjectCycleState, setsubjectCycleState] = useState("")
    return (
        <div className='addCycleSubject-main-wrapper'>
            <div className='addCycleSubject-input-feilds-wrapper'>
                <input 
                    type="text"
                    placeholder='Subject Code'
                    className='addCycleSubject-input-subject-code-container'
                    value={subjectCodeState}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Subject Name'
                    className='addCycleSubject-input-subject-name-container'
                    value={subjectNameState}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Max Limit'
                    className='addCycleSubject-input-subject-max-limit-container'
                    value={subjectMaxLimit}
                    onChange={(e)=>setsubjectMaxLimit(e.target.value)}
                    />
                <input
                    type="text"
                    placeholder='Cycle'
                    className='addCycleSubject-input-subject-excluding-branches-container'
                    value={subjectCycleState}
                    onChange={(e)=>setsubjectCycleState(e.target.value)}
                    />
                
            </div>
            <div className='addCycleSubject-add-button-container'>
                <button>Add</button>
            </div>
        </div>
    )
}

export function DisplayESCSubject(props){

    //state for enabling edit and save and delete option
    const [isEditEnabled, setisEditEnabled] = useState(false);
    const [isChangesSaved, setIsChangesSaved] = useState(false);
    const [isSubjectDeleted, setisSubjectDeleted] = useState(false);


    //declaring state variables for input feilds
    const [subjectCodeState, setsubjectCodeState] = useState(()=>{
        if(props.subjectCode){
            return props.subjectCode
        }
        else{
            return ""
        }
    })

    const [subjectNameState, setsubjectNameState] = useState(()=>{
        if(props.subjectName){
            return props.subjectName
        }
        else{
            return ""
        }
    })

    const [subjectLimitState, setSubjectLimitState] = useState(()=>{
        if(props.maxLimit){
            return props.maxLimit
        }
        else{
            return ""
        }
    });
    const [subjectExcludingBranchesState, setSubjectExcludingBranchesState] = useState(()=>{
        if(props.execludingBranches){
            return props.execludingBranches
        }
        else{
            return ""
        }
    })
    //handling edit click function
    const handleEditClick =async(e)=>{
        e.preventDefault();
        setisEditEnabled(true)
    }
    //handling subject deletion
    const handleSubjectDeletion = async(e)=>{
        e.preventDefault();
        setisSubjectDeleted(true);
    }
    return(
        <div className={isSubjectDeleted?"modifySubject-disable-wrapper":'modifySubjects-display-subject-wrapper'}>
            <div className='modifySubjects-display-subject-container'>
            
                <input 
                    className='modifySubjects-display-subject-code'
                    type="text"
                    defaultValue={subjectCodeState}
                    value={subjectCodeState}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    readOnly={isEditEnabled?false:true}
                    />
                <input 
                    className='modifySubjects-display-subject-name'
                    type="text"
                    defaultValue={subjectNameState}
                    value={subjectNameState}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    readOnly={isEditEnabled?false:true}
                    />
                <input 
                    className='modifySubjects-display-subject-max-limit'
                    type="text"
                    defaultValue={subjectLimitState}
                    value={subjectLimitState}
                    onChange={(e)=>setSubjectLimitState(e.target.value)}
                    readOnly={isEditEnabled?false:true}
                    />
                <input 
                    className='modifySubjects-display-subject-excluding-branch-list'
                    type="text"
                    defaultValue={subjectExcludingBranchesState}
                    value={subjectExcludingBranchesState}
                    onChange={(e)=>setSubjectExcludingBranchesState(e.target.value)}
                    readOnly={isEditEnabled?false:true}
                    />
            </div>
            <div className="modifySubject-button-action-container">
                <button
                    className={isEditEnabled?"modifySubject-button-disabled":"modifySubject-edit-button"}
                    onClick={handleEditClick}
                    >Edit</button>
                {isEditEnabled&& 
                    <button
                        className='modifySubject-save-button'
                        >
                        Save
                    </button>}
                <button
                    className='modifySubjects-delete-button'
                    onClick={handleSubjectDeletion}
                    >Delete</button>
            </div>
        </div>
    )
}

export function DisplayCycleSubject(props){

    //state for enabling edit and save and delete option
    const [isEditEnabled, setisEditEnabled] = useState(false);
    const [isChangesSaved, setIsChangesSaved] = useState(false);
    const [isSubjectDeleted, setisSubjectDeleted] = useState(false);

    //declaring state variables for input feilds
    const [subjectCodeState, setsubjectCodeState] = useState(()=>{
        if(props.subjectCode){
            return props.subjectCode
        }
        else{
            return ""
        }
    })

    const [subjectNameState, setsubjectNameState] = useState(()=>{
        if(props.subjectName){
            return props.subjectName
        }
        else{
            return ""
        }
    })

    const [subjectLimitState, setSubjectLimitState] = useState(()=>{
        if(props.maxLimit){
            return props.maxLimit
        }
        else{
            return ""
        }
    });
    const [subjectAllocatedCycleState, setSubjectAllocatedCycleState] = useState(()=>{
        if(props.allocatedCycle){
            return props.allocatedCycle
        }
        else{
            return ""
        }
    });


    //handling edit click function
    const handleEditClick =async(e)=>{
        e.preventDefault();
        setisEditEnabled(true)
    }
    //handling subject deletion
    const handleSubjectDeletion = async(e)=>{
        e.preventDefault();
        setisSubjectDeleted(true);
    }


    return (
        <div className={isSubjectDeleted?"modifySubject-disable-wrapper":'modifySubjects-display-subject-wrapper'}>
            <div className='modifySubjects-display-subject-container'>
                <input 
                    className='modifySubjects-display-subject-code'
                    type="text"
                    readOnly={isEditEnabled?false:true}
                    placeholder='Subject Code'
                    value={subjectCodeState}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input
                    className='modifySubjects-display-subject-name'
                    type="text"
                    readOnly={isEditEnabled?false:true}
                    placeholder='Subject Name'
                    value={subjectNameState}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    className='modifySubjects-display-subject-max-limit'
                    type="text"
                    readOnly={isEditEnabled?false:true}
                    placeholder='Max Limit'
                    value={subjectLimitState}
                    onChange={(e)=>setSubjectLimitState(e.target.value)}
                    />
                <input 
                    className='modifySubjects-display-subject-allocated-cycle'
                    type="text"
                    readOnly={isEditEnabled?false:true}
                    placeholder='Allocated Cycle'
                    value={subjectAllocatedCycleState}
                    onChange={(e)=>setSubjectAllocatedCycleState(e.target.value)}
                    />
            </div>
            <div className="modifySubject-button-action-container">
                <button
                    className={isEditEnabled?"modifySubject-button-disabled":"modifySubject-edit-button"}
                    onClick={handleEditClick}
                    >Edit</button>
                {isEditEnabled&& 
                    <button
                        className='modifySubject-save-button'
                        >
                        Save
                    </button>}
                <button
                    className='modifySubjects-delete-button'
                    onClick={handleSubjectDeletion}
                    >Delete</button>
            </div>
        </div>
    )
}
