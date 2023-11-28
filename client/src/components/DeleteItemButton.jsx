import React from "react";
import { useMutation } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import { DELETE_ITEM } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteItemButton = ({ itemId, collectionId }) => {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM, {
    refetchQueries: [{ query: GET_SINGLE_COLLECTION, variables: { collectionId } }],
  });

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete item with ID:', itemId);
      const { data } = await deleteItem({
        variables: {
          itemId,
        },
      });

      console.log('Deleted Item:', data);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleDelete}>Delete Item</Button>
    </div>
  );
};

export default DeleteItemButton;