import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, Route, Routes } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import AuthService from "../utils/auth";
import { Button } from "react-bootstrap";
import CreateCollection from "./CreateCollection";
import CollectionImageComponent from "../components/CollectionImageComponent";
import MyCollectionsComponent from "../components/MyCollectionsComponent";

const ProfilePage = () => {
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
        {isLoggedIn ? (
          <div className="d-flex flex-column align-items-center">
            <h3 className="mt-2"> Hello {user.username}!</h3>
            <Link to="/createCollection" className="m-3">
              <Button variant="primary">Add New Collection</Button>
            </Link>
            {user.collectionCount <= 0 ? (
              <div>No collections</div>
            ) : (
              <MyCollectionsComponent />
            )}
          </div>
        ) : (
          "Log in to see your page"
        )}
    </div>
  );
};

export default ProfilePage;
