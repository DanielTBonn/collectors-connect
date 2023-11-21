import { useQuery } from "@apollo/client";

import Cards from "../components/Cards.jsx";

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
      <div>Hello World!</div>
      <div>
        {loading ? <div>Loading...</div> : <Cards collections={collections} />}
      </div>
    </>
  );
};

export default IndexPage;
