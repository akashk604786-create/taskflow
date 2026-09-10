require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

// Fail loudly at boot rather than serving 500s once a request needs one of these.
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(
    `Cannot start: missing required environment variable(s): ${missingEnv.join(', ')}`
  );
  process.exit(1);
}

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
