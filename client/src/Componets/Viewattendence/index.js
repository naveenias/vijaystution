import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GETStubynumber } from '../../apicalls/students'; // Importing API call function for fetching student details
import { GETattendence } from '../../apicalls/attendence'; // Importing API call function for fetching attendance data
import "./index.css"; // Import the CSS file
import Studentsidebar from '../Studentsidebar'; // Importing Studentsidebar component

function Viewattendence({isOpen}) {
    const [user, setuser] = useState({}); // State for storing student details
    const [present, setpresent] = useState(0); // State for storing total classes present
    const [absent, setabsent] = useState(0); // State for storing total classes absent
    const [percentage, setpercentage] = useState(0); // State for storing attendance percentage

    const { username } = useParams(); // Getting username from URL parameters

    // Effect hook to fetch student details
    useEffect(() => {
        const fetchstudent = async () => {
            const values = { username: username };
            try {
                const response = await GETStubynumber(values);
                setuser(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchstudent();
    }, [username]);

    // Effect hook to fetch attendance data
    useEffect(() => {
        const fetchattendence = async () => {
            try {
                const attendanceResponse = await GETattendence();
                let presentCount = 0;
                let absentCount = 0;
                for (let i of attendanceResponse.data) {
                    for (let j of i.attendencedata) {
                        if (j.id === user._id) {
                            if (j.atend === "present") {
                                presentCount++;
                            } else {
                                absentCount++;
                            }
                        }
                    }
                }
                setpresent(presentCount);
                setabsent(absentCount);
                const totalClasses = presentCount + absentCount;
                const attendancePercentage = totalClasses === 0 ? 0 : ((presentCount / totalClasses) * 100).toFixed(2);
                setpercentage(attendancePercentage);
            } catch (error) {
                console.error(error.message);
            }
        };

        // Fetch attendance only if user._id exists
        if (user._id) {
            fetchattendence();
        }
    }, [user]);

    return (
        <div className='studenthome'>
            <Studentsidebar isOpen={isOpen}/> {/* Rendering the Studentsidebar component */}
            <div className='usercontainer' id='usercontainer'>
                <h1 className='heading' id='heading'>Attendance</h1> {/* Title */}
                <h1>Total classes present: {present}</h1> {/* Displaying total classes present */}
                <h1>Total classes absent: {absent}</h1> {/* Displaying total classes absent */}
                <h1>Percentage: {percentage}%</h1> {/* Displaying attendance percentage */}
            </div>
        </div>
    );
}

export default Viewattendence;
