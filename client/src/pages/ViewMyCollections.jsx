import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from '../utils/queries'
import DeleteCollectionButton from "../components/DeleteCollectionButton";
import CollectionImageComponent from "../components/CollectionImageComponent";

const ViewMyCollections = () => {

    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    // console.log(userData)
    const user = userData?.me || {};
    // console.log(user)

    return (

        <div>
          {userLoading ? (
            <p>Loading User...</p>
          ):
          user.collections.map((collection) => {
              return (
                <div>
                  <a><p>{collection.name}</p></a>
                  <CollectionImageComponent collection={collection} />
                  <DeleteCollectionButton collectionId={collection._id}/>
                </div>
              )
          })
          }
        </div>

    )


}

export default ViewMyCollections;