import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { uploadFile } from '../utils/uploadFile'
import { GET_ME } from '../utils/queries'
import { ADD_COLLECTION } from '../utils/mutations';
import {
    Container,
    Col,
    Form,
    Button,
    Row
  } from 'react-bootstrap';

const CreateCollection = () => {

    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    console.log(userData)
    const user = userData?.me || {};
    console.log(user)

    const [addCollection, {error}] = useMutation(ADD_COLLECTION)

    const [collectionName, setCollectionName] = useState('');


    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
    };

    let key = 'users/' + user.username + '/collections/'

    useEffect(() => {
      if(file) {
        key = 'users/' + user.username + '/collections/' + collectionName + '/' + file.name
      }
  
    }, [file, collectionName])

    let params = {
        name: "new-collection",
        description: "collection description",
        image: "none",
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setCollectionName(value)
    }

    const handleCollectionUpload = (e) => {
      e.preventDefault();
        if (!collectionName) {
            alert('Collection needs a name!')
            return;
        }
        console.log("is it working?")

        if (!file) {
          alert('Must Add a file!')
          return;
        }

        try {
            const { data } =  addCollection({
                variables: {
                    ...params,
                    name: collectionName,
                    image: key
                }
            })
            
          } catch (err) {
            console.log("There was an error")
            console.log(err)
          } finally {
            uploadFile(file, {username: user.username, collection: collectionName});
            setCollectionName('')
            setFile(null)
            window.location.reload;

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
                  name="collectionInput"
                  value={collectionName}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  size="lg"
                  placeholder="Set a collection name"
                />
                <Form.Control
                  name="fileInput"
                  onChange={handleFileChange}
                  type="file"
                  size="lg"
                />
                
              </Col>
              <Col xs={12} md={4}>
                <button  size="lg" onClick={(e) => {
                  // console.log(file)
                  handleCollectionUpload(e);
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
      );
}

export default CreateCollection;