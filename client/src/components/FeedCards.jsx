import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";


function FeedCards() {

  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items feed-ul">
            <CardItem
              src="https://www.moraswines.com/wp-content/uploads/2023/05/Guadalupe.jpeg"
              text="Come see my collection of rare bottles of Texas bourbon"
              label="Texas Bourbon"
              path="/collection/texasBourbon"
            />
            <CardItem
              src="https://obviousshirts.com/cdn/shop/products/autographed-baseball-card-signed-by-thomas-ian-nicholas-463981.png?v=1687616953&width=1080"
              text="Come see my collection of rare baseball cards."
              label="Baseball Cards"
              path="/collection/baseballCards"
            />
            <CardItem
              src="https://i.etsystatic.com/25352708/r/il/25032d/3631422808/il_fullxfull.3631422808_fq5q.jpg"
              text="Come see my collection of rare anime pins."
              label="Anime Pins"
              path="/collection/animePins"
            />
            <CardItem
              src="https://cdn-cahdg.nitrocdn.com/qibYFaeYzHTHZvJqjkkfoDkalZtVaNMR/assets/static/optimized/rev-322d5f6/blog/wp-content/uploads/2021/04/Speedway-vinyl.jpeg"
              text="Come see my collection of rare vinyl records."
              label="Vinyl Records"
              path="/collection/vinylRecords"
            />
            <CardItem
              src="https://www.motortrend.com/uploads/sites/11/2013/10/1966-1977-Ford-Bronco-front-right-view.jpg"
              text="Come see my collection of rare vintage cars."
              label="Vintage Cars"
              path="/collection/vintageCars"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FeedCards;
