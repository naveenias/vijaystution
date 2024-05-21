import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  // Retrieve the authentication token from local storage
  const auth = localStorage.getItem('token');

  return (
    // If the token exists, render the Outlet (nested routes), otherwise redirect to the login page
    auth ? <Outlet /> : <Navigate to='/login' />
  );
};

export default PrivateRoutes;
