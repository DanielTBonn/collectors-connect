import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Cards from '../components/Cards';


import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Collection = () => {
  const [userData, setUserData] = useState({});

  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  useEffect(() => {
    setUserData(me);
  }, [data]);

  return (
    <>
      <div>
        <h1 style={{marginTop: "40px"}}>Check out this awesome collection!</h1>
      </div>
      <div>
        <Cards />
      </div>
    </>
  );
};

export default Collection;