import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { LoginUser } from '../../apicalls/users';
import { Loginstudent } from '../../apicalls/students';

function Login({ isAdminLogged }) {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const values = { username, password };

  const navigate = useNavigate();

  // Function to handle form submission
  const Submitform = async (event) => {
    event.preventDefault();
    if (user === 'Admin') {
      try {
        const response = await LoginUser(values);
        if (response.data.success) {
          localStorage.setItem('token', response.data.jwttoken);
          isAdminLogged();
          localStorage.setItem('adminLoggedIn', 'true');
          navigate('/');
        } else {
          alert('Incorrect username and password');
        }
      } catch (error) {
        console.error('Error logging in admin:', error.message);
      }
    } else {
      try {
        const response = await Loginstudent(values);
        if (response.data.success) {
          const username = response.data.username;
          localStorage.setItem('token', response.data.jwttoken);
          navigate(`/Studenthome/${username}`);
        } else {
          alert('Incorrect username and password');
        }
      } catch (error) {
        console.error('Error logging in student:', error.message);
      }
    }
  };

  // Handlers for input changes
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className='login'>
      <div className='ff'>
        <form onSubmit={Submitform}>
          <h1 className='heading2'>Login Page</h1>
          <div className='mb-3 pa-5'>
            <label htmlFor='exampleInputEmail1' className='form-label'>User Name</label>
            <input type='text' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' onChange={onChangeUsername} required />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
            <input type='password' className='form-control' id='exampleInputPassword1' onChange={onChangePassword} required />
          </div>
          <div>
            <select onChange={onChangeUser}>
              <option defaultValue>Select the user</option>
              <option value='Admin'>Admin</option>
              <option value='Student'>Student</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
