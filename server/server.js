import express from "express";
import dbConnection from "./db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth/auth-routes.js";

import therapistRouter from "./routes/therapist-routes.js";

import adminProductRouter from "./routes/admin/products-routes.js";
import shopProductsRouter from "./routes/shop/products-route.js"


dotenv.config();
// this is where we connect to the database
await dbConnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  //This is a middleware that parses incoming requests with JSON payloads
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
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

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", userRouter);

app.use("/api/therapists", therapistRouter);


// this is where we use the adminProductRouter
app.use("/api/admin/products", adminProductRouter);

// this is where we use the shopProductsRouter
app.use("/api/shop/products", shopProductsRouter);


// this is where we start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
