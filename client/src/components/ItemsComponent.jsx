import React from "react";
import { useParams, Link } from "react-router-dom";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ItemsComponent.css";
import CollectionImageComponent from "./CollectionImageComponent";
import ImageComponent from "./ImageCompontent";
import DeleteItemButton from "./DeleteItemButton";

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
    <ul className="profileFeed">
      {singleCollection &&
        singleCollection.items.map((item) => (
          <li key={item._id} className="profileFeedItem">
            <Card>
              {/* Pass 'item' directly to 'ImageComponent' as 'imageItem' prop */}
              <ImageComponent variant="top" imageItem={item} />
              <Card.Body>
                <Card.Title>{item.itemName}</Card.Title>
                <Card.Text>{item.itemDescription}</Card.Text>
                <DeleteItemButton itemId={item._id} collectionId={collectionId} />
                {/* Edit button - link to the edit page */}
                <Link to={`/edititem/${item._id}`}>
                  <Button>Edit</Button>
                </Link>
              </Card.Body>
            </Card>
          </li>
        ))}
    </ul>
  );
}

export default ItemsComponent;

/*
<ul>
{singleCollection.items.map((item) => (
  <li key={item._id}>
    <h4>{item.itemName}</h4>
    <p>{item.itemDescription}</p>
    <img src={item.itemImage} alt={item.itemName} />
  </li>
))}
</ul>
*/
