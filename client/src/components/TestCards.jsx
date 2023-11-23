import React from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TestCards.css";

function TestCard({ collections }) {
    const { collectionId } = useParams();

  return (
    <div className="feedContainer">
      <ul className="feedUl">
        {collections &&
          collections.map((collection) => (
            <li key={collection._id} className="feedLi">
              <Card className="feedCard">
                <Card.Img
                  variant="top"
                  src="../../assets/jakob-owens-ZBadHaTUkP0-unsplash.jpg"
                />
                <Card.Body>
                  <Card.Title>{collection.name}</Card.Title>
                  <Card.Text>{collection.description}</Card.Text>
                  <Link to={`/mycollections/${collection._id}`}>
                    <Button variant="primary">See Collection</Button>
                  </Link>
                </Card.Body>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TestCard;
