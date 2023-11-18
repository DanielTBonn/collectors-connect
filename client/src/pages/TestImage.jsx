import { useState, useEffect } from "react";
// import { uploadFile } from '../utils/uploadFile'
import AWS from 'aws-sdk';
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";


// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION,
// });

const s3 = new AWS.S3();

async function urlResult (params) {
    const promise = s3.getSignedUrlPromise('getObject', params);
    return promise
        .then((url) => {
            return url
        }, function(err) { console.log(err) })}


console.log()

console.log(urlResult())

const TestImage = () => {
    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    console.log(userData)
    const user = userData?.me || {};
    console.log(user)
    // console.log(user.collections[0].image)

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