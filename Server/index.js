import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cardRoutes from "./routes/cards.js";
import { register } from "./controllers/auth.js";
import { validate } from "./controllers/validate.js";
import { verifyToken } from "./middleware/auth.js";
import { createCard } from "./controllers/cards.js"



/* CONGFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "luhn",
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

}).catch((error) => console.log(`${error} did not connect` ));

app.post("/auth/register", register);
app.post("/validate", validate )
app.post("/cards", verifyToken, createCard);


// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);


app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});