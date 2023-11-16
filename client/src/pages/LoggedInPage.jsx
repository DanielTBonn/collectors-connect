import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";


import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const LoggedInPage = () => {
  const [userData, setUserData] = useState({});

  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  useEffect(() => {
    setUserData(me);
  }, [data]);

  return (
    <>
      <div>
        Hello {userData.username}
      </div>
    </>
  );
};

export default LoggedInPage;
