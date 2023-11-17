import FeedCards from '../components/FeedCards';
import AuthService from '../utils/auth';

const IndexPage = () => {
 const isLoggedIn = AuthService.loggedIn();
    

  return (
    <>
      <div>
        <h1 style={{marginTop: "50px"}}>Collections Feed</h1>
      </div>
      <div>
        {
          isLoggedIn ? <FeedCards /> : <h1>Please log in to see feed.</h1>
        }
      </div>
    </>
  );
};

export default IndexPage;
