const express = require("express");
const router = express.Router();
const {registerUser}=require("../controllers/userController");

//Route for user registration
router.post("/register", registerUser);

//Route for user login
router.login("/login", loginUser);

module.exports = router;

router.post("/register" , registerUser);
module.exports=router;