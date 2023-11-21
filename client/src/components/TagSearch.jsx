import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
//will need to import components to display search results
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../utils/queries";

const TagSearch = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { loading, error, data } = useQuery(GET_COLLECTIONS, {
    variables: { tag: selectedTags },
  });
  const collections = data?.collections || [];

  const handleTagChange = (tag) => {
    // Update the selected tags array based on user selections
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Fetch collections with selected tags
    // You can perform additional logic here if needed
    // The results will be available in the 'collections' variable
  };

  return (
    <>
      <div>
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <p>Search these tags!</p>
            <Row>
              <Col>
                {collections.map((collection) => (
                  <Form.Check
                    inline
                    label={collection.tag}
                    type="checkbox"
                    id={`${collection.tag}`}
                    key={collection.tag}
                    checked={selectedTags.includes(collection.tag)}
                    onChange={() => handleTagChange(collection.tag)}
                  />
                ))}
              </Col>
              <Col>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default TagSearch;
