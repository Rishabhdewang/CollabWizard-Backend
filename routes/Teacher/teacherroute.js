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

//Homepage Routing

router.post("/addpost",authenticate,HomepagePostController.AddPost);
router.post("/addcomment",authenticate,HomepagePostController.AddComment);
router.post("/addreply",authenticate,HomepagePostController.AddReply);
router.post("/upvote",authenticate,HomepagePostController.UpVote);
router.delete("/deletecomment",authenticate,HomepagePostController.DeleteComment);
router.delete("/deletereply",authenticate,HomepagePostController.DeleteReply);
router.delete("/deletepost",authenticate,HomepagePostController.DeletePost);

router.get("/getpost",authenticate,HomepagePostController.GetPost);



module.exports = router ;