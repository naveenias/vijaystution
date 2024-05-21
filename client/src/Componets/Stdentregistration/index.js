import {React, Component} from 'react'
import "./index.css"
import { AddStu } from '../../apicalls/students'


class Studentregistration extends Component {

 state = {
  studentName:"",
  fatherName: "",
  PhoneNo : "",
  username : "",
  password : "",
  class: "",
  fees: "",
 }

 onSubmitForm = async (event) => {
  event.preventDefault()
  try{
     const response = await AddStu(this.state);
     if(response.success){
      alert("Student added Succesfully")
      this.setState({ 
        studentName: "",
        fatherName: "",
        PhoneNo: "",
        username : "",
        password : "",
        class: "",
        fees: ""
      });
     }else{
      throw new Error(response.message);
     }
  }catch(error){
     console.error(error.message)
  }

}

 onChangestudentNamename = event => {
  this.setState({studentName: event.target.value})
}

onChangefatherName = event => {
  this.setState({fatherName: event.target.value})
}

onChangePhoneNo = event => {
  this.setState({PhoneNo: event.target.value})
}

onChangeclass = event => {
  this.setState({class: event.target.value})
}

onChangefees = event => {
  this.setState({fees: event.target.value})
}

onChangeusername = event => {
  this.setState({username: event.target.value})
}

onChangepassword = event => {
  this.setState({password: event.target.value})
}

  
  render () {
    return (
      <div className='regform'>
        <form onSubmit={this.onSubmitForm} className="registration-form">
          <h1 className="text-center studheading">Student Registration</h1>
          <div className="form-group">
            <label htmlFor="studentName" className="form-label heading">Student Name:</label>
            <input type="text" className="form-control" id="studentName" aria-describedby="emailHelp" value={this.state.studentName} onChange={this.onChangestudentNamename}/>
          </div>
          <div className="form-group">
            <label htmlFor="fatherName" className="form-label heading">Father's Name:</label>
            <input type="text" className="form-control" id="fatherName" value={this.state.fatherName} onChange={this.onChangefatherName}/>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo" className="form-label heading">Phone No:</label>
            <input type="tel" className="form-control" id="phoneNo" value={this.state.PhoneNo} onChange={this.onChangePhoneNo}/>
          </div>
          <div className="form-group">
            <label htmlFor="class" className="form-label heading">Class:</label>
            <select className="form-select" id="class" value={this.state.class} onChange={this.onChangeclass}>
              <option defaultValue>Select the class</option>
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
              <option value="11">1st PUC </option>
              <option value="12">2nd PUC</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fees" className="form-label heading">Fees:</label>
            <input type="number" className="form-control" id="fees" value={this.state.fees} onChange={this.onChangefees}/>
          </div>
          <div className="form-group">
            <label htmlFor="fees" className="form-label heading">User Name:</label>
            <input type="String" className="form-control" id="User" value={this.state.username} onChange={this.onChangeusername}/>
          </div>
          <div className="form-group">
            <label htmlFor="fees" className="form-label heading">Password:</label>
            <input type="String" className="form-control" id="Password" value={this.state.password} onChange={this.onChangepassword}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  
  }
  
}

export default Studentregistration