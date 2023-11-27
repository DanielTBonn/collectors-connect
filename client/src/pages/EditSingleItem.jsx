import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, GET_SINGLE_ITEM } from '../utils/queries';
import { EDIT_ITEM } from '../utils/mutations';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';

const EditSingleItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { loading: userLoading, data } = useQuery(GET_SINGLE_ITEM, {
    variables: {
      itemId,
    },
    fetchPolicy: 'cache-and-network',
  });
  
  const [editItem, { error }] = useMutation(EDIT_ITEM, {
    onCompleted: async (data) => {
    
      const editedItem = data?.editItem?.items;
  
      // Log the mutation result
      console.log('Mutation Result:', data);
  
      if (editedItem && editedItem.collectionId) {
        console.log('Before navigate');
  
        // Log the structure of editedItem
        console.log('editedItem:', editedItem);
  
        // Log the equality check result
        console.log('Equality Check:', item.collectionId === editedItem.collectionId);
  
        try {
          await navigate(`/myCollections/${editedItem.collectionId}`);
          console.log('After navigate');
        } catch (error) {
          console.error('Navigation error:', error);
        }
      } else {
        console.log('CollectionId is undefined in the edited item.');
      }
    },
  });  

  const item = data?.singleItem || {};
  console.log(item);

  const [itemData, setItemData] = useState({
    itemName: item.itemName || '',
    itemDescription: item.itemDescription || '',
    collectionId: item.collectionId || null
  });

  console.log('item.collectionId:', item.collectionId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleItemEdit = async (e) => {
    e.preventDefault();

    if (!itemData.itemName) {
      alert('Item needs a name!');
      return;
    }

    if (!itemData.itemDescription) {
      alert('Item needs a description!');
      return;
    }

    try {
      const variables = {
        itemId: item._id,
        itemName: itemData.itemName,
        itemDescription: itemData.itemDescription,
        collectionId: itemData.collectionId ? itemData.collectionId : null,
      };

      await editItem({ variables });
    } catch (err) {
      console.error('There was an error:', err);
      console.log('GraphQL Error Details:', err.graphQLErrors, err.networkError);
    }
  };

  return (
    <div className="TestPage">
      <div>
        {userLoading ? (
          <p>Loading User...</p>
        ) : (
          <div>
            <Container>
              <h1>Edit Item</h1>
              <Form>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Control
                      name="itemName"
                      value={itemData.itemName}
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      size="lg"
                      placeholder="Edit item name"
                    />
                    <Form.Control
                      name="itemDescription"
                      value={itemData.itemDescription}
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      size="lg"
                      placeholder="Edit item description"
                    />
                  </Col>
                  <Col xs={12} md={4}>
                    <Button size="lg" onClick={(e) => handleItemEdit(e)}>
                      Save Changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditSingleItem;