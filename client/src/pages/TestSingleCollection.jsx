import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";

const TestSingleCollection = () => {
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
