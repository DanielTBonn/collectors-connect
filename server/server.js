const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const AWS = require('aws-sdk');


const { getImage } = require('./controllers/image-controller');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
});


// const S3_BUCKET='collectors-connect-collections-bucket'
// const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
// const AWS_SECRET_ACCESS_KEY='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'
// const AWS_REGION='us-east-1'

// AWS.config.update({
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: AWS_REGION,
// });
// const s3 = new AWS.S3({
// //   params: { 
// //     Bucket: S3_BUCKET,
// // },
// //   region: AWS_REGION,
// });

// const params = {
//   Bucket: S3_BUCKET,
//   Key: 'Example.jpg'
// }

// app.get('/images/:key', async (req, res) => {
//   console.log("Hello")
//   const imageData = await s3.getObject(params, function(err,data) {
//     if (err) console.log(err, err.stack);
//     else {
//         console.log(data)
//         console.log(data.Body)
//         return data;
//     };
// }).promise();

//   console.log(imageData)
//   console.log('hmm')
//   res.contentType('image/jpeg');
//   res.setHeader('Content-Type', imageData.ContentType);
//   res.send(imageData.Body);
// });


const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });


}

startApolloServer();

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });