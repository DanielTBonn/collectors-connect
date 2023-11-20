import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import ImageComponent from "../components/ImageCompontent";

const TestImage = () => {
    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    const user = userData?.me || {};
    console.log(user)

      return  (
          <div className="TestPage">
      <div>
        {userLoading ? (
          <p>Loading User...</p>
        ):
        user.collections[0].items.map((imageItem) => {
            return <ImageComponent imageItem={imageItem} />
        })
        }
      </div>
    </div>
  );
}

export default TestImage;