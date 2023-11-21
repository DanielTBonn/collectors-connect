import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
//will need to import components to display search results, cards?

import { useQuery } from "@apollo/client";
import { GET_RANDOM_COLLECTION } from "../utils/queries";

const RandomSearch = () => {
  // Code for random search
  const [randomCollection, setRandomCollection] = useState(null);
  const [showRandomCollection, setShowRandomCollection] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_RANDOM_COLLECTION);

  console.log(randomCollection);

  useEffect(() => {
    // Check if there is data and if the data has a random collection
    if (data && data.randomCollection) {
      // Set the random collection to the state
      setRandomCollection(data.randomCollection);
    }
  }, [data]);

  const handleRandomSubmit = async () => {
    // Refetch the query to get a new random collection
    await refetch();
    // Set showRandomCollection to true to display the random collection
    setShowRandomCollection(true);
  };

  // Check if the query is loading or if there's an error
  if (loading) {
    return <p>Loading...</p>;
  }
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

        {showRandomCollection && randomCollection && (
          <div>
            <h2>Random Collection</h2>
            <h3>{randomCollection.name}</h3>
            <p>{randomCollection.description}</p>
            <p>{randomCollection.tag}</p>
            <p>{randomCollection?.username}</p>
            {/* Display other collection details... */}
          </div>
        )}
      </div>
    </>
  );
};

export default RandomSearch;
