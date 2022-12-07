const express = require("express");
const router = express.Router();

const {
    viewStudents, 
    viewPasswords, 
    savePasswords, 
    getBranches, 
    saveBranches, 
    getSubjects, 
    addSubjectESC, 
    editSubjectESC, 
    deleteSubjectESC, 
    addSubjectCYC, 
    editSubjectCYC, 
    deleteSubjectCYC, 
    addSubjectMD, 
    editSubjectMD, 
    deleteSubjectMD,
    getStatus,
    setStatus,
    getSubjectsStatus,
    generateReport,
    upgradeSem
        } = require("../controllers/admin");

router.post("/view-students",viewStudents);
router.post("/view-passwords",viewPasswords);
router.post("/save-passwords",savePasswords);
router.get("/get-branches",getBranches);
router.post("/save-branches", saveBranches);
router.get("/get-subjects",getSubjects);
router.post("/add-subject/esc",addSubjectESC);
router.post("/edit-subject/esc",editSubjectESC);
router.post("/delete-subject/esc",deleteSubjectESC);
router.post("/add-subject/cyc",addSubjectCYC);
router.post("/edit-subject/cyc",editSubjectCYC);
router.post("/delete-subject/cyc",deleteSubjectCYC);
router.post("/add-subject/md",addSubjectMD);
router.post("/edit-subject/md",editSubjectMD);
router.post("/delete-subject/md",deleteSubjectMD);
router.get("/get-status",getStatus);
router.post("/set-status",setStatus);
router.post("/get-subjects-status",getSubjectsStatus);
router.post("/generate-report",generateReport);
router.post("/upgrade-sem",upgradeSem);

module.exports = router;