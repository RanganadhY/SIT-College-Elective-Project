const express = require("express");
const router = express.Router();

const {
    getStudentDetails
    } = require("../controllers/student");

router.post("/student-details",getStudentDetails);

module.exports = router