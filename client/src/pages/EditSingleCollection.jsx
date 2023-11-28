import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import { EDIT_COLLECTION } from "../utils/mutations";
import { Container, Col, Form, Button, Row } from 'react-bootstrap';

const EditSingleCollection = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate(); 
  
  const [editCollection, { error }] = useMutation(EDIT_COLLECTION, {
    onCompleted: () => {
      refetch();
      navigate('/me');
    },
  });

  const { loading: userLoading, data, refetch } = useQuery(GET_SINGLE_COLLECTION, {
    variables: {
      collectionId
    }
  });
    const collection = data?.singleCollection || {};

  const initialCollectionData = {
    name: collection.name || '',
    description: collection.description || '',
  };

  const [collectionData, setCollectionData] = useState(initialCollectionData);

  useEffect(() => {
    setCollectionData((prevData) => {
      const updatedData = {
        name: collection.name || '',
        description: collection.description || '',
      };
  
      // Only update if there is a change
      if (
        updatedData.name !== prevData.name ||
        updatedData.description !== prevData.description
      ) {
        return updatedData;
      }
  
      // No change, return the previous data
      return prevData;
    });
  }, [collection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };

  const handleCollectionEdit = (e) => {
    e.preventDefault();

    if (!collectionData.name) {
            alert('Collection needs a name!');
      return;
    }

    if (!collectionData.description) {
            alert('Collection needs a description!');
      return;
    }

    try {
      const { data } = editCollection({
        variables: {
          ...collection,
          collectionId: collection._id,
          ...collectionData
        }
      });
    } catch (err) {
            console.log('There was an error.');
            console.log(err);
    }
  };

      return ( 
        <div className="TestPage">
          <div>
            { userLoading ? (
              <p>Loading User...</p>
              ):
              <div>
                        <Container>
          <h1>Edit Collection!</h1>
          <Form 
          // onSubmit={handleFormSubmit}
          >
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="name"
                  value={collectionData.name}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  size="lg"
                  placeholder="Set a collection name"
                />
                <Form.Control
                  name="description"
                  value={collectionData.description}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  size="lg"
                  placeholder="Set a collection description"
                />
                {/* <Form.Control
                  name="fileInput"
                  onChange={handleFileChange}
                  type="file"
                  size="lg"
                /> */}
                
              </Col>
              <Col xs={12} md={4}>
                <button  size="lg" onClick={(e) => {
                  // console.log(file)
                  handleCollectionEdit(e);
              }}>
                  Upload
                </button>
              </Col>
            </Row>
          </Form>
        </Container>
                  {/* <input type="file" onChange={handleFileChange} /> */}
                  {/* <input className="collections"> </input>
                  <button >Upload</button> */}
              </div>
            }
          </div>
        </div>
      )
}

export default EditSingleCollection;