import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { uploadFile } from '../utils/uploadFile';
import { GET_ME } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";
import { Container, Col, Form, Button, Row } from 'react-bootstrap';


const AddItemButton = ({collectionId}) => {
  const { loading: userLoading, data: userData, refetch } = useQuery(GET_ME);
  const user = userData?.me || {};

  console.log("COLLECTIONID", collectionId)

  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const [addItem, { error }] = useMutation(ADD_ITEM, {
    onCompleted: () => {
  

      // Refetch the data
      refetch();
    },
  });

  let params = {
    itemName: 'item name',
    itemDescription: 'item description',
    itemImage: "none",
  };

  const resetData = async () => {
      // Reset form data and file state
    setItemData({
    name: '',
    description: '',
    image: '',
    });
    setFile(null);
  }


  const handleUpload = async (e) => {
    e.preventDefault();

    if (file !== null && collectionId !== null) {
      try {
        const collection = user.collections.find(collection => collection._id === collectionId);

        if (!collection) {
          console.log("Collection not found");
          return;
        }

        if (!itemData.name) {
          alert('Item needs a name!');
          return;
        }
       
        if (!itemData.description) {
          alert('Item needs a description!');
          return;
        }

        const key = `users/${user.username}/collections/${collection.name}/${file.name}`;
        setItemData({
          ...itemData,
          image: key
        })

        // if (!itemData.image) {
        //   alert('Item needs an image!');
        //   return;
        // }

        // Upload the file to S3
        await uploadFile(file, { username: user.username, collection: collection.name });

        // Add item to the collection in the database
        await addItem({
          variables: {
            ...params,
            itemName: itemData.name,
            itemDescription: itemData.description,
            itemImage: key,
            collectionId: collection._id
          }

        });
        
        await resetData();

      } catch (err) {
        console.log("Error uploading file or adding item:", err);
      } 
    }
  };

  return (
    <div>              
    <Form className="align-items-center">
    <Row>
      <Col xs={12} md={8}>
        <Form.Control
          name="name"
          value={itemData.name}
          onChange={(e) => handleInputChange(e)}
          type="text"
          size="lg"
          placeholder="Set an item name"
        />
        <Form.Control
          name="description"
          value={itemData.description}
          onChange={(e) => handleInputChange(e)}
          type="text"
          size="lg"
          placeholder="Set an item description"
        />
        <Form.Control
          name="fileInput"
          onChange={handleFileChange}
          type="file"
          size="lg"
        />
      </Col>
      <Col xs={12} md={4}>
      <Button style={{backgroundColor: "#029455", borderColor: "#029455", transition: "background-color 0.3s"}} 
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#01733e"; // Change to the desired darker color
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#029455"; // Restore the original color
      }}
      onClick={handleUpload}>Upload</Button>
      </Col>
    </Row>
  </Form>

    </div>
  );
};

export default AddItemButton;