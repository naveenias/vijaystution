import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GETStu } from '../../apicalls/students';
import { GETattendence } from '../../apicalls/attendence';
import './index.css';

class Attendencedetailes extends Component {
  state = {
    selectedDate: new Date(),
    details: [],
    studentclassdetails: [],
    studentattendencedata: [],
    attendencedatedata: [],
    attendencedetailse: [],
    showtext: false,
    showetable: false
  };

  // Fetch data when the component mounts
  componentDidMount() {
    this.fetchData();
  }

  // Function to fetch student and attendance data
  fetchData = async () => {
    try {
      const studResponse = await GETStu();
      const attendanceResponse = await GETattendence();
      this.setState({
        details: studResponse.data,
        studentclassdetails: studResponse.data,
        studentattendencedata: attendanceResponse.data,
      }, () => {
        // Once state is updated, call updateAttendenceDetails
        this.updateAttendenceDetails();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handler for changing the selected date
  onchangedate = async (date) => {
    await this.setState({ selectedDate: date });
    this.updateAttendenceDetails();
  };

  // Handler for changing the selected class
  onChangeclass = async (e) => {
    const studetails = this.state.details.filter(
      (item) => parseInt(item.class) === parseInt(e.target.value)
    );
    await this.setState({ studentclassdetails: studetails });
    this.updateAttendenceDetails();
  };

  // Function to update attendance details based on selected date and class
  updateAttendenceDetails = () => {
    const { selectedDate, studentclassdetails, studentattendencedata } = this.state;
    const reverseddatedata = studentattendencedata.filter(item => item.date === selectedDate.toLocaleDateString()) || { attendencedata: [] };
    
    const datedata = reverseddatedata.reverse();
    
    if (datedata.length === 0) {
      this.setState({ showtext: true, showetable: false });
      alert(`No Attendance taken on ${selectedDate.toLocaleDateString()}`);
    } else {
      this.setState({ showtext: false, showetable: true });

      const updatedAttendenceDetails = [];

      for (let i of studentclassdetails) {
        for (let j of datedata[0].attendencedata) {
          if (i._id === j.id) {
            updatedAttendenceDetails.push({
              studentname: i.studentName,
              class: i.class,
              date: selectedDate.toLocaleDateString(),
              atendence: j.atend,
            });
          }
        }
      }

      this.setState({ attendencedetailse: updatedAttendenceDetails });
    }
  };

  render() {
    const { selectedDate, attendencedetailse } = this.state;

    return (
      <div className='stuattendence'>
        <div>
          <h1 className='attendheading'>View Attendance</h1>
        </div>
       
        <div className='section-container'>
          <div className='date-picker-container'>
            <h1 className='singleline'>Select The Date:</h1>
            <DatePicker
              selected={selectedDate}
              onChange={this.onchangedate}
              dateFormat="dd/MM/yyyy"
              className='date'
            />
          </div>

          <div className='select-class-container'>
            <h1>Select the class:</h1>
            <select className="form-select" aria-label="Default select example" onChange={this.onChangeclass}>
              <option defaultValue>Select class</option>
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
        </div>

        <div className="tablecontainer" id='tablecontainer' style={this.state.showetable ? {} : { display: 'none' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Date</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendencedetailse.map((item, index) => (
                <tr key={index}>
                  <td>{item.studentname}</td>
                  <td>{item.class}</td>
                  <td>{item.date}</td>
                  <td>{item.atendence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 style={this.state.showtext ? { color: "red" } : { display: "none" }}>
          No Attendance Taken on {this.state.selectedDate.toLocaleDateString()}
        </h1>
      </div>
    );
  }
}

export default Attendencedetailes;
