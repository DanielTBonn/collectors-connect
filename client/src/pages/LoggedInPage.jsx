import { useQuery } from "@apollo/client";
import { GET_ME, GET_USER_COLLECTIONS } from "../utils/queries";
import UserProfile from "../components/UserProfile";
import Cards from "../components/Cards";

const LoggedInPage = () => {
  const { loading: userLoading, data: userData } = useQuery(GET_ME);
  const { loading: collectionsLoading, data: collectionsData } = useQuery(GET_USER_COLLECTIONS, {
    variables: { userId: userData?.me?._id },
  });

  const user = userData?.me || {};
  const userCollections = collectionsData?.userCollections || [];

  return (
    <>
      <div>
        Hello {user.username}
      </div>
      <UserProfile userProfile={user} />
      <div className="collections-container">
        {collectionsLoading ? (
          <p>Loading collections...</p>
        ) : (
          <Cards collections={userCollections} />
        )}
      </div>
    </>
  );
};

export default LoggedInPage;


