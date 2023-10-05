import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postsRoutes from "./routes/posts.js";

const app = express();

app.use("/api/posts", postsRoutes);

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://memoryapp:memoryapp123@mernapp.isif22e.mongodb.net/?retryWrites=true&w=majority";

const PORT = 5500;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Serveer running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
