//will need to import necessary properties
import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Row
} from 'react-bootstrap';
//potentially useState, queries, mutations?
//will need to import components to display search results
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';

//make button with capability to load some number of random collections or one random collection, similar to "i'm feelin lucky"
const Search = () => {
  //declare const queries and possible mutations

  // create state for holding returned google api data
  // const [searchedBooks, setSearchedBooks] = useState([]);
  // // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // const [saveBook] = useMutation(SAVE_BOOK);
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  // useEffect(() => {
  //   return () => saveBookIds(savedBookIds);
  // });

  //this is the handleFormSubmit from the module 21 homework, we will need to edit variables but it should be easily convertable to search for collections
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await useQuery(GET_COLLECTIONS);


      // const response = await searchGoogleBooks(searchInput);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const { items } = await response.json();

      // const bookData = items.map((book) => ({
      //   bookId: book.id,
      //   authors: book.volumeInfo.authors || ['No author to display'],
      //   title: book.volumeInfo.title,
      //   description: book.volumeInfo.description,
      //   image: book.volumeInfo.imageLinks?.thumbnail || '',
      // }));

      // setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <Container>
          <h1>Search for Collections!</h1>
          <Form 
          // onSubmit={handleFormSubmit}
          >
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

      <div>Search Results populate here, will need to use map function likely</div>
    </>
  );
};

export default Search;