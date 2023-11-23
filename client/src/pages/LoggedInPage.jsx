import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Route, Routes } from 'react-router-dom'; 
import { GET_ME } from '../utils/queries';
import AuthService from '../utils/auth';
import { Button } from 'react-bootstrap';
import CreateCollection from './CreateCollection';
import CollectionImageComponent from '../components/CollectionImageComponent';

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

  console.log(user);
  const collectionArray = user.collections || [];

  return (
    <div className="user-profile">
      <div>{isLoggedIn ? `Hello ${user.username}` : 'Log in to see your page'}</div>
      {user.collectionCount <= 0 ? (
        <div>No collections</div>
      ) : (
        <div>
          {collectionArray.map((collection, index) => (
            <div key={index}>
              <h3>{collection.name}</h3>
              <CollectionImageComponent collection={collection} />
              {collection.items.length <= 0 ? (
                <div>No items in this collection</div>
              ) : (
                <ul>
                  {collection.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{/* Render item details here */}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <Link to="/createCollection">
        <Button variant="primary">Add New Collection</Button>
      </Link>

    </div>
  );
};

export default LoggedInPage;


