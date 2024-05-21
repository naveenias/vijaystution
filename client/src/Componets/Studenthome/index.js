import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GETStubynumber } from '../../apicalls/students';
import './index.css';
import Studentsidebar from '../Studentsidebar';

function Studenthome({ isOpen }) {
  // State to hold user data
  const [user, setUser] = useState({});
  // Get username from URL params
  const { username } = useParams();

  // Fetch user data when component mounts or username changes
  useEffect(() => {
    const fetchStudent = async () => {
      const values = { username: username };
      try {
        const response = await GETStubynumber(values);
        setUser(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStudent();
  }, [username]);

  return (
    <div>
      <div className='studenthome'>
        {/* Sidebar component */}
        <Studentsidebar isOpen={isOpen} />
        {/* Container for user data */}
        <div className="usercontainer" id='usercontainer'>
          {/* Heading */}
          <h1 className='heading' id='heading'>Student Data</h1>
          {/* Display user data */}
          <h1>{`Name: ${user.studentName}`}</h1>
          <h1>{`Class: ${user.class}`}</h1>
          <h1>{`Father Name: ${user.fatherName}`}</h1>
          <h1>{`PhoneNo: ${user.PhoneNo}`}</h1>
          <h1>{`Fees: ${user.fees}`}</h1>
        </div>
      </div>
    </div>
  );
}

export default Studenthome;
