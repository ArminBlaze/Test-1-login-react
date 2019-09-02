import React from 'react';
import { Redirect } from 'react-router-dom';

const ProfilePage = ({ isLoggedIn }) => {
  if(!isLoggedIn) return <Redirect to='/login'/>;

  return (
    <div className='jumbotron text-center'>
      <h3>Профиль - виден только после входа.</h3>
    </div>
  )
};

export {ProfilePage};