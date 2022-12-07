
import './App.css';

//importing the dependices
import {Routes,Route} from "react-router-dom"

//importing all the jsx file or pages to use them as a 
// components for the respective routes

//admin Routes
import AdminLogin from './routes/adminRoutes/adminLogin';
import AuthRoute from './routes/authRoute';
import Mapping from "./routes/adminRoutes/mapping"
import ModifySubjects from './routes/adminRoutes/modifySubjects';
import OptingSubjects from './routes/studentRoutes/optingSubjects';
import Report from "./routes/adminRoutes/report";
import StudentMngt from "./routes/adminRoutes/studentMngt";
import SubjectMngt from "./routes/adminRoutes/subjectMngt";
import VeiwElidgibleSubjects from "./routes/studentRoutes/studentProfile"
import VeiwOptedSubjects from './routes/studentRoutes/veiwOptedSubjects';
import ViewStudents from './routes/adminRoutes/viewStudents';
import ViewPasswords from './routes/adminRoutes/viewPasswords';
import EnableDisable from './routes/adminRoutes/enable-disable';




//student Routes
import StudentLogin  from "./routes/studentLoginPage";
import PageNotFound from "./routes/pageNotFound"
const ROLES = {
  "Student":780907276,
  "Admin":379832798327
}

function App() {
  return (
    <>
      {/* Routes for all the client panel to route through whole client panel */}
      <Routes>
        
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/' element={<StudentLogin/>}/>


          {/* ----------Admin Protected Routes ---------*/}
          <Route element={<AuthRoute allowedRoles={[ROLES.Admin]}/>}>
            
            <Route path='/mapping' element={<Mapping/>}/>
            <Route path='/modify-subjects' element={<ModifySubjects/>}/>
            <Route path='/student-management' element={<StudentMngt/>}/>
            <Route path='/subject-management' element={<SubjectMngt/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/view-students' element={<ViewStudents/>}/>
            <Route path='/view-passwords' element={<ViewPasswords/>}/>
            <Route path="/selection-enable-disable" element={<EnableDisable/>}/>
          </Route>

          {/* -------Student Protected Routes-------- */}
          <Route element={<AuthRoute allowedRoles={[ROLES.Student]}/>}>
            <Route path="/eligible-subjects" element={<VeiwElidgibleSubjects/>}/>
            <Route path='/opting-subjects' element={<OptingSubjects/>}/>
            <Route path='/veiw-opted-subjects' element={<VeiwOptedSubjects/>}/>
          </Route>
          {/* -------Page Not Found----- */}
          <Route path='*' element={<PageNotFound/>}/>
          
      </Routes>

    </>
  );
}

export default App;
