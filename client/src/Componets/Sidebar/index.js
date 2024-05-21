import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Add your desired routes here as an array of strings
  const displayRoutes = ['/', '/about', '/studentregistration', '/studentdetails', '/studentsview', '/teacherdetails', '/teacherregistration', '/teachersview', '/attendence', '/attendencedetailes', "/Studenthomeadmin", "/sendsms", "/sendupdates"];
  
  // Get the current pathname
  let pathname = location.pathname;
  
  // If the current pathname includes "/Studenthomeadmin", remove the last segment
  if (pathname.includes("/Studenthomeadmin")) {
    pathname = location.pathname.replace(/\/[^\/]+$/, '');
  }

  // Check if the sidebar should be displayed based on the current location
  const shouldDisplaySidebar = displayRoutes.includes(pathname);

  // Function to handle logout
  const Logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('adminLoggedIn');

    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div className={`sidebar${isOpen ? 'open' : ''}`} style={shouldDisplaySidebar ? {} : { display: 'none' }}>
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="/">Home</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/studentsview">Students</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/teachersview">Teachers</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/sendupdates">Send Updates</a>
        </li>
        <li className="sidebar-menu-item" onClick={Logout}>
          <a className='logout'>Log out</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <p>© Vjs Mukyaprana study zone</p>
      </div>
    </div>
  );
}

export default Sidebar;
