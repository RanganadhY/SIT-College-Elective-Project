import React,{useState} from 'react'

import {AdminLoader} from "../../components/loading component/loader"

function VeiwElidgleSubjects() {

const [isLoading, setisLoading] = useState(true)

    return (
        <>
            {
                isLoading&&<AdminLoader/>
            }
        </>
    )
}

export default VeiwElidgleSubjects