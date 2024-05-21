import React, { Component } from 'react';
import "./index.css"; // Importing the CSS file
import { GETteacher } from '../../apicalls/teachers'; // Importing API call function for fetching teacher details

class Teacherdetails extends Component {
  state = {
    details: [] // Initializing state to store teacher details
  }

  componentDidMount() {
    this.fetchData(); // Fetching teacher details when component mounts
  }

  // Function to fetch teacher details from the server
  fetchData = async () => {
    try {
      const response = await GETteacher(); // Making API call to get teacher details
      this.setState({ details: response.data }); // Updating state with fetched details
    } catch (error) {
      console.error(error.message); // Logging error message if API call fails
    }
  };

  render() {
    return (
      <div className='stutable-container teacher'>
        <h1 className="heading2">Teacher details</h1>
        <div className="table-responsive">
          <table className='table'>
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Phone No</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping through teacher details and rendering table rows */}
              {this.state.details.map(item => (
                <tr key={item.id}>
                  <td>{item.teacherName}</td>
                  <td>{item.PhoneNo}</td>
                  <td>{item.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Teacherdetails;
