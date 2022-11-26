import React from 'react'

//importing password genrator
// import passwordGenratror from "generate-password"

import "../css/veiwStudents.css"
//importing navbar
import AdminNavbar from '../components/adminNavbar/adminNavbar'

let studentsList = [
        {
         "Name": "RACHITH KEMPANNA H R",
         "USN": "1SI18CS082"
        },
        {
         "Name": "ABHISHEK K M",
         "USN": "1SI19CS001"
        },
        {
         "Name": "ADARSH KUMAR",
         "USN": "1SI19CS002"
        },
        {
         "Name": "ADITI RAI",
         "USN": "1SI19CS003"
        },
        {
         "Name": "ADITYA RAJ",
         "USN": "1SI19CS004"
        },
        {
         "Name": "ADITYA SHUKLA",
         "USN": "1SI19CS005"
        },
        {
         "Name": "AKASH KADIYAN",
         "USN": "1SI19CS006"
        },
        {
         "Name": "AKSHAY G PATIL",
         "USN": "1SI19CS007"
        },
        {
         "Name": "AKSHAY H N",
         "USN": "1SI19CS008"
        },
        {
         "Name": "AKSHAY V N",
         "USN": "1SI19CS009"
        },
        {
         "Name": "AMNAH RAFEEQ AHMED KHAN",
         "USN": "1SI19CS010"
        },
        {
         "Name": "ANANYA A",
         "USN": "1SI19CS011"
        },
        {
         "Name": "ANIKET AADITYA YADAV",
         "USN": "1SI19CS012"
        },
        {
         "Name": "ANU SARGUR K",
         "USN": "1SI19CS013"
        },
        {
         "Name": "ANURAG",
         "USN": "1SI19CS014"
        },
        {
         "Name": "ANUSH H",
         "USN": "1SI19CS015"
        },
        {
         "Name": "APRAJITA PRIYA",
         "USN": "1SI19CS016"
        },
        {
         "Name": "ARAVAPALLI NAGA VENKATA SAI ANUDEEP",
         "USN": "1SI19CS017"
        },
        {
         "Name": "ASHISH ANAND",
         "USN": "1SI19CS018"
        },
        {
         "Name": "ATUL KUMAR",
         "USN": "1SI19CS019"
        },
        {
         "Name": "AYUSH CHOUDHARY",
         "USN": "1SI19CS020"
        },
        {
         "Name": "AYUSHI",
         "USN": "1SI19CS021"
        },
        {
         "Name": "BAHUROOP T.J",
         "USN": "1SI19CS022"
        },
        {
         "Name": "BASAVESH T J",
         "USN": "1SI19CS023"
        },
        {
         "Name": "BHAVANA B N",
         "USN": "1SI19CS024"
        },
        {
         "Name": "BHAVANA S KUMAR",
         "USN": "1SI19CS025"
        },
        {
         "Name": "BHOOMIKA SP",
         "USN": "1SI19CS026"
        },
        {
         "Name": "BIKAS RAJPUT",
         "USN": "1SI19CS027"
        },
        {
         "Name": "BINDU S N",
         "USN": "1SI19CS028"
        },
        {
         "Name": "BINOD SITOULA",
         "USN": "1SI19CS029"
        },
        {
         "Name": "BIPUL KUMAR AGRAWAL",
         "USN": "1SI19CS030"
        },
        {
         "Name": "CHANDANA H S",
         "USN": "1SI19CS031"
        },
        {
         "Name": "CHANDANA P",
         "USN": "1SI19CS032"
        },
        {
         "Name": "CHETHANA.P",
         "USN": "1SI19CS033"
        },
        {
         "Name": "CHIRAG S V",
         "USN": "1SI19CS034"
        },
        {
         "Name": "D M VYSHNAVI",
         "USN": "1SI19CS035"
        },
        {
         "Name": "DARSHAN S K",
         "USN": "1SI19CS036"
        },
        {
         "Name": "DEEPAK D P",
         "USN": "1SI19CS037"
        },
        {
         "Name": "DEEPTHI S G",
         "USN": "1SI19CS038"
        },
        {
         "Name": "DHAIRYA BHAWSAR",
         "USN": "1SI19CS039"
        },
        {
         "Name": "FAIZAN AHMAD QADRI",
         "USN": "1SI19CS040"
        },
        {
         "Name": "GANYA  M",
         "USN": "1SI19CS041"
        },
        {
         "Name": "GAURAV KAMBOJ",
         "USN": "1SI19CS042"
        },
        {
         "Name": "GAURAV KUMAR",
         "USN": "1SI19CS043"
        },
        {
         "Name": "GOURAV GOWDA K",
         "USN": "1SI19CS044"
        },
        {
         "Name": "GUNAKEERTHI H.U.",
         "USN": "1SI19CS045"
        },
        {
         "Name": "GURUCHARAN D K",
         "USN": "1SI19CS046"
        },
        {
         "Name": "GUTTA SUHAS",
         "USN": "1SI19CS047"
        },
        {
         "Name": "HARSHAVARDHAN T K",
         "USN": "1SI19CS048"
        },
        {
         "Name": "HARSHITHA K U",
         "USN": "1SI19CS049"
        },
        {
         "Name": "HEMANTH C S",
         "USN": "1SI19CS050"
        },
        {
         "Name": "ISHITA SAXENA",
         "USN": "1SI19CS051"
        },
        {
         "Name": "JAPITHA JAIN H P",
         "USN": "1SI19CS052"
        },
        {
         "Name": "JAYAKRISHNA A",
         "USN": "1SI19CS053"
        },
        {
         "Name": "JUTURU RAGA DEEPTHI",
         "USN": "1SI19CS054"
        },
        {
         "Name": "JYOTHI N",
         "USN": "1SI19CS055"
        },
        {
         "Name": "JYOTHISHREE",
         "USN": "1SI19CS056"
        },
        {
         "Name": "K SAI PRANAV",
         "USN": "1SI19CS057"
        },
        {
         "Name": "KASTHURI S R",
         "USN": "1SI19CS058"
        },
        {
         "Name": "KAVYA S A",
         "USN": "1SI19CS059"
        },
        {
         "Name": "KESHAV N BHARADWAJ",
         "USN": "1SI19CS060"
        },
        {
         "Name": "KIRAN ASHOK NAIK",
         "USN": "1SI19CS061"
        },
        {
         "Name": "KIRAN KUMAR M",
         "USN": "1SI19CS062"
        },
        {
         "Name": "KIRAN T G",
         "USN": "1SI19CS063"
        },
        {
         "Name": "KUSUMA K",
         "USN": "1SI19CS064"
        },
        {
         "Name": "LIKHITHA S",
         "USN": "1SI19CS065"
        },
        {
         "Name": "LINGAMDINNE CHATHRAPATHI CHAITHANYAKRISHNA",
         "USN": "1SI19CS066"
        },
        {
         "Name": "LISHA H",
         "USN": "1SI19CS067"
        },
        {
         "Name": "M R KIRAN BABU",
         "USN": "1SI19CS068"
        },
        {
         "Name": "SONAM SHARMA",
         "USN": "1SI19CS140"
        },
        {
         "Name": "VINAY REDDY P ",
         "USN": "1SI19CS141"
        },
        {
         "Name": "AMAN GUPTA",
         "USN": "1SI19CS142"
        },
        {
         "Name": "HARSHA V",
         "USN": "1SI20CS400"
        },
        {
         "Name": "HARSHITHA K L",
         "USN": "1SI20CS401"
        },
        {
         "Name": "HARSHITHA P",
         "USN": "1SI20CS402"
        },
        {
         "Name": "KAVITHA MELINAMANI",
         "USN": "1SI20CS403"
        },
        {
         "Name": "LIKHITKUMAR MANJUNATH NAIK",
         "USN": "1SI20CS404"
        },
        {
         "Name": "MAMATHASHREE K",
         "USN": "1SI20CS405"
        },
        {
         "Name": "SUPRIYA K U",
         "USN": "1SI18CS117"
        },
        {
         "Name": "M WASIM KHAN",
         "USN": "1SI19CS069"
        },
        {
         "Name": "MADHU KUMAR V",
         "USN": "1SI19CS070"
        },
        {
         "Name": "MARIDI SAI SRUJANA REDDY",
         "USN": "1SI19CS071"
        },
        {
         "Name": "MAYANK RAJ SINGH",
         "USN": "1SI19CS072"
        },
        {
         "Name": "MD FARAN ALAM",
         "USN": "1SI19CS073"
        },
        {
         "Name": "MD.INZAMAMUL HAQUE",
         "USN": "1SI19CS074"
        },
        {
         "Name": "MEHUL BHARDWAJ",
         "USN": "1SI19CS076"
        },
        {
         "Name": "MOHAMMED ADNAN SAYEED",
         "USN": "1SI19CS077"
        },
        {
         "Name": "MOHAMMED ROSHAN",
         "USN": "1SI19CS078"
        },
        {
         "Name": "MONIKA K S",
         "USN": "1SI19CS079"
        },
        {
         "Name": "MOULYA D B",
         "USN": "1SI19CS080"
        },
        {
         "Name": "MURALIDHAR REDDY ARDHA",
         "USN": "1SI19CS081"
        },
        {
         "Name": "MUSADDIQ SHARIFF",
         "USN": "1SI19CS082"
        },
        {
         "Name": "MUSKAN AGARWAL",
         "USN": "1SI19CS083"
        },
        {
         "Name": "N SUHAS",
         "USN": "1SI19CS084"
        },
        {
         "Name": "NAGAPRASAD V R",
         "USN": "1SI19CS085"
        },
        {
         "Name": "NAVEEN  K  N",
         "USN": "1SI19CS086"
        },
        {
         "Name": "NAVYA V",
         "USN": "1SI19CS087"
        },
        {
         "Name": "NIRUPAMA MALLIKARJUNAIAH",
         "USN": "1SI19CS088"
        },
        {
         "Name": "PRADEEP SINGH S M",
         "USN": "1SI19CS089"
        },
        {
         "Name": "PRAGATI SHANKAR",
         "USN": "1SI19CS090"
        },
        {
         "Name": "PRANJAL LAMSAL",
         "USN": "1SI19CS092"
        },
        {
         "Name": "PRATHAM GUPTA",
         "USN": "1SI19CS093"
        },
        {
         "Name": "PRERANA H P",
         "USN": "1SI19CS094"
        },
        {
         "Name": "PRITI  SAH",
         "USN": "1SI19CS095"
        },
        {
         "Name": "PUCHA VISHNU VARDHAN",
         "USN": "1SI19CS096"
        },
        {
         "Name": "REESHA R SHETTY",
         "USN": "1SI19CS097"
        },
        {
         "Name": "RISHAB S JAIN",
         "USN": "1SI19CS098"
        },
        {
         "Name": "RISHU ANAND",
         "USN": "1SI19CS099"
        },
        {
         "Name": "ROHITH C",
         "USN": "1SI19CS100"
        },
        {
         "Name": "SAGAR H",
         "USN": "1SI19CS101"
        },
        {
         "Name": "SAMYAKTHA.G. A.",
         "USN": "1SI19CS102"
        },
        {
         "Name": "SHARAN NAVADA S",
         "USN": "1SI19CS103"
        },
        {
         "Name": "SHARATH KUMAR V",
         "USN": "1SI19CS104"
        },
        {
         "Name": "SHARATH REDDY",
         "USN": "1SI19CS105"
        },
        {
         "Name": "SHASHWATH",
         "USN": "1SI19CS106"
        },
        {
         "Name": "SHEETAL.S",
         "USN": "1SI19CS107"
        },
        {
         "Name": "SHILPA B K",
         "USN": "1SI19CS108"
        },
        {
         "Name": "SHOBHIT SHRIVASTAVA",
         "USN": "1SI19CS109"
        },
        {
         "Name": "SHRAVYA M",
         "USN": "1SI19CS110"
        },
        {
         "Name": "SHREYANK",
         "USN": "1SI19CS111"
        },
        {
         "Name": "SHREYASH RAJ",
         "USN": "1SI19CS112"
        },
        {
         "Name": "SHRIDEVI",
         "USN": "1SI19CS113"
        },
        {
         "Name": "SHUBHAM JHA",
         "USN": "1SI19CS114"
        },
        {
         "Name": "SHWETHA JOGI",
         "USN": "1SI19CS115"
        },
        {
         "Name": "SOAHMNATH MANISH BELORKAR",
         "USN": "1SI19CS116"
        },
        {
         "Name": "SOHANA CA",
         "USN": "1SI19CS117"
        },
        {
         "Name": "SPARSHA  M",
         "USN": "1SI19CS118"
        },
        {
         "Name": "SREEVATHSA S P",
         "USN": "1SI19CS119"
        },
        {
         "Name": "SRINIVAS R",
         "USN": "1SI19CS120"
        },
        {
         "Name": "SRIVALLI S",
         "USN": "1SI19CS121"
        },
        {
         "Name": "SRUSHTI V",
         "USN": "1SI19CS122"
        },
        {
         "Name": "SUBRAMANYAM D P",
         "USN": "1SI19CS123"
        },
        {
         "Name": "SUHA SAEED",
         "USN": "1SI19CS124"
        },
        {
         "Name": "SUHAS SANJAY",
         "USN": "1SI19CS125"
        },
        {
         "Name": "SUMIT KUMAR SAH",
         "USN": "1SI19CS126"
        },
        {
         "Name": "SURAJ P S",
         "USN": "1SI19CS127"
        },
        {
         "Name": "SWATHI.V",
         "USN": "1SI19CS128"
        },
        {
         "Name": "THANUSHREE S U",
         "USN": "1SI19CS129"
        },
        {
         "Name": "THEJASWINI N",
         "USN": "1SI19CS130"
        },
        {
         "Name": "TUYYAB UL BASHAR",
         "USN": "1SI19CS131"
        },
        {
         "Name": "V.TARUN",
         "USN": "1SI19CS132"
        },
        {
         "Name": "VANDUVAGALI MADHU",
         "USN": "1SI19CS133"
        },
        {
         "Name": "VARUN M H",
         "USN": "1SI19CS134"
        },
        {
         "Name": "VINAY K R",
         "USN": "1SI19CS135"
        },
        {
         "Name": "VISHWARAJ TATTI",
         "USN": "1SI19CS136"
        },
        {
         "Name": "VIVEK ADITYA YADAV",
         "USN": "1SI19CS137"
        },
        {
         "Name": "YADLAPALLI RANGANADH CHOWDARY",
         "USN": "1SI19CS138"
        },
        {
         "Name": "YASHASWINI M B",
         "USN": "1SI19CS139"
        },
        {
         "Name": "YASHASWINI G R (COB FROM EC)",
         "USN": "1SI19CS143"
        },
        {
         "Name": "RITI  (COB FROM EC)",
         "USN": "1SI19CS144"
        },
        {
         "Name": "SHRUTHI N (COB FROM EC)",
         "USN": "1SI19CS145"
        },
        {
         "Name": "MANASA U",
         "USN": "1SI20CS406"
        },
        {
         "Name": "MEENAKSHI S KODAG",
         "USN": "1SI20CS407"
        },
        {
         "Name": "PUNYASHREE M C",
         "USN": "1SI20CS410"
        },
        {
         "Name": "SUPRITHA A M",
         "USN": "1SI20CS411"
        }
    ]


function VeiwStudents() {
    // console.log(studentsList)

    const handlegenratingpassword = async()=>{
        
    }
    
    return (
        <>
            <AdminNavbar/>
            <div className="veiw-students-main-wrapper">
                <div className="veiw-students-main-container">
                    <div className="veiw-students-heading-container">
                        <h3>Veiw Students</h3>
                    </div>
                    <div className='veiw-students-buttons-action-container'>
                        <div className='veiw-students-strech-container'></div>
                        <div className='veiw-students-buttons-action-wrapper'>
                            <button
                                onClick={handlegenratingpassword}
                                >Genrate Passwords</button>
                            <button>Download</button>
                        </div>
                        
                    </div>
                    <div className="veiw-students-students-display-wrapper">
                        <div className="veiw-students-students-display-container">
                            <div className="veiw-students-display-labels-container">
                                <div className='veiw-students-display-labels-serial-no'>
                                    <p>S.no</p>
                                </div>
                                <div className='veiw-students-display-labels'>
                                    <p>Student USN</p>
                                </div>
                                <div className='veiw-students-display-labels'>
                                    <p>Student Name</p>
                                </div>
                                <div className='veiw-students-display-labels'>
                                    <p>Student Password</p>
                                </div>
                            </div>
                            {studentsList.map((key,index)=>{
                                // console.log(studentsList[index])
                                return(
                                    <div className='veiw-students-display-result-container'>
                                        <div className='veiw-students-display-result-serial-no'>
                                            <p>{index+1}</p>
                                        </div>
                                        <div className='veiw-students-display-usn-result'>   
                                            <input key={key} type="text" value={studentsList[index].USN}  readOnly="true"/>
                                        </div>
                                        <div className='veiw-students-display-result'>
                                            <input key={key} type="text" value={studentsList[index].Name} readOnly="true" />
                                        </div>
                                        <div className='veiw-students-display-result'>
                                            <input key={key} type="text" value={studentsList[index].password?"":studentsList[index].password} readOnly="true" />
                                        </div>
                                    </div>
                                )
                                    
                                
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VeiwStudents