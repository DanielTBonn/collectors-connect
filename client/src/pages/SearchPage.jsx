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

    setSearchInput('');
  };

  return (
    <div className="d-flex justify-content-center flex-column">
      <div>
        <Container className="d-flex flex-column align-items-center">
          <h1 style={{marginTop: "8px"}}>Search for Collections!</h1>
          <RandomSearch />
          <div style={{maxWidth: "100%", display: "flex"}}>
          <Form onSubmit={handleFormSubmit} style={{maxWidth: "100%"}}>
            <Row className="flex-wrap">
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
                <Button type="submit" size="lg" style={{backgroundColor: "#8a4f1c", borderColor: "#8a4f1c", transition: "background-color 0.3s"}}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#62370f"; // Change to the desired darker color
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#8a4f1c"; // Restore the original color
                }}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          </div>
        </Container>
      </div>

      <div>
        {/* Render your search results here */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {results.length > 0 && (
          <div className="d-flex flex-column align-items-center">
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
