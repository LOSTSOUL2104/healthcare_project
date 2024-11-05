//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routes/userRouter");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const doctorRoutes = require("./routes/doctorRoutes");

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(errorHandler);
app.use("/api/users", userRouter);
app.use("/api/register", require("./routes/userRouter"));
app.use("/api/doctors", require("./routes/doctorRoutes"));

// ERROR handling middleware
app.use(errorHandler);

app.set("view engine", "hbs");

//ROUTES BELOW
app.get("/", (req, res) => {
  res.send("working");
});

app.get("/home", (req, res) => {
  res.render("home", {
    users: [
      { username: "Parth", date: "23-10-2024", subject: "Maths" },
      { username: "Aarav", date: "23-10-2024", subject: "Science" },
      { username: "Ishita", date: "23-10-2024", subject: "History" },
    ],
  });
});

app.get("/allusers", (req, res) => {
  res.render("users", {
    users: [
      { username: "Parth", date: "23-10-2024", subject: "Maths" },
      { username: "Aarav", date: "23-10-2024", subject: "Science" },
      { username: "Ishita", date: "23-10-2024", subject: "History" },
    ],
  });
});

hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// APP CONFIG START
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
