import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("MongoDB Connected");
    app.listen(PORT,()=>{
      console.log(`Server running on port http://localhost:${5000}`);
    });
  })

  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // crash if DB fails
  });