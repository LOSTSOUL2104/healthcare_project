const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routes/userRouter");
const doctorRoutes = require("./routes/doctorRoutes");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use("/api/users", userRouter);
app.use("/api/register", userRouter);
app.use("/api/doctors", doctorRoutes);

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials/header"));

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

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
