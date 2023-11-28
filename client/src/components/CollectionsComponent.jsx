import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CollectionsComponent.css";
import CollectionImageComponent from "./CollectionImageComponent";

function CollectionsComponent({ collections }) {
  const { collectionId } = useParams();

  console.log(collections);

  return (
    <div className="feedContainer">
      <ul className="feedUl">
        {collections &&
          collections.map((collection) => (
            <li key={collection._id} className="feedLi">
              <Card className="feedCard" >
              <CollectionImageComponent variant="top" collection={collection}/>
                <Card.Body className="text-center">
                  <Card.Title>{collection.name}</Card.Title>
                  <Card.Text>Owner: {collection.userId.username}</Card.Text>
                  <Link to={`/mycollections/${collection._id}`}>
                    <Button style={{backgroundColor: "#35778a", borderColor: "#35778a", transition: "background-color 0.3s"}}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#0f3940"; // Change to the desired darker color
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#35778a"; // Restore the original color
                    }}>See Collection</Button>
                  </Link>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CollectionsComponent;
