import { MongooseError } from "mongoose";
import app from "./app";

import dotenv from "dotenv";

dotenv.config();
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => console.log("connect successfully mongoDB Atlas"))
  .catch((err: MongooseError) => console.log(err.message));

const port = process.env.SERVER_PORT;
app.listen(port || 5123, () => {
  console.log(`Server running in http://localhost:${port}`);
});
