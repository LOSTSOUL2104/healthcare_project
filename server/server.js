
const express = require("express");
const connectDb = require("./config/dbConnection"); // Your DB connection logic
const errorHandler = require("./middleware/errorHandler"); // Your error handler
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use(cors());
app.set("view engine", "hbs");

// ROUTES
hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.get("/", (req, res) => {
  res.send("working");
});
app.get("/home",(req,res) =>{
  res.render("home",{})
})
app.get("/allusers", (req, res) => {
  res.render("users", {
    users: [
      { id: 1, username: "priyansh", age: 19 },
      { id: 2, username: "priyansh2", age: 20 },
    ],
  });
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ERROR HANDLING MIDDLEWARE should be added after routes
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`); 
});
