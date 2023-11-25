import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_COLLECTION } from "../utils/queries";
import ItemsComponent from "../components/ItemsComponent";

const SingleCollectionById = () => {
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
    <div>
      <h2>{singleCollection.name}</h2>
      <p>{singleCollection.description}</p>

      {/* Display the items for the collection */}
      <h3>Items:</h3>
      <ItemsComponent />
    </div>
  );
};

export default SingleCollectionById;
