import React, { useEffect, useState } from 'react';
import { GETmarks } from '../../apicalls/marks';
import { useParams } from 'react-router-dom';
import { GETStubynumber } from '../../apicalls/students';
import Studentsidebar from '../Studentsidebar';
import './index.css'

function Viewmarks({isOpen}) {
  const [marks, setMarks] = useState([]);
  const [user, setUser] = useState({});
  const [test, setTest] = useState("");
  const [showresult, setshowresult] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showText, setShowText] = useState(false);
  const [marksdata, setMarksdata] = useState({
    Max:"",
    Min:"",
    Kannada: '',
    English: '',
    Hindi: '',
    Maths: '',
    Science: '',
    Social: ''
  });

  const { username } = useParams();

  useEffect(() => {
    // Fetch student data based on username
    const fetchStudent = async () => {
      const values = { username: username };
      try {
        const response = await GETStubynumber(values);
        setUser(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStudent();
  }, [username]);

  useEffect(() => {
    // Fetch marks data based on user ID
    const fetchMarks = async () => {
      const idvalue = { id: user._id };
      try {
        const response = await GETmarks(idvalue);
        setMarks(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (user._id) {
      fetchMarks();
    }
  }, [user]);

  // Function to handle test selection
  const changeTest = async event => {
    setTest(event.target.value);
    try {
      const reversedtestMarksDetails = marks.filter(item => item.test === event.target.value);
      const testMarksDetails = reversedtestMarksDetails.reverse();
      if (testMarksDetails.length > 0) {
        setShowTable(true);
        setShowText(false);
        setshowresult(true);
        setMarksdata({
          Max: testMarksDetails[0].marks.Max,
          Min: testMarksDetails[0].marks.Min,
          Kannada: testMarksDetails[0].marks.Kannada,
          English: testMarksDetails[0].marks.english,
          Hindi: testMarksDetails[0].marks.hindi,
          Maths: testMarksDetails[0].marks.maths,
          Science: testMarksDetails[0].marks.science,
          Social: testMarksDetails[0].marks.social
        });
      } else {
        setShowTable(false);
        setShowText(true);
        setshowresult(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Calculate result
  const result = (
    parseInt(marksdata.Kannada) >= parseInt(marksdata.Min) &&
    parseInt(marksdata.English) >= parseInt(marksdata.Min) &&
    parseInt(marksdata.Hindi) >= parseInt(marksdata.Min) &&
    parseInt(marksdata.Maths) >= parseInt(marksdata.Min) &&
    parseInt(marksdata.Science) >= parseInt(marksdata.Min) &&
    parseInt(marksdata.Social) >= parseInt(marksdata.Min)
  );

  return (
    <div className='viewmarks' >
     <Studentsidebar isOpen={isOpen}/>
      <div className='viewmark'>
        <h1 className='marksheading'>View your Test results Here</h1>
        <div>
          <select onChange={changeTest}>
            <option defaultValue>Select the Test</option>
            <option value='Unit1'>Unit1</option>
            <option value='Unit2'>Unit2</option>
            <option value='Unit3'>Unit3</option>
            <option value='Unit4'>Unit4</option>
            <option value='Unit5'>Unit5</option>
            <option value='Unit6'>Unit6</option>
          </select>
        </div>
        <div>
          <div className='table-responsive' style={showTable ? {} : { display: 'none' }}>
            <table className='table'>
              <thead>
                <tr>
                <th>Subject Name</th>
                <th>Max Marks</th>
                <th>Min Marks</th>
                <th>Marks obtained</th>
                <th>Result</th>
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>Kannada</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.Kannada}</td>
              <td style={(parseInt(marksdata.Kannada)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.Kannada) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>

            </tr>
            <tr>
              <td>English</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.English}</td>
              <td style={(parseInt(marksdata.English)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.English) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>
            </tr>
            <tr>
              <td>Hindi</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.Hindi}</td>
              <td style={(parseInt(marksdata.Hindi)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.Hindi) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>
            </tr>
            <tr>
              <td>Maths</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.Maths}</td>
              <td style={(parseInt(marksdata.Maths)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.Maths) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>
            </tr>
            <tr>
              <td>Science</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.Science}</td>
              <td style={(parseInt(marksdata.Science)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.Science) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>
            </tr>
            <tr>
              <td>Social</td>
              <td>{marksdata.Max}</td>
              <td>{marksdata.Min}</td>
              <td>{marksdata.Social}</td>
              <td style={(parseInt(marksdata.Social)>=parseInt(marksdata.Min))?{color:'green'}:{color:'red'}}>{(parseInt(marksdata.Social) >= parseInt(marksdata.Min)) ? 'Pass' : 'Fail'}</td>
            </tr>
           
             
              <tr>
                <td style={result?{backgroundColor:'green'}:{backgroundColor:'red'}}>Total</td>
                <td style={result?{backgroundColor:'green'}:{backgroundColor:'red'}}>{parseInt(marksdata.Max)*6}</td>
                <td style={result?{backgroundColor:'green'}:{backgroundColor:'red'}}>{parseInt(marksdata.Min)*6}</td>
                <td style={result?{backgroundColor:'green'}:{backgroundColor:'red'}}>{parseInt(marksdata.Kannada)+parseInt(marksdata.English)+parseInt(marksdata.Hindi)+parseInt(marksdata.Maths)+parseInt(marksdata.Science)+parseInt(marksdata.Social)}</td>
                <td style={result?{backgroundColor:'green'}:{backgroundColor:'red'}}>{result?"Pass":"Fail"}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <h1 style={showText ? {} : { display: 'none' }}>{test} Test results are not Released</h1>
          <h1 style={{ display: showresult ? 'block' : 'none', color: result ? 'green' : 'red' }}>
            {result ? "Congrats You Are Passed" : "Sorry you got failed, Need to work hard"}
          </h1>

        </div>
      </div>
    </div>
  );
}

export default Viewmarks;
