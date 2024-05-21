import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Deletestudentbyid, GETStubyid, updatestudent } from '../../apicalls/students';
import "./index.css"
import { Addmarks, GETmarks } from '../../apicalls/marks';
import { GETattendence } from '../../apicalls/attendence';

function Studenthomeadmin() {
  
  const navigate = useNavigate();
  const _id=useParams();


  const [user, setuser]=useState({});
  const [test, settest] = useState("");
  const [Max, setmax] = useState();
  const [Min, setmin] = useState();
  const [kannada, setKannada] = useState();
  const [english, setEnglish] = useState();
  const [hindi, setHindi] = useState();
  const [maths, setMaths] = useState();
  const [science, setScience] = useState();
  const [social, setSocial] = useState();
  const [present, setpresent]=useState(0);
  const [absent, setabsent]=useState(0);
  const [testmarks, settestMarks] = useState([]);
  const [testdata, setTestdata] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showudatestud, setshowudatestud] = useState(false);
  const [showaddmarks, setshowmarks] = useState(false)
  const [showviewmarks, setshowviewmarks] = useState(false)
  const [showattendence, setshowattendence] = useState(false)
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
  const [percentage, setpercentage]=useState(0);
  const marks = {
    Max:Max,
    Min:Min,
    Kannada:kannada,
    english:english,
    hindi:hindi,
    maths:maths,
    science:science,
    social:social
  }
  const [studentName, setstudentName]=useState("")
  const [fatherName, setfatherName]=useState("")
  const [PhoneNo, setPhoneNo]=useState("")
  const [username, setusername]=useState("")
  const [password, setpassword]=useState("")
  const [studclass, setstudclass]=useState("")
  const [fees, setfees]=useState("")

  const values = {
    id:_id._id,
    test:test,
    marks:marks
  }
  
  const fetchData = async () => {
    try {
      const response = await GETStubyid(_id);
      setuser(response.data);
      setstudentName(response.data.studentName)
      setfatherName(response.data.fatherName)
      setPhoneNo(response.data.PhoneNo)
      setusername(response.data.username)
      setpassword(response.data.password)
      setstudclass(response.data.class)
      setfees(response.data.fees)
    } catch (error) {
      console.error(error.message);
      }
  };




useEffect(()=>{
    fetchData();
}, [_id])

  useEffect(() => {
  const fetchattendence = async () => {
    try {
      const attendanceResponse = await GETattendence();
      let presentCount = 0;
      let absentCount = 0;
      for (let i of attendanceResponse.data){
        for (let j of i.attendencedata){
          if (j.id === user._id){
            if (j.atend === "present"){
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
      setpercentage(attendancePercentage)
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch attendance only if user._id exists
  if (user._id) {
    fetchattendence();
  }
}, [user]);





const changeTest = async event => {
  setTestdata(event.target.value);
 
  try {
    const reversedtestMarksDetails = testmarks.filter(item => item.test === event.target.value);
    const testMarksDetails=reversedtestMarksDetails.reverse();
    if (testMarksDetails.length > 0) {
      setShowTable(true);
      setShowText(false);
      setMarksdata({
        Max:testMarksDetails[0].marks.Max,
        Min:testMarksDetails[0].marks.Min,
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
    }
  } catch (error) {
    console.error(error.message);
  }
};



  const deletestudent= async () => {
    const res= await Deletestudentbyid(_id)
    if (res.success){
      alert("Student Deleted")
      navigate("/studentdetails")
    }
    else{
      alert("Student not deleted")
    }
  }

  const addmarks= ()=> {
    setshowmarks(true)
    setshowviewmarks(false)
    setshowattendence(false)
    setshowudatestud(false)
  }

  const Viewmarks= async ()=> {
    setshowmarks(false)
    setshowviewmarks(true)
    setshowattendence(false)
    setshowudatestud(false)
    const idvalue = { id: user._id };
    try {
      const response = await GETmarks(idvalue);
      settestMarks(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  const updatestud= ()=> {
    setshowmarks(false)
    setshowviewmarks(false)
    setshowattendence(false)
    setshowudatestud(true)
  }

  const viewattendence= ()=> {
    setshowmarks(false)
    setshowviewmarks(false)
    setshowattendence(true)
    setshowudatestud(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the form data to the server
    try{
      const response = await Addmarks(values);
      if(response.success){
       alert("Marks added Succesfully")
       setmax("");
       setmin("");
       settest("");
      setKannada("");
      setEnglish("");
      setHindi("");
      setMaths("");
      setScience("");
      setSocial("");
      }else{
       throw new Error(response.message);
      }
   }catch(error){
      console.error(error.message)
   }
   
  }

  const onSubmitupdateForm = async(event)=>{
    event.preventDefault();
    const _id=user._id
    const studentnewdata={
      studentName,
      fatherName,
      PhoneNo,
      username,
      password,
      class:studclass,
      fees
    }
    
    const updatevalues={
      _id,
      studentnewdata
    }
    try {
      const response = await updatestudent(updatevalues);
      if (response.data.success){
        alert("Student updated succesfully")
        fetchData()
        
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const result=(parseInt(marksdata.Kannada)>=parseInt(marksdata.Min) & parseInt(marksdata.English)>=parseInt(marksdata.Min) & parseInt(marksdata.Hindi)>=parseInt(marksdata.Min) & parseInt(marksdata.Maths)>=parseInt(marksdata.Min) & parseInt(marksdata.Science)>=parseInt(marksdata.Min) & parseInt(marksdata.Social)>=parseInt(marksdata.Min))
  
    
  return (
    <div className='studentHomeadmincontainer'>
      
    <div  className="usercontainer">
    <h1 className='heading3'>Student Data</h1>
        <h1>{`name: ${user.studentName}`}</h1>
       <h1>{`Class: ${user.class}`}</h1>
       <h1>{`Father Name: ${user.fatherName}`}</h1> 
       <h1>{`Username: ${user.username}`}</h1> 
       <h1>{`password: ${user.password}`}</h1> 
        <h1>{`PhoneNo: ${user.PhoneNo}`}</h1>
        <h1>{`Fees: ${user.fees}`}</h1> 
        <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
             Remove Student
        </button>
      <button className='btn btn-primary' onClick={addmarks}>Add Marks</button>
      <button className='btn btn-primary' onClick={Viewmarks}>View Marks</button>
      <button className='btn btn-primary' onClick={viewattendence}>View Attendence </button>
      <button className='btn btn-primary' onClick={updatestud}>update Student </button>
    </div>
    </div>
    <div className='marksdata' style={showaddmarks ? {} : {display: 'none' }}>
    <div className='ff' id='addmarks'>
    <form onSubmit={handleSubmit}>
    <h1 className="heading2">Add Marks</h1>
    <div>
  <select onChange={(event)=> settest(event.target.value)} value={test}>
    <option defaultValue>Select the Test</option>
    <option value="Unit1">Unit1</option>
    <option value="Unit2">Unit2</option>
    <option value="Unit3">Unit3</option>
    <option value="Unit4">Unit4</option>
    <option value="Unit5">Unit5</option>
    <option value="Unit6">Unit6</option>
  </select>
  </div>
  <div className="d-flex mb-2 pa-4">
  <label className="form-label me-3">Max Marks:</label>
  <input type="text" className="form-control" value={Max} onChange={(event) => setmax(event.target.value)} required />
</div>
<div className="d-flex mb-3 pa-5">
  <label className="form-label me-3">Min Marks:</label>
  <input type="text" className="form-control" value={Min} onChange={(event) => setmin(event.target.value)} required />
</div>
  <div className="mb-3 pa-5 d-flex">
    <label  className="form-label me-3">Kannada:</label>
    <input type="text" className="form-control" value={kannada} onChange={(event) => setKannada(event.target.value)} required/>
 </div>
 <div className="d-flex mb-3 pa-5">
  <label className="form-label me-3">English:</label>
  <input type="text" className="form-control" value={english} onChange={(event) => setEnglish(event.target.value)} required />
</div>
 <div className="mb-3 pa-5 d-flex">
    <label  className="form-label me-3">Hindi:</label>
    <input type="text" className="form-control" value={hindi} onChange={(event) => setHindi(event.target.value)} required/>
 </div>
 <div className="mb-3 pa-5 d-flex">
    <label  className="form-label me-3">Maths:</label>
    <input type="text" className="form-control" value={maths} onChange={(event) => setMaths(event.target.value)} required/>
 </div>
 <div className="mb-3 pa-5 d-flex">
    <label  className="form-label me-3">Science:</label>
    <input type="text" className="form-control" value={science} onChange={(event) => setScience(event.target.value)} required/>
 </div>
 <div className="mb-3 pa-5 d-flex">
    <label  className="form-label me-3">Social:</label>
    <input type="text" className="form-control" value={social} onChange={(event) => setSocial(event.target.value)}required/>
 </div>
  
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </div>
    <div className='Updatestudent marksdata' style={showudatestud ? {} : {display: 'none' }}>
    <div className='ff' id='addmarks'>
    <form onSubmit={onSubmitupdateForm}>
          <h1 className="heading2">Update Student</h1>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="studentName" className="form-label ">Student Name:</label>
            <input type="text" className="form-control" id="studentName" aria-describedby="emailHelp" value={studentName} onChange={(event) => setstudentName(event.target.value)}/>
          </div>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="fatherName" className="form-label ">Father's Name:</label>
            <input type="text" className="form-control" id="fatherName" value={fatherName} onChange={(event) => setfatherName(event.target.value)}/>
          </div>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="phoneNo" className="form-label ">Phone No:</label>
            <input type="number" className="form-control" id="phoneNo" value={PhoneNo} onChange={(event) => setPhoneNo(event.target.value)}/>
          </div>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="class" className="form-label ">Class:</label>
            <select className="form-select" id="class" value={studclass} onChange={(event) => setstudclass(event.target.value)}>
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
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="fees" className="form-label ">Fees:</label>
            <input type="number" className="form-control" id="fees" value={fees} onChange={(event) => setfees(event.target.value)}/>
          </div>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="fees" className="form-label ">User Name:</label>
            <input type="String" className="form-control" id="User" value={username} onChange={(event) => setusername(event.target.value)}/>
          </div>
          <div className="d-flex mb-3 pa-5">
            <label htmlFor="fees" className="form-label ">Password:</label>
            <input type="String" className="form-control" id="Password" value={password} onChange={(event) => setpassword(event.target.value)}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
</div>
    </div>
    <div className='attendence' style={showattendence ? {} : {display: 'none' }}>
        <h1 className='heading3'>Attendence</h1>
        <h1>Total class present: {present}</h1>
        <h1>Total class absent: {absent}</h1>
        <h1>Attendence percentage: {percentage}%</h1>
    </div>
    <div className='viewmarks-container' style={showviewmarks ? {} : { display: 'none' }}>
        
        <div className=''>
        <h1 className=''>Test Results</h1>
        <div className='select-container'>
          <label>Select the Test:</label>
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
        
        <div className='table' id='table' style={showTable ? {} : { display: 'none' }}>
          <table >
            <thead>
              <tr className='laptop'>
                <th>Subject Name</th>
                <th>Max Marks</th>
                <th>Min Marks</th>
                <th>Marks Obtained</th>
                <th>Result</th>
              </tr>
              <tr className='phone'>
                <th>Subject</th>
                <th>Max</th>
                <th>Min</th>
                <th>Marks</th>
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
           
              {/* {Object.entries(marksdata).map(([subject, marks]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{marks}</td>
                </tr>
              ))} */}
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
          <h1 style={showText ? {} : { display: 'none' }}>{testdata} Test results are not Released</h1>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Remove Student</h1>
          </div>
          <div class="modal-body">
               Do you want to remove the student
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
            <button type="button" class="btn btn-primary" onClick={deletestudent}>Yes</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Studenthomeadmin