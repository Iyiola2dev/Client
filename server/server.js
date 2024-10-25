import express from "express";
import dbConnection from "./db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth/auth-routes.js";


dotenv.config();
// this is where we connect to the database
await dbConnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    //This is a middleware that parses incoming requests with JSON payloads
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", userRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});