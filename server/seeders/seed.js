const mongoose = require('mongoose');
const { User } = require('./models');

// Load seed data
const userData = require('./seedUser.json');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/group-project-3-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed Users
User.insertMany(userData)
  .then(() => {
    console.log('Users seeded successfully');
  })
  .catch((err) => {
    console.error('Error seeding users:', err);
  })
  .finally(() => {
    mongoose.disconnect();
  });