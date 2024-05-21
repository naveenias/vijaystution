import React, { Component } from 'react';
import { Adduser } from '../../apicalls/users';

export default class Adminregister extends Component {
  // Initialize the component state
  state = {
    username: "",
    password: "",
  };

  // Handler for form submission
  onSubmitForm = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await Adduser(this.state); // Call the API to add a new user
      if (response.success) {
        alert("Admin added successfully");
        // Reset the form fields
        this.setState({
          username: "",
          password: "",
        });
      } else {
        throw new Error(response.message); // Throw an error if the response is not successful
      }
    } catch (error) {
      console.error(error.message); // Log any errors
    }
  };

  // Handler for username input change
  onChangeusername = (event) => {
    this.setState({ username: event.target.value });
  };

  // Handler for password input change
  onChangepassword = (event) => {
    this.setState({ password: event.target.value });
  };

  // Render the component
  render() {
    return (
      <div className='tregform'>
        <form onSubmit={this.onSubmitForm} className="tregistration-form">
          <h1 className="text-center theading">Admin Register page</h1>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="tform-label">User Name</label>
            <input 
              type="text" 
              className="tform-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              value={this.state.username} 
              onChange={this.onChangeusername} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="tform-label">Password</label>
            <input 
              type="password" 
              className="tform-control" 
              id="exampleInputPassword1" 
              value={this.state.password} 
              onChange={this.onChangepassword} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
