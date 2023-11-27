import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../utils/queries";
import RandomSearch from "../components/RandomSearch";
import CollectionsComponent from "../components/CollectionsComponent";

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  // useQuery hook to fetch collections
  const [searchCollection, { loading, error, data }] = useLazyQuery(GET_COLLECTIONS);

  const results = data?.collections || [];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    searchCollection({
      variables: { name: `.*${searchInput}.*` },
    });

  };

  return (
    <div className="d-flex">
      <div>
        <Container>
          <h1>Search for Collections!</h1>
          <RandomSearch />
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a collection"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <div>
        {/* Render your search results here */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {results.length > 0 && (
          <div>
            <h2>Search Results</h2>
              <div key={results._id}>
                <CollectionsComponent collections={results} />
              </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;
