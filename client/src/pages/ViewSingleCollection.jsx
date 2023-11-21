import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import ImageComponent from "../components/ImageCompontent";
import EditCollectionButton from '../components/EditCollectionButton';

const ViewSingleCollection = () => {
    const { collectionId } = useParams();
    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    const user = userData?.me || {};
    console.log(user)

      return  (
          <div className="TestPage">
      <div>
        <EditCollectionButton collectionId={collectionId}/>
        {userLoading ? (
          <p>Loading User...</p>
        ):
        user.collections[collectionId].items.map((imageItem) => {
            return <ImageComponent imageItem={imageItem} />
        })
        }
      </div>
    </div>
  );
}

export default ViewSingleCollection;