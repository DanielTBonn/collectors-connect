import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { uploadFile } from '../utils/uploadFile';
import { GET_ME } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";

const AddItemButton = ({ collectionId }) => {
  const { loading: userLoading, data: userData, refetch } = useQuery(GET_ME);
  const user = userData?.me || {};

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

  const handleUpload = async (e) => {
    e.preventDefault();

    if (file !== null && collectionId !== null) {
      try {
        const collection = user.collections.find(collection => collection._id === collectionId);

        if (!collection) {
          console.log("Collection not found");
          return;
        }

        const key = `users/${user.username}/collections/${collection.name}/${file.name}`;

        // Upload the file to S3
        await uploadFile(file, { username: user.username, collection: collection.name });

        // Add item to the collection in the database
        await addItem({
          variables: {
            itemName: 'item name',
            itemDescription: 'item description',
            itemImage: key,
            collectionId: collection._id
          }
        });
      } catch (err) {
        console.log("Error uploading file or adding item:", err);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AddItemButton;