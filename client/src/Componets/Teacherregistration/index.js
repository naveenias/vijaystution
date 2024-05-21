import React, { Component } from 'react';
import "./index.css"; // Importing the CSS file
import { Addteacher } from '../../apicalls/teachers'; // Importing API call function for adding a teacher

class Teacherregistration extends Component {
  state = {
    teacherName: "", // Initializing state for teacher registration form fields
    PhoneNo: "",
    salary: ""
  }

  // Function to handle form submission
  onSubmitForm = async (event) => {
    event.preventDefault(); // Preventing default form submission behavior
    try {
      const response = await Addteacher(this.state); // Making API call to add teacher
      if (response.success) {
        alert("Teacher added Successfully"); // Showing success message if teacher added successfully
        // Resetting form fields after successful submission
        this.setState({
          teacherName: "",
          PhoneNo: "",
          salary: ""
        });
      } else {
        throw new Error(response.message); // Throwing an error if adding teacher fails
      }
    } catch (error) {
      console.error(error.message); // Logging error message if API call fails
    }
  }

  // Function to handle changes in teacher name input field
  onChangeteachername = event => {
    this.setState({ teacherName: event.target.value });
  }

  // Function to handle changes in phone number input field
  onChangePhoneNo = event => {
    this.setState({ PhoneNo: event.target.value });
  }

  // Function to handle changes in salary input field
  onChangesalary = event => {
    this.setState({ salary: event.target.value });
  }

  render() {
    return (
      <div className='tregform'>
        <form onSubmit={this.onSubmitForm} className="tregistration-form">
          <h1 className="text-center theading">Teacher Registration</h1>
          {/* Teacher registration form fields */}
          <div className="tform-group">
            <label htmlFor="teachername" className="tform-label heading">Teacher Name:</label>
            <input type="text" className="tform-control" id="teachername" aria-describedby="emailHelp" value={this.state.teacherName} onChange={this.onChangeteachername} />
          </div>
          <div className="tform-group">
            <label htmlFor="exampleInputPassword1" className="tform-label heading">Phone Number:</label>
            <input type="tel" className="tform-control" id="exampleInputPassword1" value={this.state.PhoneNo} onChange={this.onChangePhoneNo} />
          </div>
          <div className="tform-group">
            <label htmlFor="exampleInputPassword1" className="tform-label heading">Salary:</label>
            <input type="number" className="tform-control" id="exampleInputPassword1" value={this.state.salary} onChange={this.onChangesalary} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Teacherregistration;
