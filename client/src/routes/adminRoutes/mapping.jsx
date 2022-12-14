import React, {useState, useEffect} from 'react'
import axios from "../../axios/axios";

//importing shtylesheet
import "../../css/adminCss/mapping.css";
import "../../components/cycleMapping/cycleMapping.css"

//importing navbar
import AdminNavbar from '../../components/adminNavbar/adminNavbar'

import { AdminLoader } from '../../components/loading component/loader';


function Mapping() {
    const [branchesList, setBranchesList] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const tempList = branchesList;

    const handleSave = async()=>{
        setisLoading(true);
        const res = await axios.post("/admin/save-branches", tempList)
                                .catch((err)=>{
                                    setisLoading(false);
                                    console.log(err);
                                    alert("Error in fetching branches. please try again later");
                                });
        if(res.data.message==="successfull"){
            alert("Branches updated successfully");
        }else{
            alert("Error in updating branches. please try again later");
        }
        setisLoading(false);
    }
    
    const getBranches = async()=>{
        setisLoading(true);
        const res = await axios.get("/admin/get-branches")
                        .catch((err)=>{
                            setisLoading(false);
                            console.log(err);
                            alert("Error in fetching branches. please try again later");
                        });
        if(res.data.message==="successfull"){
            if(res.data.data.length===0){
                alert("No branches found");
            }else{
                setBranchesList(res.data.data);
            }
        }else{
            alert("Error in fetching branches. please try again later");
        }
        setisLoading(false);
    }

    useEffect(() => {
        async function fetchData(){
            await getBranches();
        }
        fetchData();
    }, [])

    return (
        <>
            <AdminNavbar/>
            {
                isLoading&&<AdminLoader/>
            }
            <div className="mapping-main-wrapper">
                <div className="mapping-main-container">
                    <div className="mapping-lables-conatiner">
                        <p className='mapping-labels-branch-p-tag'>Branch</p>
                        <p className='mapping-labels-cycle-p-tag'>P-Cycle</p>
                        <p className='mapping-labels-cycle-p-tag'>C-Cycle</p>
                    </div>
                    {
                        branchesList.map((key,i)=>{
                            return(
                                <div className="cycleMapping-main-container">
                                <div className="cycleMapping-branch-input-container">
                                    <input 
                                        type="text"
                                        value={branchesList[i].name}
                                        readOnly="true"
                                        />
                                </div>
                                <div className="cycleMapping-cycles-container">
                                    <input 
                                        type="radio"
                                        name={branchesList[i].code}
                                        onChange={(e)=>{tempList[i].cycle = "physics"}}
                                        />
                                    <input 
                                        type="radio"
                                        name={branchesList[i].code}
                                        onChange={(e)=>{tempList[i].cycle = "chemistry"}}
                                        />
                                </div>
                            </div>
                            )
                        })
                    }
                    <div className="mapping-save-button-container">
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mapping