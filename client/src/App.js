import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Componets/Navbar';
import Login from './Componets/Login';
import Home from './Componets/Home';
import Studentregistration from './Componets/Stdentregistration';
import StudentDetails from './Componets/Studentdetails';
import PrivateRoutes from './Componets/ProtectedRoute';
import Studentsview from './Componets/Studentsview';
import Teacherdetails from './Componets/Teacherdetails';
import Teachersview from './Componets/Teachersview';
import Teacherregistration from './Componets/Teacherregistration';
import Attendence from './Componets/Attendence';
import Attendencedetailes from './Componets/Attendencedetailes';
import Studenthome from './Componets/Studenthome';
import { useEffect, useState } from 'react';
import Sidebar from './Componets/Sidebar';
import Studenthomeadmin from './Componets/Studenthomeadmin';
import Viewmarks from './Componets/Viewmarks';
import Viewattendence from './Componets/Viewattendence';
import Sendsms from './Componets/Sendsms';
import Sendupdate from './Componets/Sendupdates';
import NotFound from './Componets/Notfound';


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [AdminLogged, setAdminLogged]=useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isadminlogged=()=>{
    setAdminLogged(true)
    
  };

  useEffect(() => {
    // Check local storage for admin login status on component mount
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn) {
      setAdminLogged(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} />
      {AdminLogged && <Sidebar isOpen={isOpen} />}
      
      <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route  path="/" element={AdminLogged ? <Home isOpen={isOpen}/>: <NotFound/>} />
        <Route exact path="/studentregistration" element={AdminLogged? <Studentregistration/>:<NotFound/>} />
        <Route exact path="/studentdetails" element={AdminLogged? <StudentDetails/>:<NotFound/>} />
        <Route exact path='/studentsview' element={AdminLogged? <Studentsview/>:<NotFound/>} />
        <Route exact path="/teacherdetails" element={AdminLogged? <Teacherdetails/>:<NotFound/>} />
        <Route exact path="/teacherregistration" element={AdminLogged? <Teacherregistration/>:<NotFound/>} />
        <Route exact path='/teachersview' element={AdminLogged? <Teachersview/>:<NotFound/>} />
        <Route exact path='/attendence' element={AdminLogged? <Attendence/>:<NotFound/>} />
        <Route exact path='/attendencedetailes' element={AdminLogged? <Attendencedetailes/>:<NotFound/>} />
        <Route path="/Studenthome/:username" element={<Studenthome isOpen={isOpen} />} />
        <Route exact path='/Studenthomeadmin/:_id' element={AdminLogged?<Studenthomeadmin/>:<NotFound/>} />
        <Route exact path="/viewmarks/:username" element={<Viewmarks isOpen={isOpen}/>} />
        <Route exact path="/viewattendence/:username" element={<Viewattendence isOpen={isOpen}/>} />
        <Route exact path='/sendsms' element={AdminLogged?<Sendsms/>: <NotFound/>} />
        <Route exact path='/sendupdates' element={AdminLogged?<Sendupdate/>: <NotFound/>} />
      </Route>
         <Route exact path="/login" element={<Login isAdminLogged={isadminlogged} />} />   
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;