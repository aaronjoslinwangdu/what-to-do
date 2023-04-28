import React from 'react';
import { authActions } from '../store/auth/authSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TestPage = () => {
  const email = useSelector(state => state.auth.email);
  const accessToken = useSelector(state => state.auth.accessToken);

  console.log(email)
  console.log(accessToken)

  const test = accessToken ? (    
    <div>
      <div>email of logged in user: {email}</div>
      <div>token: {accessToken.slice(0,9)}</div>
    </div>
  ) : (
    <div>
      <Link to="/login">Go to login</Link>
    </div>
  );

  return test;
}

export default TestPage