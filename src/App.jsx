
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import SideBar2 from './components/SideBar2';
import Landing from './components/Landing';
import Login from './components/Login';
import Curd from './components/axioss/Curd';
import ApplicantsTable from './components/axioss/ApplicantsTable';
import Adminlogin from './components/AdminLogin';

function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing></Landing>} />
        <Route path="/sidebar" element={<SideBar2></SideBar2>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/apply" element={<Curd />} />
        <Route path="/applications" element={<ApplicantsTable />} />
        <Route path='/adminlogin' element={<Adminlogin></Adminlogin>} />
        <Route path="/logout" element={<Login></Login>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
