import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { uploadFile } from '../utils/uploadFile'
import { GET_ME } from "../utils/queries";
import { ADD_COLLECTION, ADD_ITEM } from "../utils/mutations";



const EditCollectionButton = ({ collectionId }) => {
    console.log(collectionId)

  const { loading: userLoading, data: userData } = useQuery(GET_ME);
  console.log(userData)
  const user = userData?.me || {};
  console.log(user)
  // const userInfo = {
  //   username: user.username,
  //   collection: user.collections[0].name,
  //   collection: null
  // }

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const [addItem, { error }] = useMutation(ADD_ITEM)

  let key = 'users/' + user.username + '/collections/'
  
  useEffect(() => {
    if(user.collections) {
      key = 'users/' + user.username + '/collections/' + user.collections[collectionId].name + '/' + file.name
    }

  }, [file])

  
  const handleFileUpload = () => {
    try {
      console.log("hi")
      console.log(user.collections[collectionId]._id)
      console.log(user.collections[collectionId].name)

      const { data } = addItem({
        variables: {
            itemName: 'item name',
            itemDescription: 'item description',
            itemImage: key,
            itemTag: 'item tag',
            collectionId: user.collections[collectionId]._id
        }
      })
      console.log("Success!")
      console.log("data", data)
      
    } catch (err) {
      console.log("There was an error")
      console.log(err)
    }
  }
    
  return (
    <div className="TestPage">
      <div>
        { userLoading ? (
          <p>Loading User...</p>
          ):
          <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={() => {

                uploadFile(file, {username: user.username, collection: user.collections[collectionId].name});
                handleFileUpload();
              }
                }>Upload</button>
          </div>
        }
      </div>
    </div>
  );
}

export default EditCollectionButton;