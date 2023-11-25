import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Col, Form, Button, Row } from "react-bootstrap";

import CollectionsComponent from "./CollectionsComponent";

import CollectionImageComponent from "./CollectionImageComponent";

import { useLazyQuery } from "@apollo/client";
import { GET_RANDOM_COLLECTION } from "../utils/queries";

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
        <Container>
          <Form>
            <Button onClick={handleRandomSubmit} variant="success" size="lg">
              Random
            </Button>
          </Form>
        </Container>

        {loading ? 
        (<p>Loading...</p>)
        : showRandomCollection && randomCollection && (
          <div>
            <h2>Random Collection</h2>
            <Card className="feedCard">
              <CollectionImageComponent variant="top" collection={randomCollection} />
                <Card.Body>
                  <Card.Title>{randomCollection.name}</Card.Title>
                  <Card.Text>{randomCollection.description}</Card.Text>
                  <Link to={`/mycollections/${randomCollection._id}`}>
                    <Button variant="primary">See Collection</Button>
                  </Link>
                </Card.Body>
              </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default RandomSearch;
