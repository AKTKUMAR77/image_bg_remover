import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
connectDB();

// Initialize Middleware
app.use(express.json());
app.use(cors());

// API Route
app.get("/", (req, res) => {
  res.status(200).send("API Working");
});
app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
  console.log(`Link: http://localhost:${PORT}`);
});
