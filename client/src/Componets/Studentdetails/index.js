import React, { useState, useEffect } from 'react';
import { GETStu } from '../../apicalls/students';
import './index.css';
import { useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [studentclassdetails, setStudentclassdetails] = useState([]);

  // Fetch student data from API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch student data from API
  const fetchData = async () => {
    try {
      const response = await GETStu();
      setDetails(response.data);
      setStudentclassdetails(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Filter students based on selected class
  const onChangeclass = (e) => {
    const studetails = details.filter((item) => parseInt(item.class) === parseInt(e.target.value));
    setStudentclassdetails(studetails);
  };

  // Redirect to student details page
  const onViewStudent = (id) => {
    navigate(`/Studenthomeadmin/${id}`);
  };

  return (
    <div className='stutable-container'>
      {/* Heading */}
      <h1 className="heading2">Student Details</h1>
      {/* Dropdown to select class */}
      <div>
        <select className="form-select" aria-label="Default select example" onChange={onChangeclass}>
          <option defaultValue>Select the class</option>
          {/* Options for different classes */}
          <option value="1">First</option>
          <option value="2">Second</option>
          <option value="3">Third</option>
          <option value="4">Fourth</option>
          <option value="5">Fifth</option>
          <option value="6">Sixth</option>
          <option value="7">Seventh</option>
          <option value="8">Eighth</option>
          <option value="9">Ninth</option>
          <option value="10">SSLC</option>
          <option value="11">1st PUC</option>
          <option value="12">2nd PUC</option>
        </select>
      </div>
      {/* Table to display student details */}
      <div className="table-responsive">
        <table className='table'>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Father's Name</th>
              <th>Phone No</th>
              <th>Fees</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through filtered student details */}
            {studentclassdetails.map(item => (
              <tr key={item._id}>
                <td>{item.studentName}</td>
                <td>{item.class}</td>
                <td>{item.fatherName}</td>
                <td>{item.PhoneNo}</td>
                <td>{item.fees}</td>
                {/* Button to view student details */}
                <td><button className="btn-view" onClick={(event)=>onViewStudent(item._id)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
