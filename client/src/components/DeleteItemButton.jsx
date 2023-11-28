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
      <Button style={{backgroundColor: "#e7321a", borderColor: "#e7321a", transition: "background-color 0.3s"}} onClick={handleDelete}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#b62416"; // Change to the desired darker color
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#e7321a"; // Restore the original color
      }}
      >Delete Item</Button>
    </div>
  );
};

export default DeleteItemButton;