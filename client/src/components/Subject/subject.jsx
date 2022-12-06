import React,{useState,useEffect} from 'react';
import axios from "../../axios/axios";

//importing sytylesheet
import "./Subject.css"

export function AddESCsubject() {
    //defining states for storing input data
    const [subjectCodeState, setsubjectCodeState] = useState("");
    const [subjectNameState, setsubjectNameState] = useState("");
    const [subjectMaxLimit, setsubjectMaxLimit] = useState("");
    const [subjectExcludedbranches, setsubjectExcludedbranches] = useState([]);
    const [isESCSubjectSaved, setisESCSubjectSaved] = useState(false);
    
    const addESCSubject = async ()=>{
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectMaxLimit,
            exBranch: subjectExcludedbranches
        }
        const res = await axios.post("/admin/add-subject/esc", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in adding subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            setisESCSubjectSaved(true)
            alert("Subject added successfully");
            
        }
        else
            alert(res.data.message);
    }

    const handleAddESC = async (e)=>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.preventDefault();
            e.stopPropagation();
            await addESCSubject();
        }
    }

    return (
        <div className='addESCSubject-main-wrapper'>
            <div className='addESCSubject-input-feilds-wrapper'>
                <input 
                    type="text"
                    placeholder='Subject Code'
                    className='addESCSubject-input-subject-code-container'
                    value={subjectCodeState}
                    required={true}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input 
                    type="text" 
                    placeholder='Subject Name'
                    className='addESCSubject-input-subject-name-container'
                    value={subjectNameState}
                    required={true}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Max Limit'
                    className='addESCSubject-input-subject-max-limit-container'
                    value={subjectMaxLimit}
                    required={true}
                    onChange={(e)=>setsubjectMaxLimit(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Excluded Branches'
                    className='addESCSubject-input-subject-excluding-branches-container'
                    value={subjectExcludedbranches}
                    required={true}
                    onChange={(e)=>setsubjectExcludedbranches(e.target.value)}
                    />
                
            </div>
            <div className='addESCSubject-add-button-container'>
                <button onClick={handleAddESC}>Add</button>
            </div>
        </div>
    )
}

export function AddCyclesubject() {

    const [subjectCodeState, setsubjectCodeState] = useState("");
    const [subjectNameState, setsubjectNameState] = useState("");
    const [subjectMaxLimit, setsubjectMaxLimit] = useState("");
    const [subjectCycleState, setsubjectCycleState] = useState("")

    const addCYCSubject = async ()=>{
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectMaxLimit,
            cycle: subjectCycleState
        }
        const res = await axios.post("/admin/add-subject/cyc", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in adding subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            alert("Subject added successfully");
            
        }
        else
            alert(res.data.message);
    }

    const handleAddCYC = async (e)=>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.preventDefault();
            e.stopPropagation();
            await addCYCSubject();
        }
    }
    return (
        <div className='addCycleSubject-main-wrapper'>
            <div className='addCycleSubject-input-feilds-wrapper'>
                <input 
                    type="text"
                    placeholder='Subject Code'
                    className='addCycleSubject-input-subject-code-container'
                    value={subjectCodeState}
                    required={true}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input 
                    type="text"
                    required={true}
                    placeholder='Subject Name'
                    className='addCycleSubject-input-subject-name-container'
                    value={subjectNameState}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    type="text"
                    required={true}
                    placeholder='Max Limit'
                    className='addCycleSubject-input-subject-max-limit-container'
                    value={subjectMaxLimit}
                    onChange={(e)=>setsubjectMaxLimit(e.target.value)}
                    />
                <input
                    type="text"
                    required={true}
                    placeholder='Cycle'
                    className='addCycleSubject-input-subject-excluding-branches-container'
                    value={subjectCycleState}
                    onChange={(e)=>setsubjectCycleState(e.target.value)}
                    />
                
            </div>
            <div className='addCycleSubject-add-button-container'>
                <button onClick={handleAddCYC}>Add</button>
            </div>
        </div>
    )
}

export function AddMDsubject() {
    //defining states for storing input data
    const [subjectCodeState, setsubjectCodeState] = useState("");
    const [subjectNameState, setsubjectNameState] = useState("");
    const [subjectMandatedbranches, setsubjectMandatedbranches] = useState([]);
    
    const addMDSubject = async ()=>{
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            mandatedBranch: subjectMandatedbranches
        }
        const res = await axios.post("/admin/add-subject/md", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in adding subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            alert("Subject added successfully");
            
        }
        else
            alert(res.data.message);
    }

    const handleAddMD = async (e)=>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }else{
            e.preventDefault();
            e.stopPropagation();
            await addMDSubject();
        }
    }

    return (
        <div className='addESCSubject-main-wrapper'>
            <div className='addESCSubject-input-feilds-wrapper'>
                <input 
                    type="text"
                    placeholder='Subject Code'
                    className='addESCSubject-input-subject-code-container'
                    value={subjectCodeState}
                    required={true}
                    onChange={(e)=>setsubjectCodeState(e.target.value)}
                    />
                <input 
                    type="text" 
                    placeholder='Subject Name'
                    className='addESCSubject-input-subject-name-container'
                    value={subjectNameState}
                    required={true}
                    onChange={(e)=>setsubjectNameState(e.target.value)}
                    />
                <input 
                    type="text"
                    placeholder='Excluded Branches'
                    className='addESCSubject-input-subject-excluding-branches-container'
                    value={subjectMandatedbranches}
                    required={true}
                    onChange={(e)=>setsubjectMandatedbranches(e.target.value)}
                    />
                
            </div>
            <div className='addESCSubject-add-button-container'>
                <button onClick={handleAddMD}>Add</button>
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
        setisEditEnabled(true);
    }
    //handling subject deletion
    const handleSubjectDeletion = async(e)=>{
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectLimitState,
            exBranch: subjectExcludingBranchesState
        }
        const res = await axios.post("/admin/delete-subject/esc", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in deleting subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            alert("Subject deleted successfully");
            setisSubjectDeleted(true);            
        }
        else
            alert(res.data.message);
    }

    const handleEditSave = async(e)=>{
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectLimitState,
            exBranch: subjectExcludingBranchesState
        }
        const res = await axios.post("/admin/edit-subject/esc", data)
                            .catch((err)=>{
                                console.log(err);
                                if(err.response.data.message==="data not vaild"){
                                    alert("Please enter valid branch codes");
                                }else{
                                    alert("Error in editing subject. please try again later");
                                }
                            });
        if(res.data.message==="successfull"){
            alert("Subject edited successfully");
            setIsChangesSaved(true);
            setisEditEnabled(false)
        }
        else
            alert(res.data.message);
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
                        onClick={handleEditSave}
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
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectLimitState,
            cycle:subjectAllocatedCycleState
        }
        const res = await axios.post("/admin/delete-subject/cyc", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in deleting subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            alert("Subject deleted successfully");
            setisSubjectDeleted(true);            
        }
        else
            alert(res.data.message);
    }

    const handleEditSave = async(e)=>{
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            limit: subjectLimitState,
            cycle: subjectAllocatedCycleState
        }
        const res = await axios.post("/admin/edit-subject/cyc", data)
                            .catch((err)=>{
                                console.log(err);
                                if(err.response.data.message==="data not vaild"){
                                    alert("Please enter valid branch codes");
                                }else{
                                    alert("Error in editing subject. please try again later");
                                }
                            });
        if(res.data.message==="successfull"){
            alert("Subject edited successfully");
            setIsChangesSaved(true);
            setisEditEnabled(false)
        }
        else
            alert(res.data.message);
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
                        onClick={handleEditSave}
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

export function DisplayMDSubject(props){

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

    const [subjectMandatedBranchesState, setSubjectMandatedBranchesState] = useState(()=>{
        if(props.mandatedBranches){
            return props.mandatedBranches
        }
        else{
            return ""
        }
    })
    //handling edit click function
    const handleEditClick =async(e)=>{
        e.preventDefault();
        setisEditEnabled(true);
    }
    //handling subject deletion
    const handleSubjectDeletion = async(e)=>{
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            mandatedBranch: subjectMandatedBranchesState
        }
        const res = await axios.post("/admin/delete-subject/md", data)
                            .catch((err)=>{
                                console.log(err);
                                alert("Error in deleting subject. please try again later");
                            });
        if(res.data.message==="successfull"){
            alert("Subject deleted successfully");
            setisSubjectDeleted(true);            
        }
        else
            alert(res.data.message);
    }

    const handleEditSave = async(e)=>{
        e.preventDefault();
        const data = {
            code: subjectCodeState,
            name: subjectNameState,
            mandatedBranch: subjectMandatedBranchesState
        }
        const res = await axios.post("/admin/edit-subject/md", data)
                            .catch((err)=>{
                                console.log(err);
                                if(err.response.data.message==="data not vaild"){
                                    alert("Please enter valid branch codes");
                                }else{
                                    alert("Error in editing subject. please try again later");
                                }
                            });
        if(res.data.message==="successfull"){
            alert("Subject edited successfully");
            setIsChangesSaved(true);
            setisEditEnabled(false)
        }
        else
            alert(res.data.message);
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
                    className='modifySubjects-display-subject-excluding-branch-list'
                    type="text"
                    defaultValue={subjectMandatedBranchesState}
                    value={subjectMandatedBranchesState}
                    onChange={(e)=>setSubjectMandatedBranchesState(e.target.value)}
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
                        onClick={handleEditSave}
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