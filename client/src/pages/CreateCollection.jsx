import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { uploadFile } from '../utils/uploadFile'
import { GET_ME } from '../utils/queries'
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
    console.log(e.target)
    const { name, value } = e.target;
    console.log(name, value)
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };
  

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
    };

    let key = 'users/' + user.username + '/collections/'

    useEffect(() => {
      if(file) {
        key = 'users/' + user.username + '/collections/' + collectionData.name + '/' + file.name
      }
    }, [file, collectionData])

    let params = {
        name: "new-collection",
        description: "collection description",
        image: "none",
    }
  
  

    const handleCollectionUpload = (e) => {
      e.preventDefault();
        if (!collectionData.name) {
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
                    name: collectionData.name,
                    description: collectionData.description,
                    image: key
                }
            })
            
          } catch (err) {
            console.log("There was an error")
            console.log(err)
          } finally {
            uploadFile(file, {username: user.username, collection: collectionData.name});
            setCollectionData({
              name: '',
              description: '',
            })
            setFile(null)
        
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
                <Form.Control
                  name="fileInput"
                  onChange={handleFileChange}
                  type="file"
                  size="lg"
                />
                
              </Col>
              <Col xs={12} md={4}>
                <button  size="lg" onClick={(e) => {
              
                  handleCollectionUpload(e);
              }}>
                  Upload
                </button>
              </Col>
            </Row>
          </Form>
        </Container>
              </div>
            }
          </div>
        </div>
      );
}

export default CreateCollection;

// =======
//   return (
//     <Container className="user-profile">
//       <div>{userLoading ? 'Loading User...' : `Hello ${user.username}`}</div>

//       <Form>
//         <Row>
//           <Col xs={12} md={6}>
//             <Form.Control
//               name="name"
//               value={collectionData.name}
//               onChange={handleInputChange}
//               type="text"
//               size="lg"
//               placeholder="Set a collection name"
//             />
//           </Col>
//           <Col xs={12} md={6}>

//           </Col>
//         </Row>
//         <Row>
//           <Col xs={12} md={12}>
//             <Button
//               type="button"  // Use "button" type to prevent form submission
//               variant="success"
//               size="lg"
//               onClick={handleCollectionUpload}
//             >
//               Upload
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Container>
//   );
// };

// export default CreateCollection;



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
// >>>>>>> e2cf008859afc9ddf702efc9619bf59cc20e4cee
