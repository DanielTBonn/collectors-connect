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
      <ItemsComponent />
    </div>
  );
};

export default SingleCollectionById;

