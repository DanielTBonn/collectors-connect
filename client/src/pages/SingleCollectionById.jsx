import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_COLLECTION, GET_ME } from "../utils/queries";
import ItemsComponent from "../components/ItemsComponent";
import CollectionImageComponent from "../components/CollectionImageComponent";
import AddItemButton from "../components/AddItemButton";
import "./SingleCollectionById.css";

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
  const currentUser = userData?.me;

  const inlineStyles = {
    margin: "10px",
    padding: "15px",
    fontSize: "16px",
  };

  console.log("collectionData:", collectionData);
  console.log("userData:", userData);
  console.log("singleCollection:", singleCollection);

  return (
    <div style={inlineStyles}>
      <div className="collection-div">
        <div className="collection-image">
          <CollectionImageComponent collection={singleCollection} />
        </div>
        <div style={{margin: "10px 10px 25px 10px"}}>
          <h2 className="text-center">{singleCollection.name}</h2>
          <p className="text-center">{singleCollection.description}</p>
        </div>
      </div>
      {currentUser && currentUser._id === singleCollection.userId._id && (
        <AddItemButton collectionId={collectionId} />
      )}
      <h2>Items:</h2>
      {collectionLoading ? (
        <p>Loading Collection...</p>
      ) : (
        <>
          {/* <AddItemButton collectionId={collectionId} /> */}
          <ItemsComponent collections={singleCollection.items} />
        </>
      )}
    </div>
  );
};

export default SingleCollectionById;
