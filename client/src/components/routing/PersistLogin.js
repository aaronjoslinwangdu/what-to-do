import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import usePersist from '../../hooks/usePersist';
import { useRefreshMutation } from '../../store/auth/authApiSlice';
import { authActions } from '../../store/auth/authSlice';
import Spinner from '../../components/layout/Spinner';


const PersistLogin = () => {
  const dispatch = useDispatch();
  const [persist] = usePersist();
  const accessToken = useSelector(state => state.auth.accessToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isLoading, isSuccess, isError, error, isUninitialized }] = useRefreshMutation();

  useEffect(() => {

    const verifyRefreshToken = async () => {
      console.log('starting verify refresh token');
      try {
        const response = await refresh();
        console.log('refresh rsponse', response.data);
        setTrueSuccess(true);
      } catch (error) {
        console.log(error);
      }
    }

    if (!accessToken && persist) verifyRefreshToken();
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />
  } else if (isLoading) {
    content = <Spinner />
  } else if (isError) {
    content = (
      <div>
        <Link to='/login'>Please Log In Again</Link>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (accessToken && isUninitialized) {
    content = <Outlet />
  }

  return content;
}

export default PersistLogin;