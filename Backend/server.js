import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDb from "./Config/db.config.js";
import userRouter from "./Routes/user-Routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectToDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // enable set cookies in the response
  })
);
app.use(express.json());
app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
