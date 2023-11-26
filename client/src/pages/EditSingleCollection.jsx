import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import { EDIT_COLLECTION } from "../utils/mutations";
import { Container, Col, Form, Button, Row } from 'react-bootstrap';


const EditSingleCollection = () => {
    const { collectionId } = useParams();
    const [editCollection, { error }] = useMutation(EDIT_COLLECTION);
    const { loading: userLoading, data} = useQuery(GET_SINGLE_COLLECTION, {
        variables: {
            collectionId
        }
    });
    const collection = data?.singleCollection || {}

    const [collectionData, setCollectionData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {

        setCollectionData({
            name: collection.name,
            description: collection.description
        })
    }, [collection])

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
            alert('Collection needs a name!')
            return;
        }

        if (!collectionData.description) {
            alert('Collection needs a description!')
            return;
        }

        try {
            const { data } = editCollection({
                variables: {
                    ...collection,
                    collectionId: collection._id,
                    ...collectionData
                }
            })
        } catch (err) {
            console.log("There was an error.")
            console.log(err)
        }
      }

      return ( 
        <div className="TestPage">
          <div>
            { userLoading ? (
              <p>Loading User...</p>
              ):
              <div>
                        <Container>
          <h1>Add a Collection!</h1>
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