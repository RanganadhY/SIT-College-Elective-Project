
import './App.css';

//importing the dependices
import {Routes,Route} from "react-router-dom"

//importing all the jsx file or pages to use them as a 
// components for the respective routes
import AdminLogin from './routes/adminLogin';
import Mapping from "./routes/mapping"
import ModifySubjects from './routes/modifySubjects';
import Report from "./routes/report";
import StudentMngt from "./routes/studentMngt";
import SubjectMngt from "./routes/subjectMngt";
import PageNotFound from "./routes/pageNotFound"
import ViewStudents from './routes/viewStudents';
import ViewPasswords from './routes/viewPasswords';


function App() {
  return (
    <>
      {/* Routes for all the admin panel to route through whole admin panel */}
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/student-management' element={<StudentMngt/>}/>
        <Route path='/subject-management' element={<SubjectMngt/>}/>
        <Route path='/mapping' element={<Mapping/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/view-students' element={<ViewStudents/>}/>
        <Route path='/modify-subjects' element={<ModifySubjects/>}/>
        <Route path='/view-passwords' element={<ViewPasswords/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
