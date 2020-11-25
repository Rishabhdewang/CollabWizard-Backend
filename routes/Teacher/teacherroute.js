const router = require("express").Router();
const auth = require("../../controllers/TeacherController/userAuthController");
const profile = require("../../controllers/TeacherController/teacherProfileController");
const { authenticateToken } = require('../../middlewares/authenticate');


// Teacher
router.post("/register",auth.TeacherRegister);
router.post("/login",auth.TeacherLogin)
router.get("/details",auth.TeacherDetail)
router.post("/changePassword",auth.ChangePassword)
router.post("/forgotPassword",auth.ForgotPassword)
router.post("/verifyForgotPassword",auth.VerifyForgotPassword)

// router.get("/all",profile.allTeachers)
router.get("/profile",authenticateToken, profile.GetTeacherProfile)
// router.put("/updateprofile/:id",profile.updateTeacherProfile)

router.post("/education", authenticateToken, profile.AddTeacherEducation)
router.get("/education",authenticateToken, profile.GetTeacherEducations) 
router.get("/education/:id",authenticateToken, profile.GetTeacherEducation) 
router.put("/education/:id",authenticateToken ,profile.UpdateTeacherEducation)
router.delete("/education/:id",authenticateToken ,profile.DeleteTeacherEducation)


router.post("/experience", authenticateToken, profile.AddTeacherExperience)
router.get("/experience",authenticateToken, profile.GetTeacherExperiences) 
router.get("/experience/:id",authenticateToken, profile.GetTeacherExperience) 
router.put("/experience/:id",authenticateToken ,profile.UpdateTeacherExperience)
router.delete("/experience/:id",authenticateToken ,profile.DeleteTeacherExperience)


router.post("/skill", authenticateToken, profile.AddTeacherSkill)
router.get("/skill",authenticateToken, profile.GetTeacherSkills) 
router.get("/skill/:id",authenticateToken, profile.GetTeacherSkill) 
router.put("/skill/:id",authenticateToken ,profile.UpdateTeacherSkill)
router.delete("/skill/:id",authenticateToken ,profile.DeleteTeacherSkill)

router.post("/interest", authenticateToken, profile.AddTeacherInterest)
router.get("/interest",authenticateToken, profile.GetTeacherInterests) 
router.get("/interest/:id",authenticateToken, profile.GetTeacherInterest) 
router.put("/interest/:id",authenticateToken ,profile.UpdateTeacherInterest)
router.delete("/interest/:id",authenticateToken ,profile.DeleteTeacherInterest)

// router.get("/interest/:id",profile.TeacherInterests)
// router.post("/addInterest",profile.addTeacherInterest)
// router.post("/updateInterest/:id",profile.updateTeacherInterest)

//Homepage Routing

// router.post("/addpost",authenticate,HomepagePostController.AddPost);
// router.post("/addcomment",authenticate,HomepagePostController.AddComment);
// router.post("/addreply",authenticate,HomepagePostController.AddReply);
// router.post("/upvote",authenticate,HomepagePostController.UpVote);
// router.delete("/deletecomment",authenticate,HomepagePostController.DeleteComment);
// router.delete("/deletereply",authenticate,HomepagePostController.DeleteReply);
// router.delete("/deletepost",authenticate,HomepagePostController.DeletePost);
// router.get("/getpost",authenticate,HomepagePostController.GetPost);

module.exports = router ;