import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GETStu } from '../../apicalls/students';
import { GETattendence } from '../../apicalls/attendence';
import './index.css'; 
import { sendsms } from '../../apicalls/sendsms';

class Sendsms extends Component {
  state = {
    selectedDate: new Date(),
    details: [],
    studentattendencedata: [],
    attendencedatedata: [],
    attendencedetailse: [],
    studsnotregisterdtwilo:"every one are registerd",
    buttontext:"Send SMS",
    showtext: false,
    showetable: false
  };

  

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const studResponse = await GETStu();
      const attendanceResponse = await GETattendence();

      this.setState({
        details: studResponse.data,
        studentattendencedata: attendanceResponse.data,
      }, () => {
        // Once state is updated, call updateAttendenceDetails
        this.updateAttendenceDetails();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  onchangedate = async (date) => {
    this.setState({ buttontext: "Send SMS" });
    await this.setState({ selectedDate: date });
    this.updateAttendenceDetails();
  };

  onclicksendsms = async () => {
    const { selectedDate, attendencedetailse } = this.state; // Destructure selectedDate from state
    const absent = attendencedetailse.filter(
      (item) => item.atendence === "absent"
    );
    let notregisterd=""
    this.setState({ buttontext: "Sending..." });
    for (let i of absent) {
      const { PhoneNo, fatherName, studentname } = i; // Destructure necessary properties from i
      
      const message = `Dear ${fatherName}, this is from Vjs Mukyaprana Study Zone. This message is to inform you that ${studentname} has not attended the tuition classes on "${selectedDate.toLocaleDateString()}".`;
      const values={PhoneNo,message}
      const response = await sendsms(values);
      
      if (!response.data.success){
        notregisterd=notregisterd+studentname+", "
        
      }
     
    }
    this.setState({ buttontext: "Sent" });
    alert("Abesnt message sent succesfully")
    if (notregisterd.length>0){
      this.setState({ studsnotregisterdtwilo: notregisterd });

    }
  };

 

  updateAttendenceDetails = () => {
    const { selectedDate, details, studentattendencedata } = this.state;
    const reverseddatedata = studentattendencedata.filter(item => item.date === selectedDate.toLocaleDateString()) || {attendencedata: []};
    
    const datedata = reverseddatedata.reverse();
    if (datedata.length === 0){
      this.setState({showtext: true, showetable: false})
      alert(`No Attendence taken on ${selectedDate.toLocaleDateString()}`)
     
    }else{
      this.setState({showtext: false, showetable: true})

    const updatedAttendenceDetails = [];

    for (let i of details) {
      for (let j of datedata[0].attendencedata) {
        if (i._id === j.id) {
          updatedAttendenceDetails.push({
            PhoneNo:i.PhoneNo,
            studentname: i.studentName,
            fatherName: i.fatherName,
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
        <h1 className='attendheading'>Send Absent SMS</h1>
      </div>
       
        <div className='section-container'>
         
         <div className='date-picker-container'>
           <h1>Select a date:</h1>
           <DatePicker
          selected={selectedDate}
          onChange={this.onchangedate}
          dateFormat="dd/MM/yyyy"
          />
           <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
         </div>

        
         
       </div>
        <div className="tablecontainer" style={this.state.showetable?{}:{display:'none'}}>
          

         
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
        <button className='btn btn-primary' style={this.state.showetable?{}:{display:'none'}} onClick={this.onclicksendsms}>{this.state.buttontext}</button>
        <h1 className='notregheading' style={this.state.buttontext==="Sent" ? {} : {display: 'none' }}>This are the students not registerd to get SMS: {this.state.studsnotregisterdtwilo}</h1>
        <h1 style={this.state.showtext ? {color:"red", padding:"30px"} : { display: "none"} }>
            No Attendance Taken on {this.state.selectedDate.toLocaleDateString()}
         </h1>
      </div>
    );
  }
}

export default Sendsms;
