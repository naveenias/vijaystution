import React from 'react';
import "./index.css";

function Navbar({ toggleSidebar }) {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <a className="navbar-brand logo">Vjs Mukyaprana Study Zone</a>
        <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h1 className='tital moving-text'>VJs Mukyaprana Studyzone</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
