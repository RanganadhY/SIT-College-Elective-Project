
import './App.css';

//importing the dependices
import {Routes,Route} from "react-router-dom"

//importing all the jsx file or pages to use them as a 
// components for the respective routes
import AdminLogin from './routes/adminLogin';
// import AdminDashboard from './routes/adminDashboard';
import StudentMngt from "./routes/studentMngt";
import SubjectMngt from "./routes/subjectMngt";
import Report from "./routes/report";
import Mapping from "./routes/mapping"
import VeiwStudents from './routes/veiwStudents';
import Tst from './routes/tst';

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
        <Route path='/veiw-students' element={<VeiwStudents/>}/>
        <Route path='/test' element={<Tst/>}/>
      </Routes>
    </>
  );
}

export default App;
