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
router.put("/updateprofile/:id",profile.updateTeacherProfile)

router.get("/education/:id",profile.teacherEducation) 
router.post("/addEducation",profile.addTeacherEducation)
router.post("/updateEducation/:id",profile.updateTeacherEducation)

router.get("/experience/:id",profile.TeacherExperience)
router.post("/addExperience",profile.addTeacherExperience)
router.post("/updateExperience/:id",profile.updateTeacherExperience)

router.get("/skills/:id",profile.TeacherSkills)
router.post("/addSkills",profile.addTeacherSkills)
router.post("/updateSkills/:id",profile.updateTeacherSkills)

router.get("/interest/:id",profile.TeacherInterests)
router.post("/addInterest",profile.addTeacherInterest)
router.post("/updateInterest/:id",profile.updateTeacherInterest)



module.exports = router ;