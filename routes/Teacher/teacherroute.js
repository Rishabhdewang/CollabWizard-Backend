const router = require("express").Router();
const auth = require("../../controllers/TeacherController/userAuthController");
const profile = require("../../controllers/TeacherController/teacherProfileController");
const authenticate = require('../../middlewares/authenticate');


// Teacher
router.post("/register",auth.TeacherRegister);
router.post("/login",auth.TeacherLogin)
router.post("/details",auth.TeacherDetail)
router.post("/changePassword",auth.ChangePassword)
router.post("/forgotPassword",auth.ForgotPassword)
router.post("/verifyForgotPassword",auth.VerifyForgotPassword)

router.get("/all",profile.allTeachers)
router.put("/updateprofile?id=",profile.updateTeacherProfile)
// router.post("/updateprofile",profile.updateTeacherProfile)

router.get("/education",profile.teacherEducation) 
router.post("/addEducation",profile.addTeacherEducation)

router.get("/experience",profile.TeacherExperience)
router.post("/addExperience",profile.addTeacherExperience)

router.get("/skills",profile.TeacherSkills)
router.post("/addSkills",profile.addTeacherSkills)

router.get("/interest",profile.TeacherInterests)
router.post("/addInterest",profile.addTeacherInterest)

module.exports = router ;