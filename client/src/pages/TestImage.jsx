import { useState, useEffect } from "react";
import AWS from '../../aws.config'
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET

const s3 = new AWS.S3();

async function urlResult (params) {
    const promise = s3.getSignedUrlPromise('getObject', params);
    return promise
        .then((url) => {
            return url
        }, function(err) { console.log(err) })}



const TestImage = () => {
    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    console.log(userData)
    const user = userData?.me || {};
    console.log(user)


    const params = {
        Bucket: S3_BUCKET,
        Key: null
      }
      console.log(user)

    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (user.collections) {
          params.Key = user.collections[0].image
          console.log('Helloworld')
          urlResult(params)
          .then(picture => setPicture(picture))
          .catch(error => {
            console.log(error);
          })
        }
    }, [user])

  console.log(picture);

      return  (
          <div className="TestPage">
      <div>
        {userLoading ? (
          <p>Loading User...</p>
        ):
        <img src={picture}></img>
        }
      </div>
    </div>
  );
}

export default TestImage;