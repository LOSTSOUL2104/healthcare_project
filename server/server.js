const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require("multer");
const Profile = require("./models/Profile");
const dotenv = require("dotenv");

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 5000;
const imageUrls = []; 

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage,
  fileFilter: function(req,file,callback)
  {
    const ext = path.extname(file.originalname);
    if(ext!='.png' && ext != '.jpg' && ext!= '.gif')
    {
      return callback(new Error('only images are allowed'))
    }
    // else{
    //   return callback('file uploaded ')
    // }
    callback(null,true)
  },
 });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => res.send("working"));

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

app.post("/profile", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const fileName = req.file.filename;
  const imageUrl = `/uploads/${fileName}`;
  imageUrls.push(imageUrl);

  return res.render("allimages", { imageUrls });
});

app.get("/allimages", (req, res) => {
  res.render("images", { imageUrls });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
