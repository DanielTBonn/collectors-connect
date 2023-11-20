import { useState, useEffect } from "react";
import AWS from '../../aws.config'

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET
const s3 = new AWS.S3();

async function urlResult (params) {
    const promise = s3.getSignedUrlPromise('getObject', params);
    return promise
        .then((url) => {
            return url
        }, function(err) { console.log(err) })}
console.log('hellworld')

const ImageComponent = ({imageItem}) => {
    console.log("hi")
    console.log("Hello",imageItem.itemImage)
    
    const params = {
        Bucket: S3_BUCKET,
        Key: imageItem.itemImage
      }
    
      const [picture, setPicture] = useState('');

    useEffect(() => {
        if (imageItem.itemImage) {
          urlResult(params)
          .then(picture => setPicture(picture))
          .catch(error => {
            console.log(error);
          })
        }
    }, [])

    return (
        <div>
            <img src={picture}></img>
        </div>
    )

}

export default ImageComponent;