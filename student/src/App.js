import './App.css';
//importing the dependices
import {Routes,Route} from "react-router-dom"
//importing components
import LoginPage from './routes/loginPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
