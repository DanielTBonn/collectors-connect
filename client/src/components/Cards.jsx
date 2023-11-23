import React from "react";
import { Link } from "react-router-dom";
import CardItem from "./CardItem";
import "./Cards.css";

function Cards({ collections }) {
  return (
    <div className="cards">
      <h1>Check out this awesome collection!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {collections &&
              collections.map((collection) => (
                <li key={collection._id} className="cards__item">
                  <Link className="cards__item__link" to={"/search"}>
                    <figure
                      className="cards__item__pic-wrap"
                      data-category={collection.name}
                    >
                      <img
                        src={collection.src}
                        alt="Collection Item"
                        className="cards__item__img"
                      />
                    </figure>

                    <div className="cards__item__info">
                      <h5 className="cards__item__text">
                        {collection.description}
                      </h5>
                    </div>
                  </Link>
                </li>
              ))}
            {/*
            <CardItem
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZco2UP2tN7AsXk8Sw0M2UJghoANUr-KxjrQ&usqp=CAU"
              text="This is the description of collection item 1."
              label="Collection Item 1"
              path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZco2UP2tN7AsXk8Sw0M2UJghoANUr-KxjrQ&usqp=CAU"
            />
            <CardItem
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43LtEz3Gq-dgGhhCXw_OMvYWvCK-WK72RSQ&usqp=CAU"
              text="This is the description of collection item 2."
              label="Collection Item 2"
              path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43LtEz3Gq-dgGhhCXw_OMvYWvCK-WK72RSQ&usqp=CAU"
            />
            <CardItem
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbmKRb7IS3Py4OpA7q33jM2AQJBFvvCGHPQg&usqp=CAU"
              text="This is the description of collection item 3."
              label="Collection Item 3"
              path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbmKRb7IS3Py4OpA7q33jM2AQJBFvvCGHPQg&usqp=CAU"
            />
            */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
