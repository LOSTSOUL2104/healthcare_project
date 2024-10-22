// server.js
const express = require("express");
const connectDb = require("./config/dbConnection"); // Your DB connection logic
const errorHandler = require("./middleware/errorHandler"); // Your error handler
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.send("working");
});

// ERROR HANDLING MIDDLEWARE should be added after routes
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`); 
});
