import { useQuery } from "@apollo/client";

import { useState, useEffect } from "react";

import AuthService from "../utils/auth";

import CollectionsComponent from "../components/CollectionsComponent.jsx";

import { GET_COLLECTIONS, GET_ME } from "../utils/queries.js";

const IndexPage = () => {
  const { loading, data, error } = useQuery(GET_COLLECTIONS);

  if (error) {
    console.error("GraphQL Error:", error);
  }

  const collections = data?.collections || [];

  console.log(collections);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading: userLoading, data: userData } = useQuery(GET_ME);

  useEffect(() => {
    // Check if the user is logged in using the AuthService
    const userIsLoggedIn = AuthService.loggedIn();

    // Update the state accordingly
    setIsLoggedIn(userIsLoggedIn);
  }, [userData]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginTop: "8px"}}>Collections Feed</h1>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : isLoggedIn ? (
          <CollectionsComponent collections={collections} />
        ) : (
          <div className="text-center">
            "Please log in to view collections."
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;
