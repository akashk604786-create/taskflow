require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const DB_PATH = process.env.MONGO_URI;
const PORT = process.env.PORT || 3006;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
