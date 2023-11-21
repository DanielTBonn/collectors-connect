import { useQuery } from "@apollo/client";

import TestCards from "../components/TestCards.jsx";

import { GET_COLLECTIONS } from "../utils/queries.js";

const IndexPage = () => {
  const { loading, data, error } = useQuery(GET_COLLECTIONS);

  if (error) {
    console.error("GraphQL Error:", error);
  }

  const collections = data?.collections || [];

  console.log(collections);

  return (
    <>
      <div>
        <h1 style={{textAlign: "center"}}>Collections Feed</h1>
      </div>
      <div>
        {loading ? <div>Loading...</div> : <TestCards collections={collections} />}
      </div>
    </>
  );
};

export default IndexPage;
