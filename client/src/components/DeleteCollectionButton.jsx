import React from "react";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_COLLECTION } from "../utils/mutations";
import { Button } from "react-bootstrap";

const DeleteCollectionButton = ({ collectionId }) => {
  const [deleteCollection, { error }] = useMutation(DELETE_COLLECTION, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleDelete = async () => {
    try {
      const { data } = await deleteCollection({
        variables: {
          collectionId,
        },
      });
  
      console.log(data);
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };
  

  return (
    <div>
      <Button onClick={() => handleDelete()}>Delete Collection</Button>
    </div>
  );
};

export default DeleteCollectionButton;