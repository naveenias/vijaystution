import React, { useEffect, useState } from 'react';
import "./index.css";
import { GETStu } from '../../apicalls/students';
import { sendsms } from '../../apicalls/sendsms';

function Sendupdate() {
  // State for the message text
  const [textmessage, setmessagetext] = useState("");
  // State for student data
  const [userdata, setuserdata] = useState([]);
  // State for students not registered to receive SMS
  const [studsnotregisterdtwilo, setstudsnotregisterdtwilo] = useState("every one are registerd");
  // State for button text
  const [buttontext, setbuttontext] = useState("Send Message");

  // Fetch student data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GETStu();
        setuserdata(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  // Function to send SMS to parents of all students
  const onclicksendmessage = async () => {
    let notregisterd = "";
    setbuttontext("Sending...");
    for (let item of userdata) {
      const { PhoneNo, studentName } = item;
      const message = textmessage;
      const values = { PhoneNo, message };
      const response = await sendsms(values);
      if (!response.data.success) {
        notregisterd = notregisterd + studentName + ", ";
      }
    }
    setbuttontext("Sent");
    alert("message sent successfully");
    setstudsnotregisterdtwilo(notregisterd);
  };

  return (
    <div className='sendmessagecontainer'>
      <div className='sendmessagecontent'>
        <h1 className='sendmessageheading'>Send Message To The Parents</h1>
        {/* Textarea to input the message */}
        <textarea className='sendmessagetextarea' placeholder="Enter your message..." onChange={(event) => setmessagetext(event.target.value)} rows="11" required />
        <div className='sendmessagebutton'>
          {/* Button to send the message */}
          <button className='btn1 btn-primary' onClick={onclicksendmessage}>{buttontext}</button>
        </div>
        {/* Display list of students not registered to receive SMS */}
        <h1 className='notregheading1' style={buttontext === "Sent" ? {} : { display: 'none' }}>This are the students not registered to get SMS: {studsnotregisterdtwilo}</h1>
      </div>
    </div>
  );
}

export default Sendupdate;
