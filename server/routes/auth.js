const express = require("express");
const router = express.Router();

//importing authentication contollers
const authentication = require("../controllers/auth controllers/authController");

//routes for student authentication
router.post("/student-login",authentication.studentLogin);
router.post("/student-register",authentication.studentRegister);

//routes for admin authentication
router.post("/admin-login",authentication.adminLogin);
router.post("/admin-register",authentication.adminRegister);

module.exports = router