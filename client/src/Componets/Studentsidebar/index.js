import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importing necessary components from react-router-dom
import "./index.css"; // Importing the CSS file for styling

function Studentsidebar({ isOpen }) {
  const { username } = useParams(); // Extracting the username from URL parameters
  const navigate = useNavigate(); // Using useNavigate hook to navigate between routes

  // Function to handle logout
  const Logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    navigate("/login"); // Navigate to login page after logout
  };
 
  return (
    <div className={`sidebar${isOpen ? 'open' : ''}`} id='sidebar2'> {/* Conditional class rendering based on isOpen prop */}
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        {/* Links for different functionalities */}
        <li className="sidebar-menu-item">
          <a href={`/Studenthome/${username}`}>Home</a>
        </li>
        <li className="sidebar-menu-item">
          <a href={`/viewmarks/${username}`}>View Result</a>
        </li>
        <li className="sidebar-menu-item">
          <a href={`/viewattendence/${username}`}>View Attendance</a>
        </li>
        <li className="sidebar-menu-item" onClick={Logout}>
          <a className='logout'>Log out</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <p>© Vjs Mukyaprana studyzone</p>
      </div>
    </div>
  );
}

export default Studentsidebar;
