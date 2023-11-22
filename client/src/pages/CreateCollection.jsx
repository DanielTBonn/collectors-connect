import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_COLLECTION } from '../utils/mutations';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';

const CreateCollection = () => {
  const { loading: userLoading, data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};

  const [addCollection, { error }] = useMutation(ADD_COLLECTION);

  const [collectionData, setCollectionData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };

  const handleCollectionUpload = async () => {
    const name = collectionData.name;
    const description = collectionData.description;
  
    if (!name) {
      alert('Collection needs a name!');
      return;
    }
  
    try {
      const result = await addCollection({
        variables: {
          name,
          description,
          image: 'http://placekitten.com/200/300',
          items: [],
        },
        refetchQueries: [{ query: GET_ME }],
      });
  
      const { data, errors } = result;
  
      console.log("Mutation response:", data);
  
      if (data && data.addCollection) {
        console.log("Collection added:", data.addCollection);
      } else {
        console.log("Collection not added. Check for errors in the response:", errors);
      }
    } catch (err) {
      console.log("Error adding collection:", err.message);
    }
  };
  
  

  return (
    <Container className="user-profile">
      <div>{userLoading ? 'Loading User...' : `Hello ${user.username}`}</div>

      <Form>
        <Row>
          <Col xs={12} md={6}>
            <Form.Control
              name="name"
              value={collectionData.name}
              onChange={handleInputChange}
              type="text"
              size="lg"
              placeholder="Set a collection name"
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Control
              name="description"
              value={collectionData.description}
              onChange={handleInputChange}
              type="text"
              size="lg"
              placeholder="Set a collection description"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Button
              type="button"  // Use "button" type to prevent form submission
              variant="success"
              size="lg"
              onClick={handleCollectionUpload}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateCollection;



// import { useState, useEffect } from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_ME } from '../utils/queries'
// import { ADD_COLLECTION } from '../utils/mutations';
// import {
//     Container,
//     Col,
//     Form,
//     Button,
//     Row
//   } from 'react-bootstrap';

// const CreateCollection = () => {

//     const { loading: userLoading, data: userData } = useQuery(GET_ME);
//     console.log(userData)
//     const user = userData?.me || {};
//     console.log(user)

//     const [addCollection, {error}] = useMutation(ADD_COLLECTION)

//     const [collectionName, setCollectionName] = useState('');

//     let params = {
//         name: "new-collection",
//         description: "collection description",
//         image: "none",
//         tag: "none"
//     }

//     const handleInputChange = (e) => {
//         const { value } = e.target;
//         console.log(value)
//         setCollectionName(value)
//     }

//     const handleCollectionUpload = () => {
//         if (!collectionName) {
//             alert('Collection needs a name!')
//             return;
//         }

//         try {
//             const { data } = addCollection({
//                 variables: {
//                     ...params,
//                     name: collectionName
//                 }
//             })
            
//             console.log("trying to work!")
            
//         } catch (err) {
//             console.log("There was an error")
//             console.log(err)
//         }
        
//     }



//     return (
//         <div className="TestPage">
//           <div>
//             { userLoading ? (
//               <p>Loading User...</p>
//               ):
//               <div>
//                         <Container>
//           <h1>Search for Collections!</h1>
//           <Form 
//           // onSubmit={handleFormSubmit}
//           >
//             <Row>
//               <Col xs={12} md={8}>
//                 <Form.Control
//                   name="searchInput"
//                   value={collectionName}
//                   onChange={(e) => setCollectionName(e.target.value)}
//                   type="text"
//                   size="lg"
//                   placeholder="Set a collection name"
//                 />
//               </Col>
//               <Col xs={12} md={4}>
//                 <Button type="submit" variant="success" size="lg" onClick={() => {
    
//     handleCollectionUpload();
//   }}>
//                   Upload
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//                   {/* <input type="file" onChange={handleFileChange} /> */}
//                   {/* <input className="collections"> </input>
//                   <button >Upload</button> */}
//               </div>
//             }
//           </div>
//         </div>
//       );
// }

// export default CreateCollection;