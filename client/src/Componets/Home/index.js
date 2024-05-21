import React, { useEffect, useState } from 'react';
import "./index.css";
import { GETStu } from '../../apicalls/students';
import { GETteacher } from '../../apicalls/teachers';

function Home() {
  // State variables to store totals
  const [totalstudent, settotalstudent] = useState(0);
  const [totalteacher, settotalteacher] = useState(0);
  const [totalfees, settotalfees] = useState(0);
  const [totalsalary, settotalsalary] = useState(0);

  // Effect hook to fetch data on component mount
  useEffect(() => {
    // Function to fetch student data
    const fetchStudentData = async () => {
      try {
        const response = await GETStu();
        const details = response.data;
        const num = details.length;
        let sum = 0;
        // Calculate total fees from all students
        details.forEach((item) => {
          sum += item.fees;
        });
        settotalfees(sum);
        settotalstudent(num);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    // Function to fetch teacher data
    const fetchTeacherData = async () => {
      try {
        const response = await GETteacher();
        const details = response.data;
        const num = details.length;
        let sum = 0;
        // Calculate total salary from all teachers
        details.forEach((item) => {
          sum += item.salary;
        });
        settotalsalary(sum);
        settotalteacher(num);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    // Fetch both student and teacher data
    fetchStudentData();
    fetchTeacherData();
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <div>
      <div className='Homecontainer'>
        <h1 className='titalheading'>Vj's Mukyaprana Study Zone</h1>
        <p className='adminheading'>Welcome to the admin page! Here, you can manage schedules, track student progress, and communicate with parents effortlessly. Empower your tuition center's efficiency and effectiveness with intuitive tools tailored to your needs.</p>
        <div className='container'>
          <div className='card'>
            <h1 className="card-title">Total Students</h1>
            <p className="card-value">{totalstudent}</p>
          </div>
          <div className='card'>
            <h1 className="card-title">Total Teachers</h1>
            <p className="card-value">{totalteacher}</p>
          </div>
          <div className='card'>
            <h1 className="card-title">Total Fees</h1>
            <p className="card-value">{totalfees}</p>
          </div>
          <div className='card'>
            <h1 className="card-title">Total Salary</h1>
            <p className="card-value">{totalsalary}</p>
          </div>
        </div>
      </div>
      <div className='waves'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="1" d="M0,256L30,250.7C60,245,120,235,180,202.7C240,171,300,117,360,117.3C420,117,480,171,540,208C600,245,660,267,720,266.7C780,267,840,245,900,245.3C960,245,1020,267,1080,277.3C1140,288,1200,288,1260,266.7C1320,245,1380,203,1410,181.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
}

export default Home;
