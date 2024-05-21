import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GETStu } from '../../apicalls/students';
import { Addattendence } from '../../apicalls/attendence';
import "./index.css";

function Attendence() {
  // State for the selected date in the date picker
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State for storing student details fetched from the API
  const [details, setdetails] = useState([]);
  // State for storing attendance data
  const [studentattendencedata, setstudentattendencedata] = useState([]);
  
  // Fetch student details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GETStu();
        setdetails(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Handler for changing attendance status
  const onchangeatendence = (event) => {
    const fullvalue = event.target.value;
    const id = fullvalue.slice(0, 24);
    const atend = fullvalue.slice(24);
    const index = studentattendencedata.findIndex(obj => obj.id === id);
    
    if (index !== -1) {
      setstudentattendencedata(prevArray => [
        ...prevArray.slice(0, index),
        { id: id, atend: atend },
        ...prevArray.slice(index + 1),
      ]);
    } else {
      setstudentattendencedata(prevArray => [...prevArray, { id: id, atend: atend }]);
    }
  };

  // Handler for submitting attendance
  const submitattendence = async () => {
    const attendencedate = selectedDate.toLocaleDateString().toString();
    const attendanceObject = { date: attendencedate, attendencedata: studentattendencedata };
    
    try {
      const response = await Addattendence(attendanceObject);
      if (response.success) {
        alert("Attendance added successfully");
        // Uncheck all radio buttons
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
          input.checked = false;
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='stuattendence' id='stdentattendence'>
      <div>
        <h1 className='attendheading'>Add Attendance</h1>
      </div>
      <div className='section-container'>
        <div className='date-picker-container' id='datepicker'>
          <h1 className='singleline'>Select a date:</h1>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      
      <div className='stutablecontainer'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Date</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {details.map(item => (
              <tr key={item._id}>
                <td>{item.studentName}</td>
                <td>{item.class}</td>
                <td>{selectedDate.toLocaleDateString()}</td>
                <td className="radio-container">
                  <label>
                    <input
                      type="radio"
                      name={item._id}
                      value={`${item._id}present`}
                      onChange={onchangeatendence}
                    />
                    <span></span> Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={item._id}
                      value={`${item._id}absent`}
                      onChange={onchangeatendence}
                    />
                    <span></span> Absent
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='btn-primary' onClick={submitattendence}>Submit Attendance</button>
      </div>
    </div>
  );
}

export default Attendence;
