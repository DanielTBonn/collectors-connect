import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CollectionsComponent.css";
import CollectionImageComponent from "./CollectionImageComponent";
import { GET_ME } from "../utils/queries";
import DeleteCollectionButton from "./DeleteCollectionButton";
// import AddItemButton from "./AddItemButton";

function MyCollectionsComponent({ collections }) {
  const { loading, data, error } = useQuery(GET_ME);

  const myCollections = data?.me.collections || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  console.log(myCollections);

  return (
    <div className="feedContainer">
      <ul className="feedUl">
        {myCollections &&
          myCollections.map((collection) => (
            <li key={collection._id}>
              <Card className="feedCard">
                <div style={
                  {
                    width: "100%", 
                    height: "auto", 
                    display: "block", 
                    margin: "0 auto"
                  }
                  }>
                <CollectionImageComponent variant="top" collection={collection} />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>{collection.name}</Card.Title>
                  <Card.Text>{collection.description}</Card.Text>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                  <Link to={`/mycollections/${collection._id}`}>
                    <Button style={{backgroundColor: "#35778a", borderColor: "#35778a"}}>See Collection</Button>
                  </Link>
                  <DeleteCollectionButton collectionId={collection._id} />
                  </div>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyCollectionsComponent;
