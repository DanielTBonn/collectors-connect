import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import UserProfile from '../components/UserProfile';
import AuthService from '../utils/auth'; 

const LoggedInPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading: userLoading, data: userData } = useQuery(GET_ME);

  useEffect(() => {
    // Check if the user is logged in using the AuthService
    const userIsLoggedIn = AuthService.loggedIn();

    // Update the state accordingly
    setIsLoggedIn(userIsLoggedIn);
  }, [userData]);

  const user = userData?.me || {};

  return (
    <>
      <div>
        {isLoggedIn ? `Hello ${user.username}` : 'Log in to see your page'}
      </div>
      {user && <UserProfile user={user} />}
    </>
  );
};

export default LoggedInPage;




