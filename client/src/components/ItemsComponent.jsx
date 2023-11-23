import React from "react";
import { useParams, Link } from "react-router-dom";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CollectionsComponent.css";
import CollectionImageComponent from "./CollectionImageComponent";

function ItemsComponent({ collections }) {
  const { collectionId } = useParams();

  const {
    loading: collectionLoading,
    error: collectionError,
    data: collectionData,
  } = useQuery(GET_SINGLE_COLLECTION, {
    variables: { collectionId },
  });

  if (collectionLoading) return <p>Loading...</p>;
  if (collectionError) return <p>Error: {collectionError.message}</p>;

  if (!collectionData || !collectionData.singleCollection) {
    return <p>No data found for collection {collectionId}</p>;
  }

  const { singleCollection } = collectionData;

  console.log(singleCollection);

  return (
    <ul>
      {singleCollection.items.map((item) => (
        <li key={item._id}>
          <h4>{item.itemName}</h4>
          <p>{item.itemDescription}</p>
          <img src={item.itemImage} alt={item.itemName} />
        </li>
      ))}
    </ul>
  );
}

export default ItemsComponent;
