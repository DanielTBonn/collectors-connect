import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";

import ImageComponent from "../components/ImageCompontent";
import EditCollectionButton from "../components/EditCollectionButton";

const TestSingleCollection = () => {
  const { collectionId } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_COLLECTION, {
    variables: { collectionId },
  });
  const { singleCollection } = data;
  console.log(singleCollection);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{singleCollection.name}</h2>
      <p>{singleCollection.description}</p>

      {/* Display the items for the collection */}
      <h3>Items:</h3>
      <ul>
        {singleCollection.items.map((item) => (
          <li key={item._id}>
            <h4>{item.itemName}</h4>
            <p>{item.itemDescription}</p>
            <img src={item.itemImage} alt={item.itemName} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestSingleCollection;
