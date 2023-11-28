import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Col, Form, Button, Row } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_RANDOM_COLLECTION } from "../utils/queries";

import CollectionImageComponent from "./CollectionImageComponent";

const styles = {
  container: {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100vw",
  },
}



const RandomSearch = () => {
  // Code for random search
  const [randomCollection, setRandomCollection] = useState(null);
  const [showRandomCollection, setShowRandomCollection] = useState(false);

  const [getRandomCollection, { loading, error, data, refetch }] = useLazyQuery(GET_RANDOM_COLLECTION);

  useEffect(() => {
    // Check if there is data and if the data has a random collection
    if (data && data.randomCollection) {
      // Set the random collection to the state
      setRandomCollection(data.randomCollection);
      console.log(randomCollection, "randomCollection");
    }
  }, [data, randomCollection]);

  const handleRandomSubmit = async () => {
    // Use the refetch function to manually trigger a re-fetch
    await refetch();
    // Set showRandomCollection to true to display the random collection
    setShowRandomCollection(true);
  };

  // Check if the query is loading or if there's an error
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div>
        <Container className="d-flex justify-content-center">
          <Form>
            <Button onClick={handleRandomSubmit} size="lg" style={{backgroundColor: "#8a4f1c", borderColor: "#8a4f1c", transition: "background-color 0.3s", marginBottom: "0.7rem"}}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#62370f"; // Change to the desired darker color
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#8a4f1c"; // Restore the original color
            }}>
              Random
            </Button>
          </Form>
        </Container>

        {loading ? 
        (<p>Loading...</p>)
        : showRandomCollection && randomCollection && (
          <div className="container">
            <h2 className="text-center">Random Collection</h2>
            <div className="feedLi">
            <Card className="feedCard">
              <CollectionImageComponent variant="top" collection={randomCollection} />
                <Card.Body>
                  <Card.Title>{randomCollection.name}</Card.Title>
                  <Card.Text>Owner: {randomCollection.userId.username}</Card.Text>
                  <Link to={`/mycollections/${randomCollection._id}`}>
                    <Button style={{backgroundColor: "#35778a", borderColor: "#35778a", transition: "background-color 0.3s"}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#0f3940"; // Change to the desired darker color
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#35778a"; // Restore the original color
                    }}>See Collection</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RandomSearch;
