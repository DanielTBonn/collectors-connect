import { useState, useEffect } from "react";
import AWS from '../../aws.config'

const S3_BUCKET = process.env.S3_BUCKET || import.meta.env.VITE_S3_BUCKET
const s3 = new AWS.S3();

async function urlResult (params) {
    const promise = s3.getSignedUrlPromise('getObject', params);
    return promise
        .then((url) => {
            return url
        }, function(err) { console.log(err) })}

const ImageComponent = ({imageItem}) => {
    
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
            <img src={picture}style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // this maintains aspect ratio without stretching
            }}></img>
        </div>
    )

}

export default ImageComponent;