import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://firstmernapp:firstmernapp123@cluster0.ogytrpr.mongodb.net/?retryWrites=true&w=majority";

const PORT = 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Serveer running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
