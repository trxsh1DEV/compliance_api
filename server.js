import { MongooseError } from 'mongoose';
import app from './app';

const dotenv = require('dotenv');

dotenv.config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connect successfully mongoDB Atlas'))
  .catch((err) => console.log(err.message));

const port = process.env.SERVER_PORT;
app.listen(port || 5123, () => {
  console.log(`Server running in http://localhost:${port}`);
});
