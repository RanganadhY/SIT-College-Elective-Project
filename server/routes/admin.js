const express = require("express");
const router = express.Router();

const {viewStudents, viewPasswords, savePasswords, getBranches, saveBranches} = require("../controllers/admin");

router.post("/view-students",viewStudents);
router.post("/view-passwords",viewPasswords);
router.post("/save-passwords",savePasswords);
router.get("/get-branches",getBranches);
router.post("/save-branches", saveBranches);

module.exports = router;