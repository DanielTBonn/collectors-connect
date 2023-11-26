import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_COLLECTION, GET_ME } from "../utils/queries";
import ItemsComponent from "../components/ItemsComponent";
import CollectionImageComponent from "../components/CollectionImageComponent";

const SingleCollectionById = () => {
  const { collectionId } = useParams();
  const {
    loading: collectionLoading,
    error: collectionError,
    data: collectionData,
  } = useQuery(GET_SINGLE_COLLECTION, {
    variables: { collectionId },
  });

  const { loading: userLoading, data: userData } = useQuery(GET_ME);

  if (collectionLoading || userLoading) return <p>Loading...</p>;
  if (collectionError) return <p>Error: {collectionError.message}</p>;

  const { singleCollection } = collectionData;

  const inlineStyles = {
    margin: "10px",
    padding: "15px",
    fontSize: "16px",
    
  };

  return (
    <div style={inlineStyles}>
      <h2>{singleCollection.name}</h2>
      <CollectionImageComponent collection={singleCollection} />
      <p>{singleCollection.description}</p>
      <h3>Items:</h3>
        {collectionLoading ? (
          <p>Loading Collection...</p>
        ):
        singleCollection.items.map((imageItem) => {
            return (
            <div>
            <h2>{imageItem.imageName}</h2>
            <p>{imageItem.imageDescription}</p>
              <AddItemButton collectionId={collectionId}/>
              <div>
                <ImageComponent imageItem={imageItem} />
                <DeleteItemButton itemId={imageItem._id} />
              </div>
            </div>)
        })
        }
    </div>
  );
}

export default SingleCollectionById;

