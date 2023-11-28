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
            <li key={collection._id} className="feedLi">
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
                  <Card.Title style={{marginBottom: "16px"}}>{collection.name}</Card.Title>
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                  <Link to={`/mycollections/${collection._id}`}>
                    <Button style={{backgroundColor: "#35778a", borderColor: "#35778a", transition: "background-color 0.3s", margin: "10px"}} 
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#0f3940"; // Change to the desired darker color
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#35778a"; // Restore the original color
                    }}>See Collection</Button>
                  </Link>
                  <Link to={`/editcollection/${collection._id}`}>
                    <Button style={{backgroundColor: "#80669d", borderColor: "#80669d", transition: "background-color 0.3s", margin: "10px"}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#5b4a72"; // Change to the desired darker color
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#80669d"; // Restore the original color
                    }}
                    >Edit Collection</Button>
                  </Link>
                  <div style={{margin: "10px"}}>
                  <DeleteCollectionButton collectionId={collection._id} />
                  </div>
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
