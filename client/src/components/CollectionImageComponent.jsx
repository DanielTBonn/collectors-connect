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

const CollectionImageComponent = ({collection}) => {
    
    const params = {
        Bucket: S3_BUCKET,
        Key: collection.image
      }
    
      const [picture, setPicture] = useState('');

      useEffect(() => {
        // Cleanup function to cancel ongoing fetch requests when the component is unmounted
        let isMounted = true;
    
        const fetchData = async () => {
          try {
            const result = await urlResult(params);
            if (isMounted) {
              setPicture(result);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        if (collection.image) {
          fetchData();
        }
    
        // Cleanup function
        return () => {
          isMounted = false;
        };
      }, [collection.image]);



    // useEffect(() => {
    //     if (collection.image) {
    //       urlResult(params)
    //       .then(picture => setPicture(picture))
    //       .catch(error => {
    //         console.log(error);
    //       })
    //     }
    // }, [])

    return (
        <div>
            <img src={picture} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></img>
        </div>
    )

}

export default CollectionImageComponent;