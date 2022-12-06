const express = require("express");
const router = express.Router();

const {
    getStudentDetails
    } = require("../controllers/student");

router.get("/student-details",getStudentDetails);

module.exports = router