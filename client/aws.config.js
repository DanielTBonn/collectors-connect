import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION ||  import.meta.env.VITE_AWS_REGION,
});

export default AWS