import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { uploadFile } from '../utils/uploadFile';
import { GET_ME } from "../utils/queries";
import { ADD_ITEM } from "../utils/mutations";
import ImageComponent from "../components/ImageCompontent";

const AddItemButton = ({ collectionId }) => {
  const { loading: userLoading, data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};

  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const [addItem, { error }] = useMutation(ADD_ITEM);

  const handleUpload = async () => {
    if (file !== null && collectionId !== null) {
      if (Array.isArray(user.collections) && user.collections.length > 0) {
        const collection = user.collections.find(collection => collection._id === collectionId);

        if (collection) {
          const key = `users/${user.username}/collections/${collection.name}/${file.name}`;

          try {
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

            // Set the upload status to true
            setIsFileUploaded(true);
          } catch (err) {
            console.log("Error uploading file or adding item:", err);
          }
        } else {
          console.log("Collection not found");
        }
      } else {
        console.log("Invalid user collections");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Render the ImageComponent only if the file has been uploaded and item added to the database 
      i dont believe this part of the code is necessary? */}
      {isFileUploaded && file && (
        <ImageComponent imageItem={{ itemImage: file.name }} />
      )}
    </div>
  );
};

export default AddItemButton;