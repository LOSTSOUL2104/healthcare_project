const express = require("express");
const router = express.Router();
const { validateJwtToken } = require("../middleware/JWT_AUTH"); // <-- Use require() instead of import
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/usercontroller");

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);


// Route to get the user's own profile (protected)
router.get("account", validateJwtToken, getUserProfile);

// Route to update the user's profile (protected)
router.patch("account", validateJwtToken, updateUserProfile);

module.exports = router;
