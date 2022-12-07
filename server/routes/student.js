const express = require("express");
const router = express.Router();

const {
    getStudentDetails,
    optSubject,
    getRegisteredSubjects
    } = require("../controllers/student");

router.post("/student-details",getStudentDetails);
router.post("/opt-subject",optSubject);
router.post("/registered-subjects",getRegisteredSubjects);

module.exports = router