import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from '../utils/queries'

const ViewMyCollections = () => {

    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    console.log(userData)
    const user = userData?.me || {};
    console.log(user)

    return (

        <div>
          {userLoading ? (
            <p>Loading User...</p>
          ):
          user.collections.map((collection) => {
              return <a><p>{collection.name}</p></a>
          })
          }
        </div>

    )


}

export default ViewMyCollections;