
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
import Report from "./routes/adminRoutes/report";
import StudentMngt from "./routes/adminRoutes/studentMngt";
import SubjectMngt from "./routes/adminRoutes/subjectMngt";
import VeiwElidgibleSubjects from "./routes/studentRoutes/veiwElidgileSubjects"
import ViewStudents from './routes/adminRoutes/viewStudents';
import ViewPasswords from './routes/adminRoutes/viewPasswords';





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
          <Route element={<AuthRoute allowedRoles={[ROLES.Admin]}/>}>
            
            <Route path='/mapping' element={<Mapping/>}/>
            <Route path='/modify-subjects' element={<ModifySubjects/>}/>
            <Route path='/student-management' element={<StudentMngt/>}/>
            <Route path='/subject-management' element={<SubjectMngt/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/view-students' element={<ViewStudents/>}/>
            <Route path='/view-passwords' element={<ViewPasswords/>}/>
          </Route>
          
          <Route element={<AuthRoute allowedRoles={[ROLES.Student]}/>}>
            <Route path="/existing-subjects" element={<VeiwElidgibleSubjects/>}/>
          </Route>

          <Route path='*' element={<PageNotFound/>}/>
          
      </Routes>

    </>
  );
}

export default App;
