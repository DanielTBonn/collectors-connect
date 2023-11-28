The technologies we implemented for this project were as follows:
- React for front end
- Apollo Server for Graph QL
- MongoDB for the database using Mongoose
- Node.js for running javascript outside of the browser
- Express to create a server for our web app
- Vite to create a server that could communicate with our backend.
- AWS S3 for storage and retrieval of images.

Tasks and Roles:
- Since we had a small team we were able to divide up tasks effectively. We all had our hands in the front end with Cody and Kate primarly taking charge of wiring up features or components to the front end pages. Paige handled design and feature development, some communication between the backend and frontend such as queries and mutations, and overall guidance of the team workflow. Daniel helped with the creation of the backend regarding typeDefs and resolvers as well as creating functions for uploading and retrieving images from AWS S3.

Challenges: 
- The first hurdle was getting AWS S3, our image hosting service up and running. Without it we couldn't function properly since we didn't have a working application. Next up was issues with our backend constantly changing to fit each of our needs breaking our code when we merged our changes together. Finally we had to remove various pieces of functionality we wanted in order to meet MVP requirements and our deadline.

Successes: 
- Our image hosting service AWS S3 turned out to be much easier to operate than previously thought, after getting some guidance on how to set it up in relation to MongoDB and graphql it was actually pretty simple to get and post images. 

